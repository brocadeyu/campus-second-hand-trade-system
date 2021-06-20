import {Button, Empty, Input, Select, message, Menu, Avatar, BackTop, List, Result, Dropdown, Spin, Badge,} from 'antd';
import React, { FC, useEffect, useState } from 'react';
import {AndroidOutlined,AppleOutlined,UnorderedListOutlined,ExportOutlined,SmileTwoTone} from '@ant-design/icons';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps,Link ,useLocation} from 'react-router-dom';
import { ModalType } from '../../common/enum';
import ModalForm from '../../components/FormModal';
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
    updateTodoInfo2,updateTodoDesc
} from '../../store/todo/actions';
import { keepLogin, logout,fetchuser } from '../../store/user/actions';
import { LocalStorage } from '../../utils';
import styles from './index.module.scss';
import { Layout, Breadcrumb } from 'antd';
import {ITodoState} from "../../store/todo/types";
import DetailItem from "../../components/DetailItem";

const { Header, Content, Footer, Sider } = Layout;
const mapState = ({ todo, user }: AppStore) => ({
    todo,
    user,
});

const mapDispatch = {
    logout,
    keepLogin,
    fetchuser,
    addTodo,
    deleteTodo,
    fetchTodo,
    fetchALLGoods,
    searchTodo,
    updateTodoContent,
    updateTodoStatus,
    updateTodoBuyerId,
    updateTodoInfo2,
    updateTodoDesc,

};
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ITodoProps extends PropsFromRedux, RouteComponentProps {}
const Search = Input.Search;

const Detail: FC<ITodoProps> = ({
                                    history,
                                    todo,
                                    location,
                                    user,
                                    logout,
                                    keepLogin,
                                    deleteTodo,
                                    updateTodoContent,
                                    updateTodoStatus,
    updateTodoBuyerId,updateTodoInfo2,updateTodoDesc,
                                    fetchTodo, fetchALLGoods,
                                    addTodo,
                                    searchTodo,
                                }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [status, setStatus] = useState(false);
    const [content, setContent] = useState('');
    const [modalType, setModalType] = useState('');
    const [todoId, setTodoId] = useState('000');
    const [field, setField] = useState("all");
    const [loading,setLoading]=useState(true);

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
                // console.log(user.username)
//         console.log() ;
                fetchTodo(userId);
                //
                fetchuser(userId);


            } else   {
                keepLogin({ userId, username, errMsg: '' ,position,info1});
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
    const onAdd = (content: string,field:string,url:string,position:string,price:number,info1:string,desc:string) => {
        addTodo(user.userId, content,field,url,position,price,info1,desc);
        setStatus(false);
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
    const onUpdateInfo2 = (todoId:string,info2:string)=>{

        updateTodoInfo2(todoId,info2);

    }
    const onUpdate =(todoId:string,value:string,bId:string,info2:string)=>{

        onUpdateStatus(todoId,value);
        onUpdateBuyerId(todoId,bId);
        onUpdateInfo2(todoId,info2)

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
        if (type === ModalType.Buy) {
            setModalTitle('购买');
            setModalType(ModalType.Buy);
        }
    };
    const  routerTo = (v: ITodoState) =>{
        return   history.push({pathname: `/Detail/${v._id}`, state: {data: v}})
    }
    const v = location.state;

    function usePageViews() {
        let location = useLocation();
        React.useEffect(() => {
            console.log(["pageview", location.pathname]);
        }, [location]);
    }
    const menu = (
        <Menu>
            <Menu.Item> <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">个人空间</a> </Menu.Item>

            <Menu.Item> <a target="_blank" rel="noopener noreferrer" onClick={logout}>退出</a> </Menu.Item>
        </Menu>
    );
    const antIcon = <SmileTwoTone twoToneColor="#f37fb7" style={{ fontSize: 80 }} spin />;
    // @ts-ignore
    return (
        <Layout>
            <Header className={styles.header}>

                <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15,color:'red'}}  defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" ><Link to={'/home'}>首页</Link></Menu.Item>
                    <Menu.Item key="2">  <Link to={'/todo'}>出售</Link></Menu.Item>
                    <Menu.Item key="3">求购</Menu.Item>
                </Menu>

                <div className={styles.user}> <Avatar style={{top:0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /><span>{user.username}</span></div>

                <div className={styles.menu}>
                    <Menu   theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15}} >
                        <Menu.Item key="4"><Link to={'/MyCenter'}>个人空间</Link></Menu.Item>
                        <Menu.Item key="5"><Badge size="small" count= { todo.filter((v) =>(v.buyerId===user.userId )).length}><Link to={'/MyBuy'}> 我买到的</Link></Badge></Menu.Item>
                        <Menu.Item key="6"><Badge size="small" count= { todo.filter((v) =>(v.userId===user.userId )).length}><Link to={'/Mygood'}>
                            我发布的</Link> </Badge></Menu.Item>
                        <Menu.Item key="7"><Link to={'/MySell'}> 我卖出的</Link></Menu.Item>
                        <Menu.Item ><ExportOutlined onClick={logout} width={100}/></Menu.Item>
                    </Menu>
                </div>

            </Header>

            <Content style={{ padding: '0 50px' ,minHeight:'1000px',backgroundColor:'#fff' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>出售</Breadcrumb.Item>
                    <Breadcrumb.Item>商品详情</Breadcrumb.Item>
                </Breadcrumb>
{/*加载中*/}
                <Spin      tip="" spinning={loading} size="large" indicator={antIcon} style={{backgroundColor:"#fff",color:'black',fontSize:36}}>
                    {loading?( <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#fff' }}> </Layout>):(

                        <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#fff' }}>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <div className={styles.wrapper} >
                                <div style={{width:200,marginRight:1750}} ><Button onClick={history.goBack} style={{left:20}} >返回</Button></div>
                                <div className={styles.main}>
                                    <List>

                                        {todo.length ? (todo
                                                .filter((v) => v._id == location.state)
                                                .map((v) => (
                                                    <DetailItem
                                                        userId={v.userId}
                                                        status={v.status}
                                                        info2={user.info1}
                                                        uid={v.field}
                                                        field={v.field}
                                                        desc={v.desc}
                                                        buyerId={v.buyerId}
                                                        url={v.url}
                                                        goodposition={v.position}
                                                        myposition={user.position}
                                                        key={v._id}
                                                        content={v.content}
                                                        price={v.price}
                                                        id={v._id}
                                                        bId={user.userId}
                                                        type={modalType}
                                                        finished={status}
                                                        onShowModal={onShowModal}
                                                        onDelete={onDelete}
                                                        onUpdateStatus={onUpdateStatus}
                                                        onUpdateInfo2={onUpdateInfo2}
                                                        onUpdateBuyerId={onUpdateBuyerId}
                                                        onUpdate={onUpdate}
                                                        routerTo={routerTo}
                                                    />
                                                ))
                                        ) : (<Empty className={styles.noData} />)}
                                    </List>
                                    <BackTop/>
                                </div>
                            </div>
                        </Content>
                    </Layout>)}

                   </Spin>
            </Content>
        </Layout>
    );
};

export default connector(Detail);
