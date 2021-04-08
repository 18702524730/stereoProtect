/*
 * 业务类-过滤器
*/
const filters = {
  // 企业申请状态
  applyStatus (input) {
    switch (input){
      case 1:
        return "新认定2019"; break;
      case 2:
        return "复评2019"; break;
      case 3:
        return "新认定2020"; break;
      case 4:
        return "复评2020"; break;
      case 5:
        return "新认定2021"; break;
      case 6:
        return "复评2021"; break;
      case 7:
        return "暂无意向"; break;
      default:  return '--'; break; 
    }
  },
  // 企业规模
  companySize (input) {
    switch (input){
      case 1:
        return "50人以下"; break;
      case 2:
        return "50～100人"; break;
    	case 3:
        return "100人以上"; break;
    }
  },
  // 街道
  street (input) {
    switch (input){
      case 1:
        return "闸弄口街道"; break;
      case 2:
        return "凯旋街道"; break;
    	case 3:
        return "采荷街道"; break;
      case 4:
        return "四季青街道"; break;
      case 5:
        return "笕桥街道"; break;
      case 6:
        return "彭埠街道"; break;
      case 7:
        return "钱塘智慧城"; break;
      case 8:
        return "丁兰街道"; break;
      default: return "--"; break;
    }
  },
  // 评估结果
  result (input) {
    switch (input){
      case 1:
        return "重点培育"; break;
      case 2:
        return "培育"; break;
    }
  },
  // 机构或平台级别
  researchOrgLevel (input) {
    switch (input){
      case 1:
        return "区级"; break;
      case 2:
        return "市级"; break;
      case 3:
        return "省级"; break;
      case 4:
        return "国家级"; break;
      case 5:
        return "未设有"; break;
    }
  },
  // 知识产权贯标状态
  intellectualPropertyIso (input) {
    switch (input){
      case 1:
        return "未实施"; break;
      case 2:
        return "实施中"; break;
      case 3:
        return "取得证书"; break;
      case 4:
        return "是"; break;
      case 5:
        return "否"; break;
    }
  },
  // 知识产权贯标状态
  isAccidentFil (input) {
    switch (input){
      case 0:
        return "有"; break;
      case 1:
        return "无"; break;
    }
  }
  

}
export default {
  filters
}
