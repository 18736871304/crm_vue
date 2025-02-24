<template>
  <div class="search-header">
    <div class="search-box" v-for="(item) in searchList" :key="item.type">
      <div class="common-select" v-if="item.type == 'date'">
        <div class="select-title" :style="{'width': item.width}">{{item.label}}</div>
        <div class="select-content" style=" height: 0.3rem; border: none;">
          <el-date-picker v-model="formData.data" type="date" align="right" size="mini" format="yyyy-MM-dd  星期dddd"
            value-format="yyyy-MM-dd" placeholder="选择日期" class="el-date-picker-inner">
          </el-date-picker>
        </div>
      </div>

      <!-- <div class="common-select"  v-if="item.type == 'tree'">
        <div class="select-title">选择团队</div>
        <div class="select-content">
          <el-dropdown trigger="click" placement="bottom" ref="disTeam3">
            <p class="el-dropdown-inners" :style="{'width': item.width}" clearable>
              <span>{{item.label}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </p>
            <el-dropdown-menu slot="dropdown">
              <el-tree @check="handleCheckChange3" :data="teamDataList2" ref="tree3" show-checkbox node-key="id"
                :default-expanded-keys="[1]" :props="defaultProps2" style="padding-right: 0px;">
              </el-tree>
              <div class="hengxianmy">
                <div class="my_sureOne" @click="my_sureOne3">取消</div>
                <div class="my_sure" @click="my_sure3">确定</div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div> -->
      <div class="common-select" v-if="item.type == 'radio'">
        <div class="select-title">{{item.label}}</div>
        <div class="select-content" style="height: 0.3rem; border: none;">
          <el-select placeholder="请选择" style="width:1.68rem" size="mini" v-model= clearable class="el-select-inners">
            <el-option v-for="items in item.value" :key="items.key" :label="items.key"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    searchList: {
      type: Array
    }
  },
  data() {
    return {
      formData: {
        
      }
    }
  },
  methods:{
    
  }
}
</script>
<style>
.search-header {
  height: auto;
  padding:0.15rem 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-box {
  margin-bottom: 0.18rem;
  flex: 1;
}


</style>