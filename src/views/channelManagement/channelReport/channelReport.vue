<template>
  <div class="template">
    <div class="team">
      <div>团队</div>
      <div class="teamList">
        <el-tree
          :data="data"
          ref="tree"
          highlight-current
          :filter-node-method="filterNode"
          node-key="id"
          :props="defaultProps"
          :default-expand-all="false"
          :expand-on-click-node="false"
          @node-drag-start="handleDragStart"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          @node-click="handleNodeClick"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
        </el-tree>
      </div>
    </div>
    <div class="staff">
      <div>员工</div>
      <div class="staffList">
        <div
          :class="isselect == item.userid ? 'selectname staffName' : 'staffName'"
          v-for="item of nameList"
          :key="item.userid"
          :label="item.username"
          :value="item.userid"
          @click="selectName(item.userid, item.username)"
        >
          {{ item.username }}
        </div>
      </div>
    </div>
    <div class="custom">
      <div style="display: flex">
        <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%">
          <div class="search">
            <el-autocomplete
              class="el-input-inners"
              v-model="kehu_input"
              :fetch-suggestions="querySearchId"
              placeholder="请输入客户名称"
              :trigger-on-focus="false"
              @select="handleSelectId"
            ></el-autocomplete>
          </div>

          <el-tab-pane label="客户" name="first">客户</el-tab-pane>

          <el-tab-pane label="员工" name="second">
            <div
              :class="isAllselect == item.userid ? 'selectname staffName' : 'staffName'"
              v-for="item of nameAllList"
              :key="item.userid"
              :label="item.username"
              :value="item.userid"
              @click="selectAllName(item.userid, item.username)"
            >
              {{ item.username }}
            </div>
          </el-tab-pane>

          <el-tab-pane label="群聊" name="third"> </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="ChatRecords">聊天记录</div>
  </div>
</template>
<script>
import { api } from "../../../utils/api.js";
import { getData, my_url } from "../../../static/js/ajax.js";
import { formatDate } from "../../../static/js/common.js";
export default {
  data() {
    return {
      data: [],
      nameList: [],
      isselect: "",
      isAllselect: "",
      activeName: "first",
      nameAllList: [],
      kehu_input: "",
      SalesmanIdBox: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted: function () {
    this.yewu();
  },

  methods: {
    yewu() {
      let _this = this;
      getData("post", my_url + "/crm/auth/getTeamList.do", function (data) {
        console.log(data.teamList);
        _this.data = data.teamList;
      });
      getData("post", my_url + "/crm/auth/getUserIdNameList.do", function (data) {
        _this.nameAllList = data.namelist;
        data.namelist.forEach((res) => {
          _this.SalesmanIdBox.push({
            value: res.username,
            id: res.userid,
          });
        });
      });
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.organizationName.indexOf(value) !== -1;
    },
    handleNodeClick(data, e) {
      let _this = this;
      var teamListId = [];
      if (e.childNodes.length > 0) {
        for (var i = 0; i < e.childNodes.length; i++) {
          teamListId.push(e.childNodes[i].key);
        }
        teamListId = teamListId.join(",");
      } else {
        teamListId = data.id;
      }
      console.log(teamListId);
      var params = {
        teamid: teamListId,
      };

      getData(
        "post",
        my_url + "/crm/auth/getUserIdNameListByTeam.do",
        function (data) {
          console.log(data.namelist);
          _this.nameList = data.namelist;
        },
        params
      );
    },

    selectName(data, name) {
      console.log(data, name);
      this.isselect = data;
    },
    selectAllName(data, name) {
      console.log(data, name);
      this.isAllselect = data;
    },

    handleClick(tab, event) {
      let _this = this;
      if (tab._props.label == "员工") {
      }
    },

    querySearchId(queryString, cb) {
      var SalesmanIdBox = this.SalesmanIdBox;
      var results = queryString ? SalesmanIdBox.filter(this.createFilterId(queryString)) : SalesmanIdBox;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilterId(queryString) {
      return (SalesmanIdBox) => {
        return SalesmanIdBox.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },

    handleSelectId(item) {
      console.log(item);
      // this.resourceDeployform.userid = item.id;
    },

    allowDrop() {},
    allowDrag() {},
    handleDragStart() {},
    handleDragEnd() {},
    handleDrop() {},
  },
};
</script>
<style scoped>
.template {
  display: flex;
  padding: 0.3rem;
}
.team {
  width: 15%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
  overflow-y: scroll;
}

.staff {
  width: 15%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
  overflow-y: scroll;
}
.custom {
  width: 15%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
  overflow-y: scroll;
}
.ChatRecords {
  width: 50%;
  height: calc(100vh - 1.2rem);
  border: 1px solid #909399;
  overflow-y: scroll;
}
.teamList {
  padding: 0.2rem 0;
}
::v-deep .el-tree-node__label {
  font-size: 15px;
}

::v-deep .el-tree-node__content {
  margin-left: 0;
  height: 35px;
  border-bottom: 1px solid #909399;
}
::v-deep .el-tree-node__expand-icon {
  font-size: 20px;
}

::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  color: #dc220d;
  background: rgba(244, 244, 244, 1) !important;
  border-left: 0.03rem solid #dc220d;
}

::v-deep .el-tree {
  padding: 0;
  border-top: 1px solid #909399;
}
::v-deep .el-tabs__header {
  margin: 0;
}
/* 定义滚动条的颜色 */
::-webkit-scrollbar {
  width: 3px;
  /* 滚动条宽度 */
}

/* 定义滚动条背景颜色 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

/* 定义滚动条滑块颜色 */
::-webkit-scrollbar-thumb {
  /* background-color: #666; */
}

.staffList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem 0;
}
.staffName {
  height: 35px;
  line-height: 35px;
  padding: 0.04rem;
  cursor: pointer;
  border-bottom: 1px solid #909399;
  text-align: center;
}
.staffName:first-child {
  border-top: 1px solid #909399;
}
.selectname {
  color: #dc220d;
  background: rgba(244, 244, 244, 1) !important;
  border-left: 0.03rem solid #dc220d;
}
</style>
