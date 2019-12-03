import React, { useState } from 'react';
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

const Detailed = (data) => {
  const [detailData, setDetailData] = useState(data);

  return (
    <div>
      <Head>
        <title>{detailData.title}</title>
      </Head>

      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{detailData.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{detailData.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {detailData.title}
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> {detailData.addTime}</span>
                  <span><Icon type="folder" /> {detailData.typeName}</span>
                  <span><Icon type="fire" /> {detailData.view_count}人</span>
                </div>

                <div className="detailed-content" >
                  <ReactMarkdown source={detailData.article_content} escapeHtml={false}
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
                source={detailData.article_content}
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

Detailed.getInitialProps = async(context) => {

  console.log(context.query.id)
  let id = context.query.id;
  const promise = new Promise((resolve) => {

    axios('http://127.0.0.1:7001/default/getArticleById/' + id).then(
      (res) => {
        console.log(res.data.data[0]);
        resolve(res.data.data[0]);
      }
    );
  });

  return await promise
}


export default Detailed;
