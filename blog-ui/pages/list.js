import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import {Row, Col , List ,Icon, Breadcrumb} from 'antd'
import '../static/style/pages/index.css';
import Author from '../components/Author';
import Footer from '../components/Footer'
import Advertisement from '../components/Advertisement';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import Link from 'next/link';

const ListPage = (props) => {

  const [ articleList , setArticleList ] = useState(props.data);
  const [ typeName, setTypeName ] = useState(props.name.name);

  useEffect(()=>{
    setArticleList(props.data);
    setTypeName(typeName);
  });

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Header></Header>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{typeName}</Breadcrumb.Item>
              </Breadcrumb>
          </div>

          <List
              itemLayout="vertical"
              dataSource={articleList}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                      <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" />{item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" />  {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advertisement />
        </Col>
      </Row>

      <Footer/>
    </div>
  );
};

ListPage.getInitialProps = async (context)=>{

  let id =context.query.id;
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise;
};

export default ListPage;
