import React from 'react';
import {Row, Col, Icon, Breadcrumb, Affix} from 'antd';
import Head from 'next/head';
import Header from '../components/Header';
import Advertisement from '../components/Advertisement';
import Author from '../components/Author';
import Footer from '../components/Footer';
import '../static/style/components/detailed.css';
import ReactMarkdown from 'react-markdown';
import MarkdownNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios';

const Detailed = (markdown) => {

  return (
    <div>
      <Head>
        <title>博客详细页</title>
      </Head>

      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                  <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                Title of react learning
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> 2019-06-28</span>
                  <span><Icon type="folder" /> 视频教程</span>
                  <span><Icon type="fire" /> 5498人</span>
                </div>

                <div className="detailed-content" >
                  <ReactMarkdown source={markdown} escapeHtml={false}
                  />
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
              <MarkdownNav
                className="article-menu"
                source={markdown}
                headingTopOffset={0}
                ordered={false} />
            </div>
          </Affix>
        </Col>
      </Row>

      <Footer/>
    </div>
  );
}

Detailed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios('http://127.0.0.1:7001/default/getArticleById/'+id).then(
      (res)=>{
        console.log(title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}


export default Detailed;
