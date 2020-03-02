const COMMON_API = {
    // 招行银行：一网通支付接口
    cmbcBasePay:{
        method:'post',
        url:"/netpayment/BaseHttp.dll?MB_APPPay"
    },
    // 柜面：缓存用户登录信息
    cacheLoginInfo:{
        method:'post',
        url:'/serverURL/HttpServer/handleLoginfo'
    },
    // 柜面：根据通知单号查询通知单详情
    searchBill:{
        method:'post',
        url:'/serverURL/HttpServer/queryOne'
    },
    // 柜面：支付接口，银行记录核心，支付数据加密
    commonPay:{
        method:'post',
        url:'/serverURL/HttpServer/handlePay'
    },
    // 柜面：支付结果校验
    checkPayResult:{
        method:'post',
        url:'/serverURL/HttpServer/autoCheckPayResult'
    },
}
export default COMMON_API;