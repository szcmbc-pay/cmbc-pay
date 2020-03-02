<template>
  <div>
    <header class="header">
      <div class="header-icon" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="header-title">
        <span>通知单缴费</span>
      </div>
    </header>
    <div class="content">
      <div class="wrapper">
        <div class="item-row">
          <label class="item-name">商户名称</label>
          <span class="item-value">{{businessName}}</span>
        </div>
        <div class="item-row">
          <label class="item-name">单价</label>
          <span class="item-value">{{tradeNo}}</span>
        </div>
        <div class="item-row">
          <label class="item-name">数量</label>
          <span class="item-value">
            <span>{{payAccount}}</span>
          </span>
        </div>
        <div class="item-row pay-money-row">
          <label class="item-name">实付金额</label>
          <span class="item-value">{{needPayMoney}}</span>
        </div>
        <div class="item-row phone-no-row">
          <label class="item-name">下单手机号</label>
          <span class="item-value">{{orderPhoneNo}}</span>
        </div>

        <div class="button-row">
          <el-row>
            <el-button type="primary" @click="confirmPay">确认支付</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConfirmPay",
  props: {
    msg: String
  },
  data: function() {
    return {
      businessName: "",
      tradeNo: "",
      payAccount: "",
      needPayMoney: "",
      orderPhoneNo: ""
    };
  },
  created() {
    // 初始化页面，通过路由传入的参数，填充详情页面
    let noticeDetail = this.$route.params.noticeDetail;
    this.businessName = noticeDetail.businessName;
    this.tradeNo = noticeDetail.tradeNo;
    this.payAccount = noticeDetail.payAccount;
    this.needPayMoney = noticeDetail.needPayMoney;
    this.orderPhoneNo = noticeDetail.orderPhoneNo;
  },
  methods: {
    goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
    /**
     * 通用支付
     * 第一步：柜面支付：记录核心日志，并加密返回前台
     * 第二步：调用招行一网通支付：网页直接展示结果，无响应报文
     * 第三步：调用支付结果校验
     * @param 通知单号+通知单详情
     * @returns 错误信息errorMsg,成功信息successMsg
     */
    async confirmPay(){
        let notcieNo = this.$route.params.notcieNo;
        // ⚠️ 参数统一采用驼峰命名方式
        let res = await this.$Http.commonPay({
            payParam : {
                businessName: "手机银行饭票",
                tradeNo: "00001",
                payAccount: "1",
                needPayMoney: "¥95.00",
                orderPhoneNo: "12345678900"
            },
            ntcId:notcieNo
        });
        if(res){
            // 返回successMsg有值,表示柜面支付接口畅通
            if(res.successMsg){
                let cmbcReqData = JSON.stringify(res);
                // 调用招行一网通支付
                await this.$Http.cmbcBasePay({charset:"UTF-8",jsonRequestData:cmbcReqData},true,{
                    baseURl:'http://121.15.180.66:801',
                });
                // 调用支付结果校验接口
                await this.$Http.checkPayResult(res);
                this.$alert("支付成功！", '温馨提示', {
                    confirmButtonText: '确定'
                });
            }else{
                this.$alert(res.errorMsg, '温馨提示', {
                    confirmButtonText: '确定'
                });
            }
        }

    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-row {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0 1rem;
  background-color: #fff;
  border-top: 1px solid #eeeeee;
}
.pay-money-row,
.phone-no-row {
  margin-top: 1rem;
  border-bottom: 1px solid #eeeeee;
}

</style>


