<template>
  <div>
    <form-insert :tableName="tableName" />
  </div>
</template>

<script>
import formInsert from "../compontents/form-insert.vue";
export default {
  components: { formInsert },
  name: "user-information",
  data() {
    return {
      tableName: "student",
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped></style>
