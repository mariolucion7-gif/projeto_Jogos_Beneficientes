import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
export const router=createBrowserRouter([
 {path:'/login',element:<Login/>},
 {path:'/',element:<Navigate to={localStorage.getItem('@MRConstrucao:token') ? '/campanha.html' : '/login'} replace/>},
 {path:'*',element:<Navigate to="/login" replace/>}
]);
