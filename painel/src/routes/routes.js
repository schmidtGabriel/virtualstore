import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Login from '../components/GeneralViews/Login.vue'
import Starter from '../components/GeneralViews/Starter.vue'

// Admin pages

//User Pages
import User from 'src/components/Dashboard/Views/Users/User.vue'
import UserList from 'src/components/Dashboard/Views/Users/UserList.vue'
import UserCharts from 'src/components/Dashboard/Views/Users/UserCharts.vue'
import UserEdit from 'src/components/Dashboard/Views/Users/UserEdit.vue'
import UserCreate from 'src/components/Dashboard/Views/Users/UserCreate.vue'

//Category Page
import Category from 'src/components/Dashboard/Views/Category/Category.vue'
import CategoryList from 'src/components/Dashboard/Views/Category/CategoryList.vue'
import CategoryEdit from 'src/components/Dashboard/Views/Category/CategoryEdit.vue'
import CategoryCreate from 'src/components/Dashboard/Views/Category/CategoryCreate.vue'

//Product Page
import Product from 'src/components/Dashboard/Views/Product/Product.vue'
import ProductList from 'src/components/Dashboard/Views/Product/ProductList.vue'
import ProductEdit from 'src/components/Dashboard/Views/Product/ProductEdit.vue'
import ProductCreate from 'src/components/Dashboard/Views/Product/ProductCreate.vue'

//Payment Page
import Payment from 'src/components/Dashboard/Views/Payment/Payment.vue'
import PaymentList from 'src/components/Dashboard/Views/Payment/PaymentList.vue'
import PaymentEdit from 'src/components/Dashboard/Views/Payment/PaymentEdit.vue'
import PaymentCreate from 'src/components/Dashboard/Views/Payment/PaymentCreate.vue'


//Supports Page
import Support from 'src/components/Dashboard/Views/Support/Support.vue'
import SupportList from 'src/components/Dashboard/Views/Support/SupportList.vue'
import SupportEdit from 'src/components/Dashboard/Views/Support/SupportEdit.vue'
import SupportCreate from 'src/components/Dashboard/Views/Support/SupportCreate.vue'

//Notifications Page
import Notifications from 'src/components/Dashboard/Views/Notifications/Notifications.vue'; 
import NotificationList from 'src/components/Dashboard/Views/Notifications/NotificationList.vue'; 
import NotificationCreate from 'src/components/Dashboard/Views/Notifications/NotificationCreate.vue'; 
import NotificationEdit from 'src/components/Dashboard/Views/Notifications/NotificationEdit.vue'; 


//News Page
import News from 'src/components/Dashboard/Views/News/News.vue'; 
import NewsList from 'src/components/Dashboard/Views/News/NewsList.vue'; 
import NewsCreate from 'src/components/Dashboard/Views/News/NewsCreate.vue'; 
import NewsEdit from 'src/components/Dashboard/Views/News/NewsEdit.vue'; 

//CommonQuestion Page
import CommonQuestion from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestion.vue'; 
import CommonQuestionList from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestionList.vue'; 
import CommonQuestionCreate from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestionCreate.vue'; 
import CommonQuestionEdit from 'src/components/Dashboard/Views/CommonQuestion/CommonQuestionEdit.vue'; 

//Promotion Page
import Promotion from 'src/components/Dashboard/Views/Promotion/Promotion.vue'; 
import PromotionList from 'src/components/Dashboard/Views/Promotion/PromotionList.vue'; 
import PromotionCreate from 'src/components/Dashboard/Views/Promotion/PromotionCreate.vue'; 
import PromotionEdit from 'src/components/Dashboard/Views/Promotion/PromotionEdit.vue';

//Settings Page
import Settings from 'src/components/Dashboard/Views/Settings/Settings.vue';
import SettingsEdit from 'src/components/Dashboard/Views/Settings/SettingsEdit.vue';

//Tools Page
import Tools from 'src/components/Dashboard/Views/Tools/Tools.vue';
import ToolsList from 'src/components/Dashboard/Views/Tools/ToolsList.vue';

//Password Page
import Password from 'src/components/Dashboard/Views/Password/Password.vue';
import PasswordEdit from 'src/components/Dashboard/Views/Password/PasswordEdit.vue';

import Home from 'src/components/Dashboard/Views/Home.vue'    
import { Store } from 'vuex';



const routes = [
  {
    path: '/',
    component: Starter,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'usuarios',
        name: 'Usuários',
        component: User,
        redirect: 'usuarios/lista',
        children: [
          {
            path: 'lista',
            name: 'Usuários - Lista',
            component: UserList
          },
          {
            path: 'grafico',
            name: 'Usuários - Gráfico',
            component: UserCharts
          },
          {
            path: 'editar/:id',
            name: 'Usuários - Editar',
            component: UserEdit
          },
          {
            path: 'criar',
            name: 'Usuários - Novo',
            component: UserCreate
          },

        ]
      },  
      {
        path: 'categorias',
        name: 'Categorias',
        component: Category,
        redirect: 'categorias/lista',
        children: [
          {
            path: 'lista',
            name: 'Categorias - Lista',
            component: CategoryList
          },
          {
            path: 'editar/:id',
            name: 'Categorias - Editar',
            component: CategoryEdit
          },
          {
            path: 'criar',
            name: 'Categorias - Novo',
            component: CategoryCreate
          },

        ]
      },    
      {
        path: 'produtos',
        name: 'Produtos',
        component: Product,
        redirect: 'produtos/lista',
        children: [
          {
            path: 'lista',
            name: 'Produtos - Lista',
            component: ProductList
          },
          {
            path: 'editar/:id',
            name: 'Produtos - Editar',
            component: ProductEdit
          },
          {
            path: 'criar',
            name: 'Produtos - Novo',
            component: ProductCreate
          },

        ]
      },
      {
        path: 'suportes',
        name: 'Suportes',
        component: Support,
        redirect: 'upgrades/lista',
        children: [
          {
            path: 'lista',
            name: 'Suportes - Lista',
            component: SupportList
          },
          {
            path: 'editar/',
            name: 'Suportes - Editar',
            component: SupportEdit
          },
          {
            path: 'criar',
            name: 'Suportes - Novo',
            component: SupportCreate
          },

        ]
      },
      {
        path: 'notificacoes',
        name: 'Notificações',
        component: Notifications,
        redirect: 'notificacoes/lista',
        children: [
          {
            path: 'lista',
            name: 'Notificações - Lista',
            component: NotificationList
          },
          {
            path: 'criar',
            name: 'Notificações - Novo',
            component: NotificationCreate
          },
          {
            path: 'editar/:id',
            name: 'Notificações - Editar',
            component: NotificationEdit
          },
      ]
      },
      {
        path: 'noticias',
        name: 'Notícia',
        component: News,
        redirect: 'noticias/lista',
        children: [
          {
            path: 'lista',
            name: 'Notícia - Lista',
            component: NewsList
          },
          {
            path: 'criar',
            name: 'Notícia - Novo',
            component: NewsCreate
          },
          {
            path: 'editar',
            name: 'Notícia - Editar',
            component: NewsEdit
          },
      ]
      },
      {
        path: 'perguntas',
        name: 'Pergunta Frequente',
        component: CommonQuestion,
        redirect: 'perguntas/lista',
        children: [
          {
            path: 'lista',
            name: 'Pergunta Frequente - Lista',
            component: CommonQuestionList
          },
          {
            path: 'criar',
            name: 'Pergunta Frequente - Novo',
            component: CommonQuestionCreate
          },
          {
            path: 'editar',
            name: 'Pergunta Frequente - Editar',
            component: CommonQuestionEdit
          },
      ]
      },
      {
        path: 'promocoes',
        name: 'Promoção',
        component: Promotion,
        redirect: 'promocoes/lista',
        children: [
          {
            path: 'lista',
            name: 'Promoção - Lista',
            component: PromotionList
          },
          {
            path: 'criar',
            name: 'Promoção - Novo',
            component: PromotionCreate
          },
          {
            path: 'editar',
            name: 'Promoção - Editar',
            component: PromotionEdit
          },
      ]
      },
      {
        path: 'configuracoes',
        name: 'Configurações',
        component: Settings,
        redirect: 'configuracoes/editar',
        children: [
          {
            path: 'editar',
            name: 'Configurações',
            component: SettingsEdit
          },
        ]
      },
{
  path: 'senha',
  name: 'Senha',
  component: Password,
  redirect: 'senha/editar',
  children: [
    {
      path: 'editar',
      name: 'Trocar Senha',
      component: PasswordEdit
    },
  ]
},
    ]
  },
  {path: '*', component: NotFound}
];

export default routes
