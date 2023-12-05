import api from "@/utils/api";

export default {
  data() {
    return {
    }
  },
  methods: {
    handleQuery() {
      const { pageNum, pageSize } = this.pagination;
      api.ccc().then((res)=>{
        this.pagination.total = res.pageParam ? res.pageParam.total : 0
       this.dataList = res.data
      })
    },
     // 查询列表
    queryHandle() {
      const data = this.formData;
      // 时间处理
      if (data.timeRange && data.timeRange.length !== 0) {
        data.startTime = data.timeRange[0]
        data.endTime = data.timeRange[1]
      } else {
        data.startTime = null
        data.endTime = null
      }
      this.pagination.pageNum = 1
      this.handleQuery()
    },
    // 重置列表
    resetHandle() {
      const data = this.formData;
      Object.keys(data).forEach(key => {
        data[key] = null
      })
      this.pagination.pageNum = 1
      this.handleQuery()
    },
     // 改变页码
    handlePageChange(page) {
      this.pagination.pageNum = page
      this.handleQuery()
    },

    // 改变页数
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.pagination.pageNum = 1
      this.handleQuery()
    }
  }
}