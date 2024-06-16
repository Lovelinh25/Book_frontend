import HomePage from './../pages/web/HomePage';
import LoginPage from './../pages/web/LoginPage';
import RegisterPage from './../pages/web/RegisterPage';
import ProductPage from './../pages/web/ProductPage';
import CartPage from './../pages/web/CartPage';
import OrderPage from './../pages/web/OrderPage';
import OrderStatusPage from './../pages/web/OrderStatusPage';

import AdminPage from './../pages/admin/AdminPage';
import CategoryListPage from './../pages/admin/CategoryListPage';
import CategoryUpdatePage from './../pages/admin/CategoryUpdatePage';
import ProductListPage from './../pages/admin/ProductListPage';
import ProductUpdatePage from './../pages/admin/ProductUpdatePage';

import routeConfig from '../config/routeConfig';
import MyOrderPage from '../pages/web/MyOrderPage';

// common routes
const commonRoutes = [
  { path: routeConfig.home, component: HomePage },
  { path: routeConfig.product, component: ProductPage },
];

// unauth routes
const unauthRoutes = [
  { path: routeConfig.login, component: LoginPage },
  { path: routeConfig.register, component: RegisterPage },
];

// auth routes
const authRoutes = [
  { path: routeConfig.cart, component: CartPage },
  { path: routeConfig.order, component: OrderPage },
  { path: routeConfig.myOrder, component: MyOrderPage },
  { path: routeConfig.orderStatus, component: OrderStatusPage },
  { path: routeConfig.admin, component: AdminPage, admin: true },
  { path: routeConfig.categoryList, component: CategoryListPage, admin: true },
  {
    path: routeConfig.categoryCreate,
    component: CategoryUpdatePage,
    admin: true,
  },
  {
    path: routeConfig.categoryUpdate,
    component: CategoryUpdatePage,
    admin: true,
  },
  { path: routeConfig.productList, component: ProductListPage, admin: true },
  {
    path: routeConfig.productCreate,
    component: ProductUpdatePage,
    admin: true,
  },
  {
    path: routeConfig.productUpdate,
    component: ProductUpdatePage,
    admin: true,
  },
];

export { commonRoutes, authRoutes, unauthRoutes };
