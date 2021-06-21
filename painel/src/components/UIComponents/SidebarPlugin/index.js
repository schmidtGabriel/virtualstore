import Sidebar from './SideBar.vue'

const SIDEBAR = {
  ADMIN: "ADMIN",
  SUPPORT: "SUPPORT",
  NONE: "NONE",
};

const adminLinks = [
  {
    name: 'Home',
    icon: 'ti-panel',
    path: '/admin/home',
    collapse: false,
    subLinks: []
  },
  // {
  //   name: 'Suporte',
  //   icon: 'ti-headphone-alt',
  //   path: '/admin/suportes/lista',
  //   collapse: false,
  //   subLinks: []
  // },
  {
    name: 'Usuários',
    icon: 'ti-user',
    path: '/admin/usuarios/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Produtos',
    icon: 'ti-user',
    path: '/admin/produtos/lista',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Categorias',
    icon: 'ti-user',
    path: '/admin/categorias/lista',
    collapse: false,
    subLinks: []
  },
{
  name: 'Perguntas Frequentes',
  icon: 'ti-pencil',
  path: '/admin/perguntas/lista',
  collapse: false,
  subLinks: []
},
  {
    name: 'Notificações',
    icon: 'ti-comment',
    path: '/admin/notificacoes/lista',
    collapse: false,
    subLinks: [
      // {
      //   name: 'Lista',
      //   icon: 'ti-clipboard',
      //   path: '/admin/notificacoes/lista'
      // },

      // {
      //   name: 'Criar',
      //   icon: 'ti-pencil',
      //   path: '/admin/notificacoes/criar'
      // },
    ]
  },
  {
    name: 'Trocar Senha',
    icon: 'ti-lock',
    path: '/admin/senha/editar',
    collapse: false,
    subLinks: []
  },
  {
    name: 'Configurações',
    icon: 'ti-settings',
    path: '/admin/configuracoes/editar',
    collapse: false,
    subLinks: [
      /*{
        name: 'Lista',
        icon: 'ti-clipboard',
        path: '/admin/blacklist/lista'
      },
      {
        name: 'Criar',
        icon: 'ti-pencil',
        path: '/admin/blacklist/criar'
      },*/
    ]
  },

 
];



const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],

  displaySidebar(value) {
    this.showSidebar = value
  },
  updateSidebar(value) {
    console.log(value)
    this.sidebarLinks = adminLinks;
    this.showSidebar = 'ADMIN'
  }
};

const SidebarPlugin = {

  install(Vue) {
    Vue.mixin({
      data() {
        return {
          sidebarStore: SidebarStore
        }
      }
    });

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get() {
        return this.$root.sidebarStore
      }
    });
    Vue.component('side-bar', Sidebar)
  }
};

export default SidebarPlugin
