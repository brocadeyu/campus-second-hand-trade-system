import {Button, Empty, Input, Select, message, Menu, Avatar, BackTop, List, Dropdown, Image, Form, Badge} from 'antd';
import {AndroidOutlined,AppleOutlined,UnorderedListOutlined,ExportOutlined} from '@ant-design/icons';
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
import { keepLogin, logout,updateposition ,fetchuser} from '../../store/user/actions';
import { LocalStorage } from '../../utils';
// @ts-ignore
import styles from './index.module.scss';
import { Layout, Breadcrumb } from 'antd';
import {ITodoState} from "../../store/todo/types";
import {IUserState} from "../../store/user/types";

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
    updateTodoDesc
};
////
const { SubMenu } = Menu;

const { Option, OptGroup } = Select;


////
const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IHomeProps extends PropsFromRedux, RouteComponentProps {}
const Search = Input.Search;

const Home: FC<IHomeProps> = ({
                                  history,
                                  todo,
                                  user,
                                  logout,
    fetchuser,
                                  keepLogin,
    updateposition,
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


    useEffect(() => {
        const userId = LocalStorage.get('userId');
        const username = LocalStorage.get('username');
        const position = LocalStorage.get('position');
        const info1 = LocalStorage.get('info1');


        if (userId && username&&position&&info1) {
            if (user.username) {
                // console.log(user.username)
//         console.log() ;
                fetchTodo(userId);

                fetchuser(userId);



//         // fetchTodo(userId);
//         fetchALLGoods()
//         console.log(fetchTodo(userId)) ;
//

                ///////????????????


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
        message.info(`selected ${value}`);
        updateposition1(value)

        return value;
    }

    const onAdd = (userId:string,content: string,field:string,url:string,position:string,price:number,info1:string,desc:string) => {
        if(content!==''&&field!==''){ addTodo(userId, content,field,url,position,price,info1,desc);
            setStatus(false);
            onClose();

        }else message.info("???????????????")



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
            setModalTitle('????????????');
            setContent('');
            // setField('3');
            setModalType(ModalType.Add);
        }
        if (type === ModalType.Edit) {
            setModalTitle('????????????');
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
    const  routerTo = (v: ITodoState) =>{
        return   history.push({pathname: `/Detail/${v._id}`, state: {data: v}})

    }



    return (
        <Layout>
            <Header className={styles.header}>
                <Menu theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15,color:'red'}}  defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" ><Link to={'/home'}>??????</Link></Menu.Item>
                    <Menu.Item key="2">  <Link to={'/todo'}>??????</Link></Menu.Item>
                    <Menu.Item key="3">??????</Menu.Item>
                </Menu>
                <div className={styles.user}> <Avatar style={{top:0}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /><span>{user.username}</span></div>
                <div className={styles.menu}>
                    <Menu   theme="dark" mode="horizontal" style={{backgroundColor: 'rgba(0,0,0,0)',fontSize:15}} >
                        <Menu.Item key="4"><Link to={'MyCenter'}>????????????</Link></Menu.Item>
                        <Menu.Item key="5"><Badge size="small" count= { todo.filter((v) =>(v.buyerId===user.userId )).length}><Link to={'/MyBuy'}> ????????????</Link></Badge></Menu.Item>
                        <Menu.Item key="6"><Badge size="small" count= { todo.filter((v) =>(v.userId===user.userId )).length}><Link to={'/Mygood'}>????????????</Link> </Badge></Menu.Item>
                        <Menu.Item key="7"><Link to={'/MySell'}> ????????????</Link></Menu.Item>
                        <Menu.Item ><ExportOutlined onClick={logout} width={100}/></Menu.Item>
                    </Menu>
                </div>
            </Header>

            <Content style={{ padding: '0 50px' ,minHeight:'1000px',backgroundColor:'#0079af' }}>
                <Breadcrumb style={{ margin: '16px 0' }}><Breadcrumb.Item>??????</Breadcrumb.Item></Breadcrumb>


                <Layout className="site-layout-background" style={{ padding: '24px 0',backgroundColor:'#0079af' }}>
                    <Sider className="site-layout-background" style={{width:'50px' ,height:'40%'}}>

                    </Sider>
                    <Image  src={'https://goodyjb.oss-cn-beijing.aliyuncs.com/student_PNG62560.png'   } preview={false} style={{width:300}} > </Image>
                    <Content style={{ padding: '0 24px', minHeight: 280,fontSize:30 }}>
                        ???????????????
                        <p></p>
                        1 ????????????
                        <p></p>
                        2 ??????????????????=??????????????????????????????????????????
                        <p></p>
                        3 ???????????????????????????=?????????=????????????????????????=?????????????????????=???????????????=?????????
                        <p></p>
                        4 ???????????????????????????=?????????=????????????????????????=???????????????=?????????????????????=???????????????=?????????
                        <p></p>
                        5 ??????



                    </Content>
                </Layout>
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
        </Layout>

    );
};

export default connector(Home);
