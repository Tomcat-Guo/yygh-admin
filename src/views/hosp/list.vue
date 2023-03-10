<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="searchObj.provinceCode"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="searchObj.cityCode"
          placeholder="请选择市"
          @change="cityChanged"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="searchObj.districtCode"
          placeholder="请选择区"
          @change="districtChanged"
        >
          <el-option
            v-for="item in districtList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getPageList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="医院logo">
        <template slot-scope="scope">
          <img
            :src="'data:image/jpeg;base64,' + scope.row.logoData"
            width="80"
          />
        </template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="param.hostypeName" label="等级" width="90" />
      <el-table-column prop="param.fullAddress" label="详情地址" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 0 ? "未上线" : "已上线" }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            type="primary"
            size="mini"
            @click="updateStatus(scope.row.id, 0)"
            >下线</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            type="danger"
            size="mini"
            @click="updateStatus(scope.row.id, 1)"
            >上线</el-button
          >
          <router-link :to="'/hospital/show/' + scope.row.id">
            <el-button type="primary" size="mini">查看</el-button>
          </router-link>

          <router-link :to="'/hospital/schedule/' + scope.row.hoscode">
            <el-button type="primary" size="mini">排班</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="getPageList"
      @size-change="changeSize"
    />
  </div>
</template>

<script>
import hospitalApi from "@/api/hosp/hosp.js";

export default {
  data() {
    return {
      listLoading: true,
      list: [],
      total: 0,
      page: 1,
      limit: 5,
      searchObj: {},
      provinceList: [],
      cityList: [],
      districtList: []
    };
  },

  created() {
    this.getPageList();

    hospitalApi.findByDictCode("Province").then(response => {
      this.provinceList = response.data;
    });
  },

  methods: {
    provinceChanged() {
      this.cityList = [];
      this.searchObj.cityCode = null;
      this.districtList = [];
      this.searchObj.districtCode = null;
      hospitalApi.findChildData(this.searchObj.provinceCode).then(response => {
        this.cityList = response.data;
      });
    },
    cityChanged() {
      this.districtList = [];
      this.searchObj.districtCode = null;
      hospitalApi.findChildData(this.searchObj.cityCode).then(response => {
        this.districtList = response.data;
      });
    },
    districtChanged() {},
    getPageList(page = 1) {
      this.page = page;
      hospitalApi
        .getPageList(this.page, this.limit, this.searchObj)
        .then(response => {
          this.list = response.data.content;
          this.total = response.data.totalElements;
          this.listLoading = false;
        });
    },

    resetData() {
      this.searchObj = {};
      this.getPageList(1);
    },
    changeSize(size) {
      this.limit = size;
      this.getPageList();
    },
    updateStatus(id, status) {
      hospitalApi.updateStatus(id, status).then(response => {
        this.getPageList();
      });
    }
  }
};
</script>
