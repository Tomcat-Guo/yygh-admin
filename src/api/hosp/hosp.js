import request from "@/utils/request";

const hosp_api = "/admin/hosp/hospital";

const cmn_api = "/admin/cmn/dict";

const dept_api = "/admin/hosp/department";

export default {
  //分页查询
  getPageList(page, limit, searchObj) {
    return request({
      url: `${hosp_api}/list/${page}/${limit}`,
      method: "post",
      data: searchObj //json
    });
  },
  //根据dictcode查询子数据
  findByDictCode(dictcode) {
    return request({
      url: `${cmn_api}/findByDictCode/${dictcode}`,
      methos: "get"
    });
  },
  //根据parent_id查询子数据
  findChildData(id) {
    return request({
      url: `${cmn_api}/findChildData/${id}`,
      methos: "get"
    });
  },
  //更新上线，下线状态
  updateStatus(id, status) {
    return request({
      url: `${hosp_api}/updateStatus/${id}/${status}`,
      methos: "get"
    });
  },
  //查询医院
  getHospitalById(id) {
    return request({
      url: `${hosp_api}/getHospital/${id}`,
      methos: "get"
    });
  },
  //查询科室
  getDeptList(hoscode) {
    return request({
      url: `${dept_api}/getDeptList/${hoscode}`,
      methos: "get"
    });
  }
};
