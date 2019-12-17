import React,{useState, useEffect} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker, message } from 'antd'
import axios from 'axios';
import servicePath from '../config/apiUrl';
import highlight from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {

  const [articleId,setArticleId] = useState(0);  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('');   //文章标题
  const [articleContent , setArticleContent] = useState('');  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容'); //html内容
  const [introducemd,setIntroducemd] = useState();            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑'); //简介的html内容
  const [showDate,setShowDate] = useState();   //发布日期
  const [updateDate,setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType,setSelectType] = useState(1); //选择的文章类别

  const renderer = new marked.Renderer();

  useEffect(() => {
    getTypeInfo();
  }, []);

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

  const changeContent = (e)=>{
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e)=>{
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === '没有登录') {
          localStorage.removeItem('openId');
          props.history.push('/login');
        } else {
          setTypeInfo(res.data.data);
        }
      }
    )
  }

  const selectType = (value) => {
    setSelectType(value);
  };

  const saveArticle = () => {
    if (!selectType) {
      message.error('请选择文章类型');
      return false;
    } else if (!articleTitle) {
      message.error('文章标题不能为空');
      return false;
    } else if (!articleContent) {
      message.error('文章内容不能为空');
      return false;
    } else if (!introducemd) {
      message.error('文章简介不能为空');
      return false;
    } else if (!showDate) {
      message.error('发布日期不能为空');
      return false;
    }

    message.success('检验通过!');
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input value={articleTitle} placeholder="博客标题" size="large" onChange={(e) => {setArticleTitle(e.target.value)}} />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectType}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>);
                  })
                }
              </Select>
            </Col>
          </Row>
          <br/>

          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onPressEnter={changeContent}
                onChange={changeContent}
                />
            </Col>
            <Col span={12}>
              <div
                  className="show-html"
                  dangerouslySetInnerHTML={{__html: markdownContent}}>
              </div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button onClick={saveArticle} type="primary" size="large">发布文章</Button>
              <br/>
            </Col>

            <Col span={24}>
              <br/>
              <TextArea
                rows={4}
                value={introducemd}
                placeholder="文章简介"
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
              />
              <br/><br/>
              <div className="introduce-html"
                   dangerouslySetInnerHTML={{__html:'文章简介：'+introducehtml}}>
              </div>
            </Col>

            <Col span={12}>
              <div className="date-select">
                <DatePicker onChange={(date, dateString) => {setShowDate(dateString)}} placeholder="发布日期" size="large" />
              </div>
            </Col>

            {/* <Col span={12}>
              <div className="date-select">
                <DatePicker placeholder="修改日期" size="large" />
              </div>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle