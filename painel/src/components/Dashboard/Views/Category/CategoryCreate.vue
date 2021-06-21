<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <category-form :data="data" event="save" />
      </div>
    </div>
  </div>
</template>
<script>
import CategoryForm from "components/UIComponents/Forms/CategoryForm.vue";
import { mapActions } from "vuex";

export default {
  components: {
    CategoryForm,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.$on("save", () => {
      this.createCategory(this.data)
        .then((res) => {
          console.log(res);
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: res.msg,
            position: "top center",
            type: "success",
          });
          this.data = {};
        })
        .catch((res) => {
          this.$notify({
            group: "foo",
            title: res.msg, // "Criação.",
            text: res.info, //"Usuário criado com sucesso!",
            position: "top center",
            type: "error",
          });
        });
    });
  },

  mounted() {
    this.data = !this.$route.params.model ? {} : this.$route.params.model;
  },
  methods: {
    ...mapActions(["createCategory"]),
  },
};
</script>
<style lang="scss" scoped>
</style>