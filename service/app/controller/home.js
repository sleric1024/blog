'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async hello() {
    const { ctx } = this;
    ctx.body = '<h1>Hello World!</h1>';
  }
}

module.exports = HomeController;
