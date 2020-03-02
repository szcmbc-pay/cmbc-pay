function formatDateToString(date){
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  if(month<10) month = "0"+month;
  if(day<10) day = "0"+day;
  return year+''+month+''+day;
}
function formateDateAndTimeToString(){
  var date = new Date();
  var hours = date.getHours();
  var mins = date.getMinutes();
  var secs = date.getSeconds();
  var msecs = date.getMilliseconds();
  if(hours<10) hours = "0"+hours;
  if(mins<10) mins = "0"+mins;
  if(secs<10) secs = "0"+secs;
  if(msecs<10) secs = "0"+msecs;
  return formatDateToString(date)+''+hours+''+mins+''+secs+''+msecs;
}
//生成随机字符串
function randomString(len) {
  len = len || 32;
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxLen = $chars.length;
  var str = '';
  for (var i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxLen));
  }
  return str;
}

export default {
  formateDateAndTimeToString,
  randomString
}
