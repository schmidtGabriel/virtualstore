<template>
  <div v-if="data">
    <form autocomplete="off">
      <div class="row">
        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Nome"
            placeholder="Nome"
            v-model="data.name"
            v-bind:readonly="readonly"
          />
        </div>

        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Preço"
            placeholder="Preço"
            v-model="data.formattedPrice"
            v-on:input="format"
            v-bind:readonly="readonly"
          />
        </div>

        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Código"
            placeholder="Código"
            v-model="data.code"
            v-bind:readonly="readonly"
          />
        </div>

        <div class="col-md-6">
          <fg-select
            :options="categoryList"
            v-model="data.category"
            :selected="data.category"
            label="Categoria"
          />
        </div>

        <div class="col-md-12"  v-if="data._id">
          <h4> Galeria de Imagens</h4>
           <form class="mt-4"
            enctype="multipart/form-data"
          >
            <div class="form-group">
              <input
                type="file"
                name="file"
                multiple
                class="form-control-file border"
                ref="image"
                @change="onFileChange"
              />
               
            </div>
            <div class="row">
              <div class="col-md-3" v-for="item in images" style="margin-top: 10px">
                <span class="ti-close" style="color: red; float: right" v-on:click="removeImage(item)"></span>
                <br>
                <img  v-bind:src="item" width="100%" height="150px" v-viewer/>
            </div>
            </div>
            
          </form>
        </div>

        

        <div class="text-right">
          <btn-rounded v-if="!readonly" label="SALVAR" event="execute" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";
import { NAMES } from '../../../config';

export default {
  name: "product-form",
  components: {},

  props: {
    data: {
      type: Object,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    event: {
      type: String,
      default: "",
    },
    edit: {
      type: Boolean,
      default: false,
    },
     url: {
      type: String,
      default: NAMES.fullUrl
    }
  },

  computed: {
    ...mapState({
      categoryList: ({ category }) =>
        category.list.map((obj) => {
          return {
            name: obj.name,
            value: obj._id,
          };
        }),
    }),
  },

  methods: {
    ...mapActions(["getCategoryList"]),
    ...mapGetters({
      sidebarFlag: "sidebarFlag",
    }),

    formatDate(date) {
      return moment.utc(date).utcOffset(0).format("DD/MM/YYYY HH:mm:ss");
    },
    
     onFileChange() {
       this.images = []
        const files = this.$refs.image.files;
        this.data.gallery = files

        if (files) {
          for (var i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.images.push(e.target.result)
            };            
            reader.readAsDataURL(files[i]);
          }
        };
      },

    removeImage(image){
       this.images.splice(this.images.indexOf(image), 1)
       this.data.gallery.splice(this.data.gallery.indexOf(image), 1)
    },

   

    onInit() {
      if(this.data._id){
        this.data.category = this.data.category._id
      }
      this.getCategoryList();
    },

    format: function (sValue) {
      this.data.formattedPrice = parseInt(
        ("" + sValue).onlyNumber()
      ).int2Money();
      this.data.price = this.data.formattedPrice
        .replace("R$", "")
        .replace(",", "")
        .replace(".", "")
        .replace(" ", "");
      this.$nextTick(() => {});
    },

    // execute() {
    //   console.log("x")
    //   if (this.event) {

    //     this.$parent.$emit(this.event, this.data);
    //   }
    // },
  },

  created() {
    this.onInit();

    this.$on("execute", () => {
      if (this.event) {
        if (!this.data.name || this.data.name == "") {
          return this.$notify({
            group: "foo",
            title: "Atenção",
            text: "Campo Nome é obrigatório",
            position: "top center",
            type: "warn",
          });
        }

        this.$parent.$emit(this.event, this.data);
      }
    });
  },
  data() {
    return {
      localReadonly: false,
      formD: null,
      images: []
    };
  },
};


</script>

<style scoped lang="scss">
label.stronger {
  font-weight: bold;
  color: black;
}

.stronger {
  font-weight: bold;
  color: black;
  margin: 15px 0 0 0 !important;
}

p.subject {
  color: #9c9c9c;
}
</style>
