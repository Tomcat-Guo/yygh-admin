import request from "@/utils/request";

const sche_api = "/admin/hosp/schedule";

export default {
  //分页查询
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `${sche_api}/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: "get"
    });
  },
  //查询排班
  getScheduleDetail(hoscode, depcode, workDate) {
    return request({
      url: `${sche_api}/getSchedule/${hoscode}/${depcode}/${workDate}`,
      method: "get"
    });
  }
};
