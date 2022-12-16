import request from "@/utils/request";

const api_name = "/admin/hosp/hospitalSet";

export default {
  //分页查询
  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/findPageHospSet/${page}/${limit}`,
      method: "post",
      data: searchObj //json
    });
  },

  //删除
  removeHospSet(id) {
    return request({
      url: `${api_name}/${id}`,
      method: "delete"
    });
  },
  //批量删除
  batchRemoveHospitalSet(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: "delete",
      data: idList
    });
  },
  //锁定，修改状态
  lockHospitalSet(id, status) {
    return request({
      url: `${api_name}/lockHospitalSet/${id}/${status}`,
      method: "put"
    });
  },
  //添加设置
  saveHospSet(hospitalSet) {
    return request({
      url: `${api_name}/saveHospitalSet`,
      method: "post",
      data: hospitalSet
    });
  },
  //通过id查询
  getHospital(id) {
    return request({
      url: `${api_name}/getHospital/${id}`,
      method: "get"
    });
  },
  //更新
  updateHospSet(hospSet) {
    return request({
      url: `${api_name}/updateHospitalSet`,
      method: "post",
      data: hospSet
    });
  }
};
