/* eslint-disable semi */
'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    this.ctx.body = 'Hello';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
                "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = {
      data: resType,
    };
  }

  async addArticle() {
    const tempArticle = this.ctx.request.body;
    console.log(tempArticle);
    // tempArticle.
    const result = await this.app.mysql.insert('article', tempArticle);
    const isSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess,
      insertId,
    }
  }

  async updateArticle() {
    const tempArticle = this.ctx.request.body;

    const result = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;

    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'article.view_count as view_count,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'ORDER BY article.id DESC '

    const resList = await this.app.mysql.query(sql);

    this.ctx.body = {
      list: resList,
    };
  }

  async deleteArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = {
      data: res,
    };
  }
}

module.exports = MainController;
