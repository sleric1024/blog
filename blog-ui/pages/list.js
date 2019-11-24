import React, {useState} from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import {Row, Col , List ,Icon, Breadcrumb} from 'antd'
import '../static/style/pages/index.css';
import Author from '../components/Author';
import Footer from '../components/Footer'
import AD from '../components/AD';

const ListPage = () => {

  const [ mylist , setMylist ] = useState(
    [
      {title:'5财富自由后，他仍是中国最勤奋推销员，每天工作到凌晨',context:`钢琴共有88个键，琴键有限，却能演奏无限乐章。”

      1900是弗吉尼亚号豪华游轮上最杰出的钢琴师，不论是头等舱的贵族，还是经济舱的平民，都是他的追捧者。在船上，他是最耀眼的明星。前来挑战的“爵士乐之父”也不是他的对手。

      但1900始终不愿下船。直到一个名叫帕多万的姑娘出现，才让他产生了上岸追求新生活的向往。

      可当他终于鼓起勇气走下船梯时，遥望着岸上数不清的街道，就像“永远也数不完”的琴键，他又心生对于未知的畏惧，还是退回到了自己最熟悉的船上，并最终与船一起沉没。

      `},
      {title:'经观头条｜独家探访鞋王百丽：一场“黑天鹅革命”正在',context:`钢琴共有88个键，琴键有限，却能演奏无限乐章。”

      1900是弗吉尼亚号豪华游轮上最杰出的钢琴师，不论是头等舱的贵族，还是经济舱的平民，都是他的追捧者。在船上，他是最耀眼的明星。前来挑战的“爵士乐之父”也不是他的对手。

      但1900始终不愿下船。直到一个名叫帕多万的姑娘出现，才让他产生了上岸追求新生活的向往。

      可当他终于鼓起勇气走下船梯时，遥望着岸上数不清的街道，就像“永远也数不完”的琴键，他又心生对于未知的畏惧，还是退回到了自己最熟悉的船上，并最终与船一起沉没。

      `},
      {title:'古巴能上网了，美国巨头抢先入场，中国互联网该向硅谷',context:`钢琴共有88个键，琴键有限，却能演奏无限乐章。”

      1900是弗吉尼亚号豪华游轮上最杰出的钢琴师，不论是头等舱的贵族，还是经济舱的平民，都是他的追捧者。在船上，他是最耀眼的明星。前来挑战的“爵士乐之父”也不是他的对手。

      但1900始终不愿下船。直到一个名叫帕多万的姑娘出现，才让他产生了上岸追求新生活的向往。

      可当他终于鼓起勇气走下船梯时，遥望着岸上数不清的街道，就像“永远也数不完”的琴键，他又心生对于未知的畏惧，还是退回到了自己最熟悉的船上，并最终与船一起沉没。

      `},
      {title:'分家能带来高额回报，但腾讯为何不分拆金融科技？',context:`钢琴共有88个键，琴键有限，却能演奏无限乐章。”

      1900是弗吉尼亚号豪华游轮上最杰出的钢琴师，不论是头等舱的贵族，还是经济舱的平民，都是他的追捧者。在船上，他是最耀眼的明星。前来挑战的“爵士乐之父”也不是他的对手。

      但1900始终不愿下船。直到一个名叫帕多万的姑娘出现，才让他产生了上岸追求新生活的向往。

      可当他终于鼓起勇气走下船梯时，遥望着岸上数不清的街道，就像“永远也数不完”的琴键，他又心生对于未知的畏惧，还是退回到了自己最熟悉的船上，并最终与船一起沉没。

      `}
    ]
  );

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
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
          </div>

          <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">{item.title}</div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> 2019-06-28</span>
                    <span><Icon type="folder" /> 视频教程</span>
                    <span><Icon type="fire" /> 5498人</span>
                  </div>
                  <div className="list-context">{item.context}</div>
                </List.Item>
              )}
            />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <AD />
        </Col>
      </Row>

      <Footer/>
    </div>
  );
}

export default ListPage;
