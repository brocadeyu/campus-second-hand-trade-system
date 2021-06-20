import {
    Button,
    Empty,
    Input,
    Select,
    message,
    Menu,
    Avatar,
    BackTop,
    List,
    Dropdown,
    Form,
    Card,
    Progress,
    Popconfirm, Modal, Badge, Spin
} from 'antd';
import {AndroidOutlined,AppleOutlined,UnorderedListOutlined,DeleteOutlined,ExportOutlined,SmileTwoTone} from '@ant-design/icons';
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
    updateTodoStatus,updateTodoBuyerId,updateTodoDesc
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

interface IMygoodProps extends PropsFromRedux, RouteComponentProps {}
const Search = Input.Search;

const Mygood: FC<IMygoodProps> = ({
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
    const [todoId, setTodoId] = useState('');
    const [field, setField] = useState("all");
    const [url,setUrl]=useState("");
    const [loading,setLoading]=useState(true);


    useEffect(() => {
        const userId = LocalStorage.get('userId');
        const username = LocalStorage.get('username');
        setTimeout(() => {
            setLoading( false );
        }, 500);
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
    const [form] = Form.useForm();
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
        onClose();
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
    function info(info2:string) {
        Modal.info({
            title: '联系信息',
            content: (
                <div>

                QQ:    {info2}

                </div>
            ),
            onOk() {},
        });
    }
    const onShowModal = (type: ModalType, todoId: string, content: string,price:number,desc:string) => {
        setShowModal(true);
        if (type === ModalType.Add) {
            setModalTitle('新增商品');

            // setField('3');
            setModalType(ModalType.Add);
        }
        if (type === ModalType.Edit) {
            setModalTitle('编辑商品信息');
            setModalType(ModalType.Edit);


            setContent(content);
            setDesc(desc);
            setPrice(price);
            setTodoId(todoId);
            console.log("000");
            console.log(content);
            console.log("000");
        }
    };

////
    const  routerTo = (v: ITodoState) =>{
        return   history.push({pathname: `/Detail/${v._id}`, state: {data: v}})

    }
    const count =     todo
        // .filter((v) => v.status === status)
        .filter((v) =>(v.userId===user.userId )).length||null
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
    const antIcon = <SmileTwoTone twoToneColor="#f37fb7" style={{ fontSize: 80 }} spin />;


    return (
        <Layout>
            <Header className={styles.header}>
                <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15,color:'red'}} >
                    <Menu.Item key="1" ><Link to={'/home'}>首页</Link></Menu.Item>
                    <Menu.Item key="2">  <Link to={'/todo'}>出售</Link></Menu.Item>
                    <Menu.Item key="3">求购</Menu.Item>
                </Menu>
                <div className={styles.user}> <Avatar style={{top:0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /><span>{user.username}</span></div>
                <div className={styles.menu}>
                    <Menu   theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15}} defaultSelectedKeys={['6']}>
                        <Menu.Item key="4"><Link to={'MyCenter'}>个人空间</Link></Menu.Item>
                        <Menu.Item key="5"><Badge size="small" count= { todo.filter((v) =>(v.buyerId===user.userId )).length}><Link to={'/MyBuy'}> 我买到的</Link></Badge></Menu.Item>
                        <Menu.Item key="6"><Badge size="small" count= { todo.filter((v) =>(v.userId===user.userId )).length}><Link to={'/Mygood'}>我发布的</Link> </Badge></Menu.Item>
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

                <Spin      tip="" spinning={loading} size="large" indicator={antIcon} style={{backgroundColor:"#0079af",color:'black',fontSize:36}}>
                    {loading?(<Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}> </Layout>):(

                        <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <div className={styles.wrapper} >
                                <div className={styles.main}>
                                    <List >
                                        {todo.length ? (
                                            todo
                                                // .filter((v) => v.status === status)
                                                .filter((v) =>(v.userId===user.userId ))
                                                .map((v) => (
                                                    // <button onClick={()=>routerTo(v)} style={{backgroundColor: "rgba(0,0,0,0)"}}>
                                                    <div style={{width:350,height:650,float:"left"}}  >
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
                                                            />
                                                        </Link>
                                                        <div style={{width:170,marginTop:20,marginLeft:100,}}>

                                                            {( ()=>{
                                                                    switch(v.status){
                                                                        case "0": return <div><Progress percent={30} status="active" size="small" showInfo={false} />出售中。。。</div>;
                                                                        case "1": return <div><Progress percent={60} status="active" size="small" showInfo={false} />买家已购买，请你确认</div>;
                                                                        case "2": return <div><Progress percent={100} status="active" size="small" showInfo={false} />交易成功，请线下交易！</div>;
                                                                        default:return '数据为空';
                                                                    }
                                                                }
                                                            )()}
                                                        </div>

                                                        <div style={{width:350,marginTop:15,float:"left",}}>
                                                            <div style={{float:"left"}}>
                                                                <div style={{float:"left"}}>
                                                                    {v.status==='2'?(
                                                                            // <Button className={styles.onEdit} type={'primary'} onClick={() => onShowModal(ModalType.Edit, v._id, v.content,v.price)}>查看联系方式</Button>
                                                                            <Button className={styles.onContact} type={'primary'}  onClick={()=>info(v.info2)}>联系买家</Button>
                                                                            //查看联系信息
                                                                        )
                                                                        :(v.status === '1'?(<Popconfirm
                                                                            title="取消交易吗?"
                                                                            onConfirm={()=>(onUpdate(v._id,'0','0'))}
                                                                            //确认交易                 // onCancel={message.info('取消')}
                                                                            okText="Yes"
                                                                            cancelText="No"
                                                                        >
                                                                            <Button href="#" type={"primary"} className={styles.onContact} >取消交易</Button>
                                                                        </Popconfirm>):(''))

                                                                    }
                                                                </div>

                                                                <div  style={{float:"left"}}>
                                                                    {v.status==='1'?(
                                                                        <Popconfirm
                                                                            title="确定交易吗?你将获取买家联系信息，线下交易"
                                                                            onConfirm={()=>(onUpdate(v._id,'2',user.userId))}
                                                                            //确认交易                 // onCancel={message.info('取消')}
                                                                            okText="Yes"
                                                                            cancelText="No"
                                                                        >
                                                                            <Button href="#" type={"primary"} className={styles.onConfirm} >确认交易</Button>
                                                                        </Popconfirm> ):('')}

                                                                </div>
                                                            </div>

                                                            <div  >

                                                                <div style={{float:"left"}}>
                                                                    <Button className={styles.onEdit} type={'primary'}    onClick={() => onShowModal(ModalType.Edit, v._id, v.content,v.price,v.desc)}>编辑</Button>
                                                                    {/*//编辑*/}
                                                                </div>
                                                                <div style={{float:"left"}}>
                                                                    <Button className={styles.onDelete} type={'primary'}   danger={true}  onClick={()=>onDelete(user.userId,v._id)}>删除</Button>
                                                                    {/*//删除*/}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

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
                    </Layout>)}

                    </Spin>
            </Content>

        </Layout>


    );
};

export default connector(Mygood);
