import {Button, Empty, Input, Select, message, Menu, Avatar, BackTop, List, Dropdown, Form, Spin, Badge} from 'antd';
import {AndroidOutlined,AppleOutlined,UnorderedListOutlined,ExportOutlined,SmileTwoTone,BookTwoTone} from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps,Link } from 'react-router-dom';
import { ModalType } from '../../common/enum';
import ModalForm from '../../components/FormModal';
import TodoItem from '../../components/TodoItem';
import { AppStore } from '../../store';
import {
  addTodo,
  deleteTodo,
  fetchALLGoods,
  fetchTodo,
  searchTodo,
  updateTodoContent,
  updateTodoStatus,
    updateTodoBuyerId,
    updateTodoDesc,
} from '../../store/todo/actions';
import { keepLogin, logout ,fetchuser} from '../../store/user/actions';
import { LocalStorage } from '../../utils';
// @ts-ignore
import styles from './index.module.scss';
import { Layout, Breadcrumb } from 'antd';
import {ITodoState} from "../../store/todo/types";

//布局
const { Header, Content, Footer, Sider } = Layout;

const mapState = ({ todo, user }: AppStore) => ({
  todo,
  user,
});

const mapDispatch = {
  logout,
  keepLogin,fetchuser,
  addTodo,
  deleteTodo,
  fetchTodo,
  fetchALLGoods,
  searchTodo,
  updateTodoContent,
  updateTodoStatus,
  updateTodoBuyerId,
  updateTodoDesc
};

const { SubMenu } = Menu;
const { Option, OptGroup } = Select;
function handleChange(value:string) {
  message.info(`selected ${value}`);
}
////
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ITodoProps extends PropsFromRedux, RouteComponentProps {}
const Search = Input.Search;

const Todo: FC<ITodoProps> = ({
  history,
  todo,
  user,
  logout,fetchuser,
  keepLogin,
  deleteTodo,
  updateTodoContent,
  updateTodoStatus,
    updateTodoBuyerId,
updateTodoDesc,
  fetchTodo, fetchALLGoods,
  addTodo,
  searchTodo,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [status, setStatus] = useState(false);
  const [content, setContent] = useState('');
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState('');
  const [modalType, setModalType] = useState('');
  const [todoId, setTodoId] = useState('000');
  const [field, setField] = useState("all");
  const [url,setUrl]=useState("");
  const [loading,setLoading]=useState(true);
  const [loading2,setLoading2]=useState(false);

  useEffect(() => {
    const userId = LocalStorage.get('userId');
    const username = LocalStorage.get('username');
    const position = LocalStorage.get('position');
    const info1 = LocalStorage.get('info1');
    setTimeout(() => {
      setLoading( false );
    }, 500);

    if (userId && username&&position&&info1) {
      if (user.username) {
        fetchTodo(userId);
        fetchuser(userId);
      } else {
        keepLogin({ userId, username, errMsg: '' , position,info1});

      }
    } else {
      history.push('/login');
    }
  }, [user]);

  const onToggleStatus = (flag: boolean) => {
    setStatus(flag);
  };
  const onToggleField = (field:string) => {
    setField(field);
    setLoading2(true);
    setTimeout(() => {
      setLoading2( false );
    }, 300);

  };

  const onAdd = (userId:string,content: string,field:string,url:string,position:string,price:number,info1:string,desc:string) => {
     if(content!=''&&field!=''){ addTodo(userId, content,field,url,position,price,info1,desc);
      setStatus(false);
      onClose();
       window.location.reload();
     }else message.info("请输入信息")
    // setField(field);
  };

  const onUpdateContent = (todoId: string, content: string,price:number) => {
    updateTodoContent(todoId, content,price);
  };
  const onDelete = (userId:string,todoId: string) => {
    deleteTodo(userId,todoId);
  };
  const onUpdateStatus = (todoId: string,value:string) => {
    updateTodoStatus(todoId,value);
  };
  const onUpdateDesc = (todoId: string,desc:string) => {
    updateTodoDesc(todoId,desc);
  };
  const onUpdateBuyerId = (todoId: string,bId:string) => {
    updateTodoBuyerId(todoId,bId);
  };
const onUpdate =(todoId:string,value:string,bId:string)=>{
  onUpdateStatus(todoId,value);
  onUpdateBuyerId(todoId,bId);
}
  const onSearch = (query: string) => {
    searchTodo(user.userId, query);
  };
  const onClose = () => {
    setShowModal(false);
  };
  const onShowModal = (type: ModalType, todoId?: string, content?: string) => {
    setShowModal(true);
    if (type === ModalType.Add) {
      setModalTitle('新增商品');
      setContent('');
      setModalType(ModalType.Add);
    }
    if (type === ModalType.Edit) {
      setModalTitle('编辑价格');
      setModalType(ModalType.Edit);
      setContent(content!);
      setTodoId(todoId!);
    }
  };
 const  routerTo = (v: ITodoState) =>{return   history.push({pathname: `/Detail/${v._id}`, state: {data: v}})}
 const antIcon = <SmileTwoTone twoToneColor="#f37fb7" style={{ fontSize: 80 }} spin />;


  return (
      <Layout>
        <Header className={styles.header}>
          <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15,color:'red'}}  defaultSelectedKeys={['2']}>
            <Menu.Item key="1" ><Link to={'/home'}>首页</Link></Menu.Item>
            <Menu.Item key="2">  <Link to={'/todo'}>出售</Link></Menu.Item>
            <Menu.Item key="3">求购</Menu.Item>
          </Menu>
          <div className={styles.queryBar}>
            <Search placeholder="输入要查询的内容" onSearch={(value) => onSearch(value)}/>
          </div>
          <Button
              type="primary"
              onClick={() => onShowModal(ModalType.Add)}
              className={styles.newTodo}
              style={{ backgroundColor:'#f37fb7',borderColor:'#f37fb7'}}
          >
            发布闲置
          </Button>
          <div className={styles.user}> <Avatar style={{top:0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /><span>{user.username}</span></div>
          <div className={styles.menu}>
            <Menu   theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15}} >
              <Menu.Item key="4"><Link to={'MyCenter'}>个人空间</Link></Menu.Item>
              <Menu.Item key="5"><Badge size="small" count= { todo.filter((v) =>(v.buyerId===user.userId )).length}><Link to={'/MyBuy'}> 我买到的</Link></Badge></Menu.Item>

              <Menu.Item key="6"><Badge size="small" count= { todo.filter((v) =>(v.userId===user.userId )).length}><Link to={'/Mygood'}>
                我发布的</Link> </Badge></Menu.Item>

              <Menu.Item key="7"><Link to={'/MySell'}> 我卖出的</Link></Menu.Item>
              <Menu.Item ><ExportOutlined onClick={logout} width={100}/></Menu.Item>
            </Menu>
          </div>
        </Header>

        <Content style={{ padding: '0 50px' ,minHeight:'1000px',backgroundColor:'#0079af' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>出售</Breadcrumb.Item>
          </Breadcrumb>
{/*主页加载中*/}
          <Spin      tip="" spinning={loading} size="large" indicator={antIcon} style={{backgroundColor:"#0079af",color:'black',fontSize:36}}>
                  {loading?(<Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}> </Layout>):(

                      <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}>
                        <Sider className="site-layout-background" style={{width:'200px' ,height:'40%'}}>
                          <Menu
                              mode="inline"
                              defaultSelectedKeys={['setting:1']}
                              defaultOpenKeys={['sub1']}
                              style={{ height: '40%',backgroundColor:'rgba(0,0,0,0)' }}
                              theme={"dark"}
                          >
                            <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="分类">
                              <Menu.Item key="setting:1" onClick={() => onToggleField("all")}>全部</Menu.Item>
                              <Menu.ItemGroup title="图书资料">
                                <Menu.Item key="setting:2"onClick={() => onToggleField("高数")}>高数</Menu.Item>
                                <Menu.Item key="setting:3"onClick={() => onToggleField("英语")}>英语</Menu.Item>
                                <Menu.Item key="setting:4"onClick={() => onToggleField("其他图书")}>其他图书</Menu.Item>
                              </Menu.ItemGroup>
                              <Menu.ItemGroup title="电子产品">
                                <Menu.Item key="setting:5"onClick={() => onToggleField("手机")}>手机</Menu.Item>
                                <Menu.Item key="setting:6"onClick={() => onToggleField("电脑")} >电脑</Menu.Item>
                                <Menu.Item key="setting:7"onClick={() => onToggleField("其他数码")} >其他数码</Menu.Item>
                              </Menu.ItemGroup>
                              <Menu.ItemGroup title="其他">
                                <Menu.Item key="setting:8"onClick={() => onToggleField("生活用品")}>生活用品</Menu.Item>
                                <Menu.Item key="setting:9"onClick={() => onToggleField("杂物")} >杂物</Menu.Item>
                                <Menu.Item key="setting:10"onClick={() => onToggleField("虚拟商品")} >虚拟商品</Menu.Item>
                              </Menu.ItemGroup>
                            </SubMenu>
                          </Menu>
                        </Sider>
                        <Content style={{  padding: "0 0px", minHeight: '400'}}>

{/*商品界面加载中*/}
                            <Spin tip="" spinning={loading2} size="large" indicator={antIcon} style={{backgroundColor:"#0079af",color:'black',fontSize:36}}>

                              {loading2?( <div className={styles.wrapper}>  </div>):( <div className={styles.wrapper}> <div className={styles.main}>
                                <List>
                                  {todo.length ? (
                                      todo
                                          // .filter((v) => v.status === status)
                                          .filter((v) =>((field=="all") ?(v.field !== ""):(v.field === field) ))
                                          .map((v) => (
                                              <Link to={{pathname:"/Detail/"+v._id ,state:v._id}  } key={v._id}>
                                                <TodoItem
                                                    todoId={v.todoId}
                                                    userId={v.userId}
                                                    uid={v.field}
                                                    field={v.field}
                                                    key={v._id}
                                                    content={v.content}
                                                    url={v.url}
                                                    position={v.position}
                                                    startime={v.startime}
                                                    price={v.price}
                                                    id={v._id}
                                                    type={modalType}
                                                    finished={status}
                                                    onShowModal={onShowModal}
                                                    onDelete={onDelete}
                                                    onUpdateStatus={onUpdateStatus}
                                                    routerTo={routerTo}
                                                /></Link>
                                          ))
                                  ) : (
                                      <Empty className={styles.noData} key={'0'}/>
                                  )}
                                </List>
                                <ModalForm
                                    userId={user.userId}
                                    position={user.position}
                                    info1={user.info1}
                                    modalType={modalType}
                                    content={content}
                                    price={price}
                                    desc={desc}
                                    todoId={todoId}
                                    field={field}
                                    visible={showModal}
                                    title={modalTitle}
                                    onClose={onClose}
                                    onAdd={onAdd}
                                    onUpdateContent={onUpdateContent}
                                />
                                <BackTop/>
                              </div>
                                  </div>
                                )}
                                </Spin>

                        </Content>
                      </Layout>

                            )}
          </Spin>
        </Content>
      </Layout>


  );
};

export default connector(Todo);
