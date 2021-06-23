import api from '../../api'
import {
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAILURE,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getProductList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getProductList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_PRODUCT_LIST_FAILURE)
         return reject(response.body.$error)
      }
      commit(GET_PRODUCT_LIST_SUCCESS, {
        productList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)
    }, response => {
      api.stopLoader()
      commit(GET_PRODUCT_LIST_FAILURE)
      return reject(response.body.$error)
    })
  })
  },
 
  cleanProductList({commit}) {
    return commit(GET_PRODUCT_LIST_FAILURE)
  },
  
  getProduct({commit}, id) {
    return new Promise((resolve, reject) => {

      api.getProduct(id)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_PRODUCT_FAILURE);
            reject();
          }
          commit(GET_PRODUCT_SUCCESS, {
            product: response.body
          });
          resolve(response.body);
        }, response => {
          commit(GET_PRODUCT_FAILURE);
          reject();
        })
    })
  },
 
  
  updateProduct({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "_id",
        "name",
        "category",
        "price",
        "code"
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateProduct(obj)
            .then(response => {
              if (!response.ok) {
                api.stopLoader()
                return reject(response.body.$error);
              } else {
                api.stopLoader()
                return resolve(response.body.$success);
              }
            }, response => {
              api.stopLoader()
              return reject(response.body.$error);
            })
      
    })
  },
  createProduct({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createProduct(data)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          } else {
            api.stopLoader()
            return resolve(response.body.$success);
          }
        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },  
 
  deleteProduct({commit}, id) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteProduct(id)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          } else {
            api.stopLoader()
            return resolve(response.body.$success);
          }
        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },

  sendProductImages({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.sendProductImages(data.gallery, data._id)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          } else {
            api.stopLoader()
            return resolve(response.body.$success);
          }
        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },


  deleteProductImage({commit}, id) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteProductImage(id)
        .then(response => {
          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          } else {
            api.stopLoader()
            return resolve(response.body.$success);
          }
        }, response => {
          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },
  
  
};

const mutations = {

  [UPDATE_PRODUCT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.product));
  },
  [GET_PRODUCT_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_PRODUCT_LIST_SUCCESS](state, action) {
    state.list = action.productList;
    state.listUpdated = new Date();
  },
  [GET_PRODUCT_FAILURE](state) {
    state.selected = null
  },
  [GET_PRODUCT_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.product));
  },
};

export default {
  state,
  actions,
  mutations
}
