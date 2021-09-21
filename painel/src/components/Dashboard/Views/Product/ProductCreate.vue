<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <product-form :data="data" event="save" />
      </div>
    </div>
  </div>
</template>
<script>
import ProductForm from "components/UIComponents/Forms/ProductForm.vue";
import { mapActions } from "vuex";

export default {
  components: {
    ProductForm,
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
      this.createProduct(this.data)
        .then((res) => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: res.msg,
            position: "top center",
            type: "success",
          });
          this.data = {};
           this.$router.push({
          name: "Produtos - Editar",
          params: { id: res.info._id },
        });
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
    ...mapActions(["createProduct"]),
  },
};
</script>
<style lang="scss" scoped>
</style>