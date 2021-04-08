const filters = {
  // 字数超出隐藏
  ellipsisContent (input, length) {
    return input.slice(0, length) + '...'
  },
  // 将字符串除了前几位和后几位之外的转为星号
  strToStar (str, start, end) {
    let arr = str.split('');
    let start_ = start-1 || 0;
    let end_ = end || 0;
    arr.forEach( (item, index) => {
      if (index>start_ && index<(arr.length-end_)) {
        arr[index] = '*';
      }
    })
    return arr.join('');
  },
  //日期格式转换
  dateFormat: function (input, type) {
    if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
    }
    var _date = new Date(input);
    var year = _date.getFullYear();
    var month = _date.getMonth() + 1 > 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
    var day = _date.getDate() > 9 ? _date.getDate() : "0" + _date.getDate();
    var hour = _date.getHours() > 9 ? _date.getHours() : "0" + _date.getHours();
    var minutes = _date.getMinutes() > 9 ? _date.getMinutes() : "0" + _date.getMinutes();
    var seconds = _date.getSeconds() > 9 ? _date.getSeconds() : "0" + _date.getSeconds();
    if(type == "date"){
        return year + "-" + month + "-" + day;
    } else if(type == "time") {
        return hour + ":" + minutes + ":" + seconds;
    }
    else if (type == 'yyyyMM/dd') {
      return year + "/" + month + "/" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
    else if (type == 'yyyy.MM.dd') {
      return year + "." + month + "." + day + " " + hour + ":" + minutes + ":" + seconds;
    }
    else {
      return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
    return "--";
  },
  pubDateFn: function (input, dayLength, type) {
    if(input == null || input=='' || typeof(input) == "undefined"){
        return "--";
    }
    let date_ = new Date(new Date() - input);
    let day_ = date_.getDate();
    let hour = date_.getHours();
    if (day_ <= dayLength) {
      return day_ + '天前';
    }
    else{
      return this.dateFormat(input, type)
    }
  },
  // 手机号中间4位为星号
  hidePhoneByStar (phone) {
    return phone.replace(/(\d){3}(\d){4}(\d){3}/, '$1-$3')
  },
  //价格保留两位小数
  priceformat: function (input) {
    var ret = '';
    // input 有可能是数字0
    if (input !== null && input !== undefined) {
      ret = input - 0 +'';
      if(ret === 0){
        ret = 0;
      }else{
        ret = (ret-0).toFixed(2);
      }
    }
    return ret;
  },
}
export default {
  filters
}
