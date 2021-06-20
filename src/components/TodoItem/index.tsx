import {
  EditOutlined, SettingOutlined,EllipsisOutlined,DeleteOutlined
} from '@ant-design/icons';
import React, { FC } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn'
import styles from './index.module.scss';
import { ModalType } from '../../common/enum';
import {Space, Card, Avatar,Tooltip,Comment} from 'antd';
import {ITodoState} from "../../store/todo/types";

const IconText = ({icon ,text}:any) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);



interface ITodoItem {
  uid:string;
field:string;
todoId:string;
  id: string;
  userId:string;
  type: string;
  content: string;
  price:number;

  url:string;
  position:string;
  startime:string;
  finished: boolean;
  onShowModal: (type: ModalType, todoId: string, content: string,price:number,desc:string) => void;
  onUpdateStatus: (todoId: string,value:string) => void;

  onDelete: (userId:string,todoId: string) => void;
    routerTo : (v:ITodoState) => void;

}

const TodoItem: FC<ITodoItem> = ({
  id,
 field,
    uid,
    todoId,
    userId:string,
    url,
    position,price,
  content,startime,
  onUpdateStatus,


  finished,
  onDelete,
  onShowModal,
    routerTo,
}) => (
  // <li>
  //   <div className={styles.item}>
  //     <span className={styles.content}>{content}</span>
  //     <span className={styles.content}>用户：{uid}</span>
  //     <span className={styles.content}>id：{id}</span>
  //     <span className={styles.content}>分类：{field}</span>
  //   </div>
  //   <div>
  //     <EditOutlined
  //         className={styles.icon}
  //         onClick={() => onShowModal(ModalType.Edit, id, content)}
  //     />
  //     {finished ? (
  //         <UndoOutlined
  //             className={styles.icon}
  //             onClick={() => onUpdateStatus(id)}
  //         />
  //     ) : (
  //         <CheckOutlined
  //             className={styles.icon}
  //             onClick={() => onUpdateStatus(id)}
  //         />
  //     )}
  //     {/*{finished ?(        <DeleteOutlined className={styles.icon} onClick={() => onDelete(id)} />):(<p></p>)}*/}
  //
  //
  //
  //
  //     <DeleteOutlined className={styles.icon} onClick={() => onDelete(id)} />
  //       <MonitorOutlined className={styles.icon} />
  //
  //   </div>
  //
  // </li>

        <Card.Grid className={styles.gridStyle}  hoverable={true}  >

            <div className={styles.cardContainer}  >
                <Card className={styles.cardStyle}
bordered={false} bodyStyle={{height:100,padding:10 } }
                  hoverable={true}
                    cover ={(url==='0')?
                        (<img  alt="example"
                               src={"https://goodyjb.oss-cn-beijing.aliyuncs.com/null.png" +
                               "?x-oss-process=image/interlace,1/resize,m_fill,w_300,h_400/quality,q_40/rounded-corners,r_25/format,png/crop,g_north,w_300,h_350/format,png"}/>)
                        :(<img  alt="example"
                                src={"http://goodyjb.oss-cn-beijing.aliyuncs.com/"+url
                                +"?x-oss-process=image/interlace,1/resize,m_fill,w_300,h_400/quality,q_40/rounded-corners,r_25/format,png/crop,g_north,w_300,h_350/format,png"}/>) }
            // actions={[
            //     <SettingOutlined key="setting" />,
            //     <EditOutlined key="edit" />,
            //     <EllipsisOutlined key="ellipsis" />,
            // ]}
            //           title={content}
                >
                    <div style={{margin:0,padding:0}}> <p  style={{fontSize:25,color:"red",margin:0 ,fontWeight:'bolder'}}> ¥{price}</p>
                        <br/>
                        <p  style={{fontSize:20,color:"black",margin:0,fontWeight:'bold'}}> {content} </p>
                        </div>



            <br/>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
   <span>{moment(startime).fromNow()} </span>
                {/*<EditOutlined key="edit" />*/}
                 · 发布于 ·
                    {( ()=>{
                            switch(position){
                                case "117.09186,39.095514": return '致知斋';
                                case "117.092487,39.095535": return '重能斋';
                                case "117.093297,39.09551": return '求实斋';
                                case "117.096065,39.093662": return '春华斋';
                                default:return '数据为空';
                            }
                        }
                    )()}
                {/*<EllipsisOutlined key="ellipsis" />*/}
                </Card>
            </div>
        </Card.Grid>
);

export default TodoItem;
