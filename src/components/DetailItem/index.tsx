import React, { FC } from 'react';
import styles from './index.module.scss';
import { ModalType } from '../../common/enum';
import {Space, Descriptions, Badge, Result, Button, message,Popconfirm} from 'antd';
import {ITodoState} from "../../store/todo/types";
import {Image} from "antd";
import {Link} from "react-router-dom";
import {LocalStorage} from "../../utils";

interface IDetailItem {
    uid:string;
    field:string;
    userId:string;
    buyerId:string;
    id: string;
    status:string;
    info2:string;
   myposition:string;
    type: string;
    content: string;
    desc:string;
    price:number;
    url:string;
    goodposition:string;
    bId:string;
    finished: boolean;
    onShowModal: (type: ModalType, todoId: string, content: string) => void;
    onUpdateStatus: (todoId: string,value:string) => void;
    onUpdateInfo2: (todoId: string,info2:string) => void;
    onUpdateBuyerId: (todoId: string,bId:string) => void;
    onDelete: (userId:string,todoId: string) => void;
    routerTo : (v:ITodoState) => void;
    onUpdate:(todoId:string,value:string,bId:string,info2:string) =>void;

}




const DetailItem: FC<IDetailItem> = ({
                                     id,
                                     field,
                                     uid,
    buyerId,bId,myposition,info2,desc,price,
                                     content,
    status,userId,url,goodposition,
                                     onUpdateStatus,
    onUpdateBuyerId,
    onUpdate,
                                     finished,
                                     onDelete,
                                     onShowModal,
                                     routerTo,
                                 }) => (

    <div>

        {LocalStorage.get('userId')===buyerId?
            (<div>

                <Result
                status="success"
                title="预购买成功！等待卖家确认"
                subTitle="购买成功，请耐心等待！"
                extra={[
                    <Button > <Link to={'/MyBuy'}>
                        查看购买页
                    </Link></Button>
                   ,

                    <Button > <Link to={'/todo'}>
                        继续购买
                    </Link></Button>,
                ]}
            />
            </div>):
            ( <div style={{backgroundColor:'rgba(0,0,0,0)'}}>

                <Image src={"http://goodyjb.oss-cn-beijing.aliyuncs.com/"+url} alt=""  style={{width:400}}/>

                <Descriptions title="商品 信息" bordered contentStyle={{backgroundColor:'rgba(0,0,0,0)'}}>
                    <Descriptions.Item label="物品名">{content}</Descriptions.Item>
                    <Descriptions.Item label="类别">{field}</Descriptions.Item>
                    <Descriptions.Item label="描述">
                        {desc}
                    </Descriptions.Item>
                    <Descriptions.Item label="售价">{price} 元</Descriptions.Item>
                    <Descriptions.Item label="发布者">{userId}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="状态" span={2}>
                        { (status==='0')?( <Badge color={"green"} status="processing" text="在售" />):(<Badge  status="warning" text="锁定" />)}
                    </Descriptions.Item>
                    <Descriptions.Item label="发布位置">
                        {( ()=>{
                                switch(goodposition){
                                    case "117.09186,39.095514": return '致知斋';
                                    case "117.092487,39.095535": return '重能斋';
                                    case "117.093297,39.09551": return '求实斋';
                                    case "117.096065,39.093662": return '春华斋';
                                    default:return '数据为空';
                                }
                            }
                        )()}
                    </Descriptions.Item>
                </Descriptions>


<div style={{float:"left",width:2000}} >




         <div style={{float:"left"}}>  {status==='0'?
                (LocalStorage.get('userId')===userId?
                    (<Button type="primary" disabled className={styles.buy}>
                        购买
                    </Button>):(
                        <Popconfirm
                            title="确定购买吗?"
                            onConfirm={()=>(onUpdate(id,'1',bId,info2))}
                            // onCancel={message.info('取消')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button href="#" className={styles.buy}>购买</Button>
                        </Popconfirm>) ):
                (LocalStorage.get('userId')===userId?(<Button disabled={true} className={styles.buy}>购买</Button>)
                    :(<Button onClick={()=>message.info('商品已被锁定，您还有机会！')} className={styles.buy}>购买</Button>))}
</div>






    <div style={{float:"left"}}>
        <a href={"https://m.amap.com/navi/?start="
             +myposition+"&dest="+goodposition
              + "&destName=阜通西&naviBy=walk&key=db1e9955747e211f6c1471818a21d5ad " }
             target={'_blank'} >
            <Button className={styles.nav} >导航</Button>
        </a>
    </div>







</div>



        </div>)

        }

        {/*{goodposition}*/}
        {/*{myposition}*/}
        {/*<Link to={{pathname:"/Map/"+id ,state:id}  } target={'_blank'} ><button >导航</button></Link>*/}

        {/*{ (status==='0')?(<Result*/}
        {/*    status="success"*/}
        {/*    title="Successfully Purchased Cloud Server ECS!"*/}
        {/*    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."*/}
        {/*    extra={[*/}
        {/*        <Button type="primary" key="console">Go Console</Button>,*/}
        {/*        <Button key="buy">Buy Again</Button>,*/}
        {/*    ]}*/}
        {/*/> ):(<p></p>)}*/}



</div>



);

export default DetailItem;
