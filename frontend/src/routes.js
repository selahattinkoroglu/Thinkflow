import React from 'react'
import Profil from "src/views/profil/Profil";
import BlogDetail from "src/components/BlogDetails";
import YazarProfili from "src/components/YazarProfili";
import BlogEkle from "src/views/blog/BlogEkle";
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DashboardFav = React.lazy(() => import('./views/favorites/DashboardFav'))
const DashboardFav = React.lazy(() => import('./views/favorites/DashboardFav'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profilim', name: 'Profilim', element: Profil },
  { path: '/write', name: 'New Blog', element: BlogEkle },
  { path: '/blogs/:id', name: 'Blog Detail', element: BlogDetail },
  { path: '/yazarlar/:id', name: 'Yazar', element: YazarProfili }, 
  { path: '/favorites', name: 'Favoriler', element: DashboardFav },

]


export default routes
