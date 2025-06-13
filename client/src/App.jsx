
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Layout } from './components/layout/Layout'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import { Register } from './components/pages/Registration'
import { Login } from './components/pages/Login'
import { Error } from './components/layout/Error'
import { Logout } from './components/pages/Logout'
import { Book } from './components/pages/Book'
import { BookshelfPage } from './components/pages/BookShelf'


function App() {
  
  const router = createBrowserRouter([
    {path: '/', element: <Layout/>,
      errorElement: <Error/>,
      children:[
        {path:"", element: <Home />},
      {path:"/about", element: <About />},
      {path:"/contact", element: <Contact/> },
      {path : "/book", element: <Book/>},
      {path : '/bookshelf', element : <BookshelfPage/>},
      {path: "/register",  element: <Register/>},
      {path: "/login", element: <Login/>},
      {path: "/logout", element: <Logout/>}
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
      
    </>
  )
}

export default App
