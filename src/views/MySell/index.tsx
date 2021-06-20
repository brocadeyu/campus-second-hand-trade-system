import {Button, Empty, Input, Select, message, Menu, Avatar, BackTop, List, Dropdown, Form, Card,} from 'antd';
import {AndroidOutlined,AppleOutlined,UnorderedListOutlined,DeleteOutlined,ExportOutlined} from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps,Link } from 'react-router-dom';
import { ModalType } from '../../common/enum';
import ModalForm from '../../components/FormModal';
import { AppStore } from '../../store';
import {
    addTodo,
    deleteTodo,
    fetchALLGoods,
    fetchTodo,
    fetchMyTodo,
    searchTodo,
    updateTodoContent,
    updateTodoStatus,updateTodoDesc
} from '../../store/todo/actions';
import { keepLogin, logout } from '../../store/user/actions';
import { LocalStorage } from '../../utils';
// @ts-ignore
import styles from './index.module.scss';
import { Layout, Breadcrumb } from 'antd';
import {ITodoState} from "../../store/todo/types";
import TodoItem from "../../components/TodoItem";
//布局
const { Header, Content, Footer, Sider } = Layout;

const mapState = ({ todo, user }: AppStore) => ({
    todo,
    user,
});

const mapDispatch = {
    logout,
    keepLogin,
    addTodo,
    deleteTodo,
    fetchTodo,
    fetchMyTodo,
    fetchALLGoods,
    searchTodo,
    updateTodoContent,
    updateTodoStatus,
    updateTodoDesc,
};

const { SubMenu } = Menu;
const { Option, OptGroup } = Select;
function handleChange(value:string) {
    message.info(`selected ${value}`);
}
////
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IMySellProps extends PropsFromRedux, RouteComponentProps {}
const Search = Input.Search;

const MySell: FC<IMySellProps> = ({
                                      history,
                                      todo,
                                      user,
                                      logout,
                                      keepLogin,
                                      deleteTodo,
                                      fetchMyTodo,
                                      updateTodoContent,
                                      updateTodoStatus,updateTodoDesc,
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
    const [url,setUrl]=useState("")


    useEffect(() => {
        const userId = LocalStorage.get('userId');
        const username = LocalStorage.get('username');

        if (userId && username) {
            if (user.username) {
                console.log(user.userId)

                fetchTodo(userId);

            } else {
                keepLogin({ userId, username, errMsg: '',position:'',info1:'' });
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
        message.info(field);
    };

    const onAdd = (userId:string,content: string,field:string,url:string,position:string,price:number,info1:string,desc:string) => {
        if(content!=''&&field!=''){ addTodo(userId, content,field,url,position,price,info1,desc);
            setStatus(false);
            onClose();
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
            // setField('3');
            setModalType(ModalType.Add);
        }
        if (type === ModalType.Edit) {
            setModalTitle('编辑价格');
            setModalType(ModalType.Edit);
            setContent(content!);
            setTodoId(todoId!);
        }
    };

////
    const  routerTo = (v: ITodoState) =>{
        return   history.push({pathname: `/Detail/${v._id}`, state: {data: v}})

    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    个人空间
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={logout}>
                    退出
                </a>
            </Menu.Item>
        </Menu>
    );



    return (
        <Layout>
            <Header className={styles.header}>

                <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15,color:'red'}}  >
                    <Menu.Item key="1" ><Link to={'/home'}>首页</Link></Menu.Item>
                    <Menu.Item key="2">  <Link to={'/todo'}>出售</Link></Menu.Item>
                    <Menu.Item key="3">求购</Menu.Item>
                </Menu>


                <div className={styles.user}> <Avatar style={{top:0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /><span>{user.username}</span></div>

                <div className={styles.menu}>
                    <Menu   theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15}} defaultSelectedKeys={['7']}>
                        <Menu.Item key="4"><Link to={'MyCenter'}>个人空间</Link></Menu.Item>
                        <Menu.Item key="5"><Link to={'/MyBuy'}> 我买到的</Link></Menu.Item>
                        <Menu.Item key="6"><Link to={'/Mygood'}> 我发布的</Link></Menu.Item>
                        <Menu.Item key="7"><Link to={'/MySell'}> 我卖出的</Link></Menu.Item>
                        <Menu.Item ><ExportOutlined onClick={logout} width={100}/></Menu.Item>
                    </Menu>
                </div>

            </Header>

            <Content style={{ padding: '0 50px' ,minHeight:'1000px',backgroundColor:'#0079af' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}>

                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <div className={styles.wrapper}>
                            <div className={styles.main}>
                                <List >
                                    {todo.length ? (
                                        todo
                                            // .filter((v) => v.status === status)
                                            .filter((v) =>(v.userId===user.userId ))
                                            .filter((v) =>(v.status!=='0' ))
                                            .map((v) => (
                                                // <button onClick={()=>routerTo(v)} style={{backgroundColor: "rgba(0,0,0,0)"}}>
<div>
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

    <Button onClick={()=>onDelete}>删除</Button>
                                        </div>
                                                // </button>
                                            ))
                                    ) : (
                                        <Empty className={styles.noData} key={'0'}/>
                                    )}
                                </List>
                                <ModalForm
                                    userId={user.userId}
                                    modalType={modalType}
                                    content={content}
                                    price={price}
                                    desc={desc}
                                    todoId={todoId}
                                    field={field}
                                    position={user.position}
                                    info1={user.info1}
                                    visible={showModal}
                                    title={modalTitle}
                                    onClose={onClose}
                                    onAdd={onAdd}
                                    onUpdateContent={onUpdateContent}
                                />
                                <BackTop/>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Content>


            <Footer style={{ textAlign: 'center' , marginBottom:'0px' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>


    );
};

export default connector(MySell);
