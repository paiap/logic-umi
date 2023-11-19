const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

const cardList = [
  {
    id:1,
    name:'手机主站'
  },
  {
    id:2,
    name:'认证中心'
  },
  {
    id:3,
    name:'手机资讯'
  },
  {
    id:4,
    name:'智能客服'
  },
  {
    id:5,
    name:'问财助手'
  },
  
]

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
