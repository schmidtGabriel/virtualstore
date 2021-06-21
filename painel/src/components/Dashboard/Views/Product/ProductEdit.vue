<template>
  <div>
    <div class="row">
      <div class="col-md-12">
          <div class="col-md-1" v-if="sidebarFlag() == 'ADMIN'">
          <button
            class="btn btn-rounded btn-fill"
            :class="[
              { ' btn-success': !localReadonly },
              { ' btn-warning': localReadonly },
            ]"
            style="padding-left: 10px; padding-right: 10px"
            v-on:click="unlock()"
          >
            <i
              :class="[
                { 'ti-unlock': !localReadonly },
                { 'ti-lock': localReadonly },
              ]"
            ></i>
          </button>
        </div>

        <div class="col-md-12">
          <product-form
            :data="data"
            :readonly="localReadonly"
            :edit="true"
            :images="gallery"
            event="save"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductForm from "src/components/UIComponents/Forms/ProductForm.vue";
import formConfirmButton from "src/components/UIComponents/Inputs/formConfirmButton.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Notifications from "vue-notification";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
import moment from "moment";
import { NAMES } from '../../../../config';
import {getCookie} from 'src/utils/authService';

Vue.use(Notifications);
Vue.use(Viewer);

export default {
  components: {
    ProductForm,
    formConfirmButton,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  props: {
    url:{
      type: String,
      default: NAMES.fullUrl
    }
  },
  computed: {
    ...mapState({}),
  },
  watch: {
    $route: "initData",
  },
  methods: {
    ...mapActions(["updateProduct", "getProduct", "sendProductImages"]),
    ...mapGetters({
      sidebarFlag: "sidebarFlag",
    }),
    initData() {
      this.data = this.$route.params.id;
      this.verifyID();
    },

    verifyID() {
      if (this.data == undefined) {
        this.$router.push({
          name: "Produtos - Lista",
        });
      }
    },

    unlock() {
      if (this.sidebarFlag() === "ADMIN") {
        this.localReadonly = !this.localReadonly;
      } else {
        this.localReadonly = true;
      }
    },

    saveImages(file, id) {
      let request = new XMLHttpRequest();
      request.open("POST", this.url+"product/image/"+id, true);
      request.setRequestHeader('authorization','Bearer '+ getCookie('token').replace(/(^")|("$)/g, ''));
      var formD = new FormData();
      formD.append('file', file, {filename: 'myImage.jpeg',  contentType: 'multipart/form-data; boundary=---WebKitFormBoundaryrHPgSrtbIrJmn'});
      request.send(formD);
    },
  },

  data() {
    return {
      localReadonly: false,
      data: null,
      readonly: true,
      gallery: null,
    };
  },

  created() {
    this.initData();
    this.localReadonly = this.readonly;

    this.$on("save", () => {
      this.updateProduct(this.data)
        .then((res) => {

        // var formD = new FormData();
        // formD.append('files', this.data.gallery[i]);

        for(var i=0 ; i < this.data.gallery.length; i++){
        this.saveImages(this.data.gallery[i], this.data._id)
        }

        // var model = {
        //   gallery: formD,
        //   _id: this.data._id
        // }
        //this.saveImages(this.data.gallery, this.data._id);
       // this.sendProductImages(model).then((res)=>{
          this.$notify({
                group: "foo",
                title: "Sucesso",
                text: res.msg,
                position: "top center",
                type: "success",
              });
              this.localReadonly = true;
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
       // })
    });
  },
};
</script>
<style lang="scss" scoped>
.card-image {
  border: solid 1px white;
  padding: 15px;
  background-color: #f0f0f0;
}

.rotateimg90 {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}

.rotateimg180 {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}

.rotateimg270 {
  -webkit-transform: rotate(270deg);
  -moz-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  -o-transform: rotate(270deg);
  transform: rotate(270deg);
}

.images {
  cursor: pointer;
}
</style>