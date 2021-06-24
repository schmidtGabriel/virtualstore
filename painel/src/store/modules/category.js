import api from '../../api'
import {
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_FAILURE,
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
} from '../types'

const state = {
  list: [],
  listUpdated: (new Date()),
  toValidateList: [],
  selected: null,
  selectedUpdated: (new Date())
};


const actions = {

  
  getCategoryList({commit}, query) {
    return new Promise((resolve, reject) => {

    api.startLoader()
    api.getCategoryList(query).then(response => {
      if (!response.ok) {
        api.stopLoader()
         commit(GET_CATEGORY_LIST_FAILURE)
         return reject(response.body.$error)
      }
      commit(GET_CATEGORY_LIST_SUCCESS, {
        categoryList: response.body.data
      })
      api.stopLoader()
      return resolve(response.body.data)
    }, response => {
      api.stopLoader()
      commit(GET_CATEGORY_LIST_FAILURE)
      return reject(response.body.$error)
    })
  })
  },
 
  cleanCategoryList({commit}) {
    return commit(GET_CATEGORY_LIST_FAILURE)
  },
  
  getCategory({commit}, id) {
    return new Promise((resolve, reject) => {

      api.getCategory(id)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            commit(GET_CATEGORY_FAILURE);
            return reject(response.body.$error);
          }
          commit(GET_CATEGORY_SUCCESS, {
            category: response.body.data
          });
          return resolve(response.body.data);
        }, response => {
          commit(GET_CATEGORY_FAILURE);
          return reject(response.body.$error);
        })
    })
  },
 
  
  updateCategory({commit}, data) {
    return new Promise((resolve, reject) => {

      api.startLoader()
      let avaliables = [
        "_id",
        "name",
      ];

      let obj = {};

      for (let i of avaliables) {
        if (data.hasOwnProperty(i)) {
          obj[i] = data[i];
        }
      }

          api.updateCategory(obj)
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
  createCategory({commit}, data) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.createCategory(data)
        .then(response => {
          console.log(response)

          if (!response.ok) {
            api.stopLoader()
            return reject(response.body.$error);
          } else {
            api.stopLoader()
            return resolve(response.body.$success);
          }
        }, response => {
          console.log(response)

          api.stopLoader()
          return reject(response.body.$error);
        })
    })
  },
  
  
 
  deleteCategory({commit}, id) {
    return new Promise((resolve, reject) => {
      api.startLoader()
      api.deleteCategory(id)
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

  [UPDATE_CATEGORY_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.category));
  },
  [GET_CATEGORY_LIST_FAILURE](state) {
    state.list = []
  },
  [GET_CATEGORY_LIST_SUCCESS](state, action) {
    state.list = action.categoryList;
    state.listUpdated = new Date();
  },
  [GET_CATEGORY_FAILURE](state) {
    state.selected = null
  },
  [GET_CATEGORY_SUCCESS](state, action) {
    state.selected = JSON.parse(JSON.stringify(action.category));
  },
};

export default {
  state,
  actions,
  mutations
}
