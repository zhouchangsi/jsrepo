<template></template>
<script>
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"

export default {
  name: "note",
  components: {
    ElementUI
  },
  methods: {
    showNote(note) {
      const h = this.$createElement;
      // this.$createElement('i', {style: 'color: teal'}, note)
      const noteElement = h('i', {style: 'color: teal'}, note)

      this.$notify({
        title: 'System information',
        message: noteElement,
      });
    },
  }
}
</script>