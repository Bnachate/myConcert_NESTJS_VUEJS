import Vue from 'vue'
import Router from 'vue-router'
import HomeComponent from '@/views/Home';
import ConcertComponent from '@/views/Concert';
import CartComponent from '@/components/Cart';
import CheckComponent from '@/components/Check';
import ShowComponent from '@/components/Show';
import EditUser from '@/components/user/EditUser';
import CreateUser from '@/components/user/CreateUser';
import EditConcert from '@/components/concert/EditConcert';
import CreateConcert from '@/components/concert/CreateConcert';
import EditHall from '@/components/hall/EditHall';
import CreateHall from '@/components/hall/CreateHall';
import EditBand from '@/components/band/EditBand';
import CreateBand from '@/components/band/CreateBand';
import AdminUser from '@/views/AdminUser';
import AdminConcert from '@/views/AdminConcert';
import AdminHall from '@/views/AdminHall';
import AdminBand from '@/views/AdminBand';
import AdminStat from '@/views/AdminStat';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import CRUD_USER from '@/components/CRUD_USER';
import Profile from '@/components/Profile';
import FavoriteBands from '@/components/FavoriteBands';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/details', name: 'details', component: ShowComponent },
    { path: '/reservations', name: 'reservations', component: CartComponent },
    { path: '/check', name: 'check', component: CheckComponent },
    { path: '/concert', name: 'concert', component: ConcertComponent },
    { path: '/user/create', name: 'Create', component: CreateUser },
    { path: '/user/edit/:id', name: 'EditUser', component: EditUser },
    { path: '/concert/create', name: 'CreateConcert', component: CreateConcert },
    { path: '/concert/edit/:id', name: 'EditConcert', component: EditConcert },
    { path: '/hall/create', name: 'CreateHall', component: CreateHall },
    { path: '/hall/edit/:id', name: 'EditHall', component: EditHall },
    { path: '/band/create', name: 'CreateBand', component: CreateBand },
    { path: '/band/edit/:id', name: 'EditBand', component: EditBand },
    { path: '/admin-users', name: 'AdminUser', component: AdminUser },
    { path: '/admin-concerts', name: 'AdminConcert', component: AdminConcert },
    { path: '/admin-halls', name: 'AdminHall', component: AdminHall },
    { path: '/admin-bands', name: 'AdminBand', component: AdminBand },
    { path: '/admin-stats', name: 'AdminStat', component: AdminStat },
    { path: '/navbar', name: 'Navbar', component: Navbar },
    { path: '/footer', name: 'Footer', component: Footer },
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/login', name: 'CRUD_USER', component: CRUD_USER },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/favorite', name: 'FavoriteBands', component: FavoriteBands },
    {path: "/password", name: "password", component: () => import(/* webpackChunkName: "about" */ "../views/changePassword.vue"),},

  ]
});