<template>
  <div>
    <router-link :to="resolvePath(item)" style="display: inline-block; width: 100%;">{{item.memuname}}</router-link>
  </div>
</template>
<script>
export default {
  name: 'SidebarChildren',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    parentId: {
      default: ''
    },
  },
  data() {
    return {}
  },
  methods: {
    hasOneShowingChild(item) {
      if(this.parentId) {
        this.onlyOneChild = item.children[0];
        return true
      } else {
        this.onlyOneChild = item;
        return true
      }
      return false
    },
    resolvePath(item) {
      const dist = this.$store.state.dictList;
      return {
        path: item.basePaths + '/' + item.path,
        query: Object.assign({}, {v: dist}, item.query)
      } 
    }
  }
}
</script>