import React from 'react'
import Read from './views/forms/layout/Read'
import Update from './views/forms/layout/Update'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Layout = React.lazy(() => import('./views/forms/layout/Layout'))

// Icons

// Notifications

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/read', name: 'Read', element: Read },
  { path: '/forms/update', name: 'Update', element: Update },
]

export default routes
