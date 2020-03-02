<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import md5 from 'js-md5';
import commonUtil from './js/commonUtil';
import cmblapi from 'cmblapi';

export default {
  name: 'app',
  created(){
    // let loginInfo = this.cacheLoginInfo();
    // // 如果柜面登录信息已过期，需重新登录招商银行
    // if(loginInfo === "Login cache is null"){
    //   this.cmbcMerchantLogin();
    // }else{
    //   this.$router.push('/search');
    // }
    this.cmbcMerchantLogin();
     this.$router.push('/search');
  },
  methods:{
    /**
     * 检查柜面是否缓存登录信息
     * 请求参数 reqData 通过手机银行登录返回的加密并签名后的用户信息
     */
    async cacheLoginInfo(reqData){
      let res = await this.$Http.cacheLoginInfo(reqData);
      return res;
    },
    // 登录招商银行，登录成功后柜面缓存登录信息，获取公钥
    cmbcMerchantLogin(){
      let corpNo = "002568";
      let time = commonUtil.formateDateAndTimeToString();
      let nonceStr = commonUtil.randomString(8);
      // 商户申请的秘钥
      var secretkey = "cmbtest1";
      let sign = md5(corpNo + time + nonceStr + secretkey);
      /**
       * 招商银行官方用户登录和认证接口（进行客户核身，并获取部分客户信息，根据商户号不同，返回不同的权限内容）
       * @param corpNo string 商户号
       * @param authInfo string 鉴权参数（timestamp：服务器当前时间，nonceStr：随机字符串，sign：签名） 
       * @param reAuth string 是否需要重新授权
       * @returns body string 客户信息报文，第三方应用先用base64解码并进行DES解密后方能看到明文数据
       * @returns cryptType string body加密类型：1表示明文，2表示DES加密，3表示非对称加密
       * @returns resultType string 登录授权结果：Y表示成功，N表示失败 
       */
      cmblapi.merchantLogin({
          corpNo: corpNo,
          reAuth: false,
          authInfo: {
            timestamp:time,
            nonceStr: nonceStr,
            sign: sign
          },
          success:function(res){
            console.log("招行登录成功回调");
            // 手机银行登录成功后，返回加密并签名的用户信息
            if(res.resultType === "Y"){
              this.$router.push('/search');
              this.cacheLoginInfo(res);
            }else{
              this.$alert("登录授权失败，请稍后重试！", '温馨提示', {
                confirmButtonText: '确定'
              });
            }
          },
          fail:function(errCode,errMsg){
            console.log("招行登录成功回调");
            this.$alert(errCode+":"+errMsg, '温馨提示', {
              confirmButtonText: '确定'
            });
          }
      });
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #f8f8f8;
    margin:0;
  }
  html,body{
    height: 100%;
    margin:0;
    padding:0;
  }
  .header{
    height: 40px;
    line-height: 40px;
    display: -webkit-flex; /* Safari */
    display: flex;
  }
  .header .header-icon{
    width: 30px;
  }
  .header .header-title{
    flex:1;
  }
  .content{
    width:100%;
    height: calc(100% - 40px);
  }
  .input-wrapper{
    width:100%;
    background-color: #eaeaea;
  }
  .item-name{
    flex:1;
    text-align: left;
  }
  .item-value{
    flex:2;
    text-align: right;
  }
  .button-row{
    padding: 1rem;
    background: #f8f8f8;
  }
  .el-row,.el-button{
    width: 100%;
  }

  .el-message-box{
    width: 340px;
  }
</style>
