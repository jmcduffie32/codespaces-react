import './App.css'
import Match from './components/Match'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Match />,
    errorElement: <ErrorPage />
  },
  {
    path: "/matches",
    element: <Match />,
    errorElement: <ErrorPage />
  },
  {
    path: "/matches/:matchId/teams",
    element: <Match />,
    errorElement: <ErrorPage />
  },
  {
    path: "/matches/:matchId/ctps",
    element: <Match />,
    errorElement: <ErrorPage />
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
