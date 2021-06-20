import { Form, Input, Modal,Select } from 'antd';
import React, { FC, useEffect } from 'react';
import { ModalType } from '../../common/enum';
import AliyunOSSUpload from "../Uploadimg";

interface IModalFormProps {
  field: string;
  userId:string;
  modalType: string;
  visible: boolean;
  title: string;
  content: string;
  position:string;
  info1:string;
  desc:string;
  price:number;
  todoId:string,
  onClose: () => void;
  onAdd: (userId:string ,content: string,field :string,url:string,position:string,price:number,info1:string,desc:string) => void;
  onUpdateContent: (todoId: string, content: string,price:number) => void;
}
const { Option , OptGroup } = Select;

const ModalForm: FC<IModalFormProps> = ({
  content,
  onClose,
  onAdd,
price,
    todoId,
  onUpdateContent,
  visible,
  title,
  modalType,
  field,userId,position,info1,desc,
}) => {
  const [form] = Form.useForm();

  function handleChange(value:string) {console.log(`selected ${value}`);}

  useEffect(() => {
    form.setFieldsValue({ content });
    form.setFieldsValue({ field });
    form.setFieldsValue({price}  );
    form.setFieldsValue({desc}  );

  },[content]&&[field]&&[price]&&[desc] );

  const onSubmit = () => {
    if (modalType === ModalType.Add) {
      onAdd(userId,form.getFieldValue('content'),form.getFieldValue('sfield'),form.getFieldValue('url'),position,form.getFieldValue('price'),info1,form.getFieldValue('desc'));
       form.resetFields();



    }
    if (modalType === ModalType.Edit) {

      onUpdateContent(todoId, form.getFieldValue('content'),form.getFieldValue('price'));
      // form.resetFields();

    }
    // onClose();
  };
  //文件上传成功后设置url数据
  const setCoverkey = filekey=> form.setFieldsValue({url:filekey})
  const validateMessages = {required: "'${name}' 是必选字段"};

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onSubmit}
      onCancel={onClose}
      okText="提交"
      cancelText="取消"
      destroyOnClose={true}
      forceRender={true}
    >
      <Form layout="horizontal" form={form}   validateMessages={validateMessages}>
        <Form.Item label="内容" name="content"  rules={[{ required: true, message: '请输入内容' }]}>
          <Input placeholder="请输入内容"  />
        </Form.Item>
        <Form.Item label="描述" name="desc"  rules={[{ required: true, message: '添加描述' }]}>
          <Input placeholder="请输入描述"  />
        </Form.Item>
        <Form.Item label="分类" name="sfield" rules={[{ required: true, message: '请选择分类' }]}>
          <Select  style={{ width: 160 }} onChange={handleChange} placeholder="选择一个类别">
            <OptGroup label="图书资料">
              <Option value="高数">高数</Option>
              <Option value="英语">英语</Option>
              <Option value="其他图书">其他图书</Option>
            </OptGroup>
            <OptGroup label="电子产品">
              <Option value="手机">手机</Option>
              <Option value="电脑">电脑</Option>
              <Option value="其他数码">其他数码</Option>
            </OptGroup>
            <OptGroup label="其他">
              <Option value="生活用品">生活用品</Option>
              <Option value="杂物">杂物</Option>
              <Option value="虚拟商品">虚拟商品</Option>
            </OptGroup>
          </Select>
        </Form.Item>

        <Form.Item label="主图" name="cover" rules={[{ required: true, message: '请添加图片' }]}>
          <AliyunOSSUpload  setCoverkey={setCoverkey} > </AliyunOSSUpload>
        </Form.Item>
        <Form.Item label="价格" name="price"  rules={[{ required: true, message: '请输入价格' }]}>
          <Input placeholder="请输入价格"  />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
