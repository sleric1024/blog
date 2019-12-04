import React from 'react';
import {Row, Col, Icon, Breadcrumb, Affix} from 'antd';
import Head from 'next/head';
import Header from '../components/Header';
import Advertisement from '../components/Advertisement';
import Author from '../components/Author';
import Footer from '../components/Footer';
import '../static/style/components/detailed.css';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios';
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx';
import  servicePath  from '../config/apiUrl'

const Detailed = (props) => {

  const renderer = new marked.Renderer();
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return highlight.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_content);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>

      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {props.title}
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> {props.addTime}</span>
                  <span><Icon type="folder" /> {props.typeName}</span>
                  <span><Icon type="fire" /> {props.view_count}人</span>
                </div>

                <div className="detailed-content" dangerouslySetInnerHTML={{__html: html}}>
                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />

          <Advertisement />

          <Affix offsetTop={5}>
            <div className="comm-box detailed-nav">
              <div className="nav-title">文章目录</div>
              {
                tocify && tocify.render()
              }
            </div>
          </Affix>
        </Col>
      </Row>

      <Footer/>
    </div>
  );
}

Detailed.getInitialProps = async(context) => {

  console.log(context.query.id)
  let id = context.query.id;
  const promise = new Promise((resolve) => {

    axios(servicePath.getArticleById + id).then(
      (res) => {
        console.log(res.data.data[0]);
        resolve(res.data.data[0]);
      }
    );
  });

  return await promise
}


export default Detailed;
