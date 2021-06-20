import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from "react";

// const policyText = {
//     expiration: "2021-12-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
//     conditions: [
//         ["content-length-range", 0, 1048576000], // 设置上传文件的大小限制
//     ],
// };
// const policyBase64 = Base64.encode(JSON.stringify(policyText));

// const crypto = require('crypto');
// // const end = new Date().getTime() + 300000
// // const expiration = new Date(end).toISOString()
// const policyString = {
//     expiration: "2022-01-01T12:00:00.000Z",
//     conditions: [
//         ['content-length-range', 0, 10485760000000],
//     ]
// }
// const secret ='GL0B7vkOmhcmInPvY2PIJW88RdBnK2'
// const policy = new Buffer(JSON.stringify(policyString)).toString('base64')
// const signature = crypto.createHmac('sha1',secret).update(policy).digest('base64')
export default class AliyunOSSUpload extends React.Component {
    state = {   OSSData:{}  };

    async componentDidMount() {
        await this.init();
    }

    init = async () => {
        try {
            const OSSData = await this.mockGetOSSData();
            this.setState({
                OSSData,
            });
        } catch (error) {
            message.error(error);
        }
    };

    mockGetOSSData = () => ({
        dir: '',
        host: 'http://goodyjb.oss-cn-beijing.aliyuncs.com',
        accessId: 'LTAI5t9586sxxsmMGEfRAGgt',
        policy: 'eyJleHBpcmF0aW9uIjoiMjAyMi0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCIiXV19',
        signature: '/DgLKLpBxNwvjC8OnQ+RD8lzm2w=',
    });

    onChange = ({ file }) => {
      if(file.status==='done')message.success('上传成功')
        this.props.setCoverkey(file.url)
    };

    // onRemove = file => {
    //     const { value, onChange } = this.props;
    //     // const files = value.filter((v) =>(v.url !== file.url));
    //     //.filter((v) =>((field=="all") ?(v.field !== ""):(v.field === field) ))
    //     if (onChange) {
    //         onChange(value.filter((v) =>(v.url !== file.url)));
    //     }
    // };

    getExtraData = file => {
        const { OSSData } = this.state;
        return {
            key: file.url,
            OSSAccessKeyId: OSSData.accessId,
            policy: OSSData.policy,
            Signature: OSSData.signature,
        };
    };
    beforeUpload = async file => {
        const { OSSData } = this.state;
        const expire = OSSData.expire * 1000;

        if (expire < Date.now()) {
            await this.init();
        }
        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const filename = Date.now() + suffix;
        file.url =OSSData.dir + filename;
        // console.log(file.url)
        return file;
    };

    render() {
        const { value } = this.props;
        const props = {
            name: 'file',
            fileList: value,
            action: this.state.OSSData.host,
            onChange: this.onChange,
            // onRemove: this.onRemove,
            data: this.getExtraData,
            beforeUpload: this.beforeUpload,
            listType:'picture',
        };
        return (
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
        );
    }
}

