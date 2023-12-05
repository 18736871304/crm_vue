<template>
  <div>
    <router-link :to="resolvePath(item)" style="display: inline-block; width: 100%;padding: 0 0.12rem;">{{item.memuname}}</router-link>
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
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
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    },
    resolvePath(item) {
      const dist = this.$store.state.dictList;
      let onlyOneChild = item.children[0];
      let basePath = item.path;
      if(basePath == '/') basePath = '';
      return {
        path: basePath + '/' + onlyOneChild.path,
        query: Object.assign({}, {v: dist}, onlyOneChild.query)
      } 
    }
  }
}
</script>