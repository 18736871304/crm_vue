<template>
  <div>
    <!-- <el-table :data="dataList" border style="width: 100%" v-bind="$attrs" v-on="$listeners" class="common-table">
      <el-table-column label="序号" :type="otherType.type" width="45" align="center" v-if="otherType.type"></el-table-column>
      <el-table-column
        v-for="(item, index) in columns"
        align="center"
        v-bind="item"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        :sortable="item.sortable"
        :show-overflow-tooltip="item.tooltip || false"
      >
        <template v-if="item.render" slot-scope="scope">
          <render-dom :render="() => item.render(scope.row)"></render-dom>
        </template>
      </el-table-column>
    </el-table> -->
    <el-pagination
      v-if="pagination"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.pageNum"
      :page-size="pagination.pageSize"
      v-bind="$attrs"
      layout="total, prev, pager, next"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "eleTable",
  components: {
    // 函数式组件注册
    renderDom: {
      functional: true,
      props: {
        render: Function,
      },
      render(createElement, renDom) {
        return <div>{renDom.props.render()}</div>;
      },
    },
  },
  props: {
    // 表头配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 列表数据
    dataList: {
      type: Array,
      default: () => [],
    },
    // 其他配置
    otherType: {
      type: Object,
      default: {}
    },
    // 是否显示分页
    pagination: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleSizeChange(e){
      this.$emit('size-change', e)
    },
    handleCurrentChange(e) {
      this.$emit('page-change', e)
    }
  },
};
</script>
<style>

.el-pagination {
  font-weight: normal;
  text-align: right;
  margin-top: 20px;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #DC220D;
}

.common-table {
  margin: 0.3rem;
}
</style>
