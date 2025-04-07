import React from 'react'
import Profil from "src/views/profil/Profil";

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))


const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profilim', name: 'Profilim', element: Profil },
]


export default routes
