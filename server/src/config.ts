const Config = {
  /**
   *  监听端口
   */
  PORT: 5000,
  /**
   * MongoDB 数据库地址
   */
  MONGODB_URI: "mongodb://localhost:27017/todo",
  oss: {
    OSSAccessKeyId: 'LTAI5t9586sxxsmMGEfRAGgt',
    secret: 'GL0B7vkOmhcmInPvY2PIJW88RdBnK2',
    host: 'http://goodyjb.oss-cn-beijing.aliyuncs.com' // 填你自己阿里云OSS的外网域名
  }
};

export default Config;
