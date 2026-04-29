import { Routes } from '@angular/router';
import { Main } from './components/main/main';
import { Allproduct } from './components/allproduct/allproduct';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Profile } from './components/profile/profile';
import { Errorpage } from './components/errorpage/errorpage';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
    {
        path:"",
        component:Main
    },
    {
        path:"allproduct",
        component:Allproduct
    },
    {
        path:"login",
        component:Login
    },
    {
        path:"signup",
        component:Signup
    },
    {
        path:"profile",
        component:Profile
    },
    {
        path:"cart",
        component:Cart
    },
    {
        path:"**",
        component:Errorpage
    }

];
