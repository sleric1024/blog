import React, {useState} from 'react'
import Head from 'next/head'
import {Row, Col, List, Icon} from 'antd'
import Header from '../components/Header'


const ListPage = () => {
  return (
    <div>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
         left
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          右侧
        </Col>
      </Row>
    </div>
  );
}

export default ListPage;
