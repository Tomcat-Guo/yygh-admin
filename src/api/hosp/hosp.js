import request from "@/utils/request";

const hosp_api = "/admin/hosp/hospital";

const cmn_api = "/admin/cmn/dict";

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
  }
};
