<template>
  <div class="usercustombigBox">
    <el-tabs v-model="bigTabValue" @tab-click="bigClick">
      <el-tab-pane label="员工检索" name="userValue">
        <usermessage :parentData="countList"></usermessage>
      </el-tab-pane>
      <el-tab-pane label="客户检索" name="customValue">
        <custommessage :parentData="countList"></custommessage>
      </el-tab-pane>

      <el-tab-pane label="群聊检索" name="qunValue">
        <qunmessage :parentData="countList"></qunmessage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import api from "../../../utils/api.js";
import usermessage from "./usermessage.vue";
import custommessage from "./custommessage.vue";
import qunmessage from "./qunmessage.vue";

export default {
  data() {
    return {
      bigTabValue: "userValue",
      countList: {}
    };
  },
  components: {
    usermessage,
    custommessage,
    qunmessage,
  },

  watch: {},
  mounted: function () {
    this.init();
  },
  methods: {
    init() {
      api.getQwTj().then((data) => {
        this.countList = data.qwTj
      });
    },
    bigClick() { },
  },
};
</script>
<style scoped>
.template {
  display: flex;
  padding: 0.2rem 0.3rem;
  overflow: hidden;
  background: #f5f5f5;
}

.usercustombigBox {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

::v-deep .el-tabs__header {
  margin-bottom: 0;
  background: #fff;
}

::v-deep .el-tabs__nav {
  height: 0.6rem;
  line-height: 0.6rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.qunUser {
  margin-left: 0.2rem;
  font-size: 0.2rem;
  cursor: pointer;
}
</style>
