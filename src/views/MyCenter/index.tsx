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
    Spin,
    Badge
} from 'antd';
import {AndroidOutlined,AppleOutlined,UnorderedListOutlined,ExportOutlined,QqOutlined,EnvironmentTwoTone,SmileTwoTone} from '@ant-design/icons';
import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps,Link } from 'react-router-dom';
import { ModalType } from '../../common/enum';
import ModalForm from '../../components/FormModal';
import TodoItem from '../../components/TodoItem';
import { AppStore } from '../../store';
import {
    addTodo,
    deleteTodo, fetchALLGoods,
    fetchTodo,
    searchTodo,
    updateTodoContent,
    updateTodoStatus,updateTodoDesc
} from '../../store/todo/actions';
import { keepLogin, logout,updateposition ,fetchuser,updateinfo1} from '../../store/user/actions';
import { LocalStorage } from '../../utils';
// @ts-ignore
import styles from './index.module.scss';
import { Layout, Breadcrumb } from 'antd';
import {ITodoState} from "../../store/todo/types";
import {IUserState} from "../../store/user/types";
import {userInfo} from "os";

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
    updateposition,
    updateinfo1,updateTodoDesc
};
////
const { SubMenu } = Menu;

const { Option, OptGroup } = Select;


////
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IMyCenterProps extends PropsFromRedux, RouteComponentProps {}
const Search = Input.Search;

const MyCenter: FC<IMyCenterProps> = ({
                                  history,
                                  todo,
                                  user,
                                  logout,
                                  fetchuser,
                                  keepLogin,
                                  updateposition,
    updateinfo1,
                                  deleteTodo,
                                  updateTodoContent,
                                  updateTodoStatus,updateTodoDesc,
                                  fetchTodo, fetchALLGoods,
                                  addTodo,
                                  searchTodo,
                              }) => {
    const [form] = Form.useForm();
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
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        const userId = LocalStorage.get('userId');
        const username = LocalStorage.get('username');
        const position = LocalStorage.get('position');
        const info1 = LocalStorage.get('info1');
        setTimeout(() => {
            setLoading( false );
        }, 400);

        if (userId && username&&position&&info1) {
            if (user.username) {
                // console.log(user.username)
//         console.log() ;
//                 fetchTodo(userId);

                fetchuser(userId);

                // console.log(user.position)
                // console.log(LocalStorage.get('position'))

//         // fetchTodo(userId);
//         fetchALLGoods()
//         console.log(fetchTodo(userId)) ;
//

                ///////查找全部


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
        message.info(field);
    };
    function handleChange(value:string) {
        message.success(`更新成功！`);
        updateposition1(value)

        return value;
    }
    function handleChange2(event) {
        console.log(event.target.value);
        updateinfo(event.target.value)
        message.success('更新成功！')
    }
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

    const updateposition1 = (position:string) =>{

        const userId = user.userId;
        updateposition(userId,position);

        // console.log(position)

    }
    const updateinfo = (info1:string) =>{

        const userId = user.userId;

        updateinfo1(userId,info1);

        // console.log(position)

    }


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
                    <Menu   theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15}} defaultSelectedKeys={['4']}>
                        <Menu.Item key="4"><Link to={'MyCenter'}>个人空间</Link></Menu.Item>
                        <Menu.Item key="5"><Badge size="small" count= { todo.filter((v) =>(v.buyerId===user.userId )).length}><Link to={'/MyBuy'}> 我买到的</Link></Badge></Menu.Item>

                        <Menu.Item key="6"><Badge size="small" count= { todo.filter((v) =>(v.userId===user.userId )).length}><Link to={'/Mygood'}>
                            我发布的</Link> </Badge></Menu.Item>

                        <Menu.Item key="7"><Link to={'/MySell'}>我卖出的</Link></Menu.Item>
                        <Menu.Item ><ExportOutlined onClick={logout} width={100}/></Menu.Item>
                    </Menu>
                </div>

            </Header>

            <Content style={{ padding: '0 50px' ,minHeight:'1000px',backgroundColor:'#0079af' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>个人空间</Breadcrumb.Item>
                    {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                </Breadcrumb>

                <Spin      tip="" spinning={loading} size="large" indicator={antIcon} style={{backgroundColor:"#0079af",color:'black',fontSize:36}}>

                    {loading?(
                            <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}>

                        </Layout>

                    ):(
                        <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}>
                            <Sider className="site-layout-background" style={{width:'200px' ,height:'40%'}}>

                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>


                                <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt=""width={200}height={200} />

                                <EnvironmentTwoTone twoToneColor="black" style={{fontSize:36}}/>   我的位置：

                                <Select placeholder= {( ()=>{
                                        switch(user.position){
                                            case "117.09186,39.095514": return '致知斋';
                                            case "117.092487,39.095535": return '重能斋';
                                            case "117.093297,39.09551": return '求实斋';
                                            case "117.096065,39.093662": return '春华斋';
                                            default:return '数据为空';
                                        }
                                    }
                                )()} style={{ width: 200 }} onChange={handleChange}>
                                    <OptGroup label="Manager">
                                        <Option value="117.09186,39.095514" >致知斋</Option>
                                        <Option value="117.092487,39.095535">重能斋</Option>
                                    </OptGroup>
                                    <OptGroup label="Engineer">
                                        <Option value="117.093297,39.09551">求实斋</Option>
                                        <Option value="117.096065,39.093662">春华斋</Option>
                                    </OptGroup>
                                </Select>



                                <Form form={form}  onChange={event=>handleChange2(event)}>
                                    <Form.Item name="info">
                                        <QqOutlined style={{marginLeft:210,fontSize:36}} />联系方式：
                                        <Input   name="info"  style={{width:200, marginLeft:0}} placeholder={user.info1} defaultValue={user.info1} />
                                    </Form.Item>
                                </Form>

                            </Content>

                        </Layout>

                            )}


                        </Spin>

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
            </Content>


            <Footer style={{ textAlign: 'center' , marginBottom:'0px' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>


    );
};

export default connector(MyCenter);
