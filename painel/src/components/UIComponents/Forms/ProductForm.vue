<template>
  <div>
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

        <div class="col-md-12" >
          <div class="col-md-4"><h4 style="margin: 0"> Galeria de Imagens</h4></div> 
          <div class="col-md-8 text-right"> <button class="btn btn-fill btn-primary" v-on:click="addImage()"> Adicionar Imagens</button></div>
          <div class="col-md-12"><h5 v-if="data.images.length == 0"> Sem imagens </h5></div>
          <div class="col-md-12" style="border: 2px gray solid; border-radius: 10px; padding: 10px; margin-top: 10px">
              <div class="col-md-3 " v-for="item in data.images">
                <div class="col-md-6 no-padding">
                <button class="btn" :class="item.isMain==true?'btn-fill':''" v-on:click="makeMain(item)" > {{item.isMain==true?'PRINCIPAL': 'GALERIA'}}</button>
                </div>
                <div class="col-md-3">
                 <button class="btn btn-fill btn-danger" v-on:click="deleteImage(item)" > DELETAR</button>
                </div>
                <img  v-bind:src="item.url" width="100%" height="150px" style="margin-top:10px" v-viewer/>
            </div>
            </div>
        </div>
          
      
        <div class="text-right">
          <btn-rounded v-if="!readonly" label="SALVAR" event="execute" />
        </div>
      </div>
    </form>
    <modal name="imageModal"
          :resizable="true"
         :adaptive="true"
         :width="900"
         height=auto
         
         >
         <div class="col-md-12">
            <h4> Adicione novas Imagens</h4>
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
          <div class="text-right">
          <button class="btn btn-fill btn-rounded btn-success"  v-on:click="saveImage()" >SALVAR</button>
        </div>
         </div>
         </modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import moment from "moment";
import { NAMES } from '../../../config';
import {getCookie} from 'src/utils/authService';
import FormGroupCheckbox from '../Inputs/formGroupCheckbox.vue';



export default {
  name: "product-form",
  components: {
  },

  props: {
    data: {},
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
    ...mapActions(["getCategoryList", "deleteProductImage", "sendProductImages"]),
    ...mapGetters({
      sidebarFlag: "sidebarFlag",
    }),

    formatDate(date) {
      return moment.utc(date).utcOffset(0).format("DD/MM/YYYY HH:mm:ss");
    },

    makeMain(item){
        for (let index = 0; index < this.data.images.length; index++) {
          if(item._id == this.data.images[index]._id){
            this.data.images[index].isMain = true
          }else{
            this.data.images[index].isMain = false
          }
        }
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

    deleteImage(image){
      this.deleteProductImage(image._id).then((res)=>{
        this.data.images = res.info.images;
       
         return this.$notify({
            group: "foo",
            title: "Sucesso",
            text: res.msg,
            position: "top center",
            type: "success",
          });

      })
    },

    addImage(){
      this.$modal.show("imageModal")
    },

    saveImage(){
      for(var i=0 ; i < this.data.gallery.length; i++){
        this.saveImages(this.data.gallery[i], this.data._id)
        }

      this.$modal.hide("imageModal")

    },

    saveImages(file, id) {
      var formD = new FormData();
      formD.append('file', file);

      var model = {
        gallery: formD,
        _id: id
      }
      this.sendProductImages(model).then((res)=>{

        this.data.images = res.info.images;
        return this.$notify({
            group: "foo",
            title: "Sucesso",
            text: res.msg,
            position: "top center",
            type: "success",
          });
      })

    // let request = new XMLHttpRequest();
    // request.open("POST", this.url+"product/image/"+id, true);
    // request.setRequestHeader('authorization','Bearer '+ getCookie('token').replace(/(^")|("$)/g, ''));
    // var formD = new FormData();
    // formD.append('file', file);
    // request.send(formD);
  },
  
    onInit() {
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
