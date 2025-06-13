import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { AuthProvider} from './components/store/AuthContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <StrictMode>
     <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        style={{
          width: '90vw',
          maxWidth: '400px',
          // left: '50%',
          transform: 'translateX(0%)',
          top: '20px',
          // right: 'auto'
        }}
        toastStyle={{
          width: '60%',
          margin: '0 0 10px 0',
          borderRadius: '12px',
          fontSize: '20px'
        }}
      />
   </StrictMode>
 </AuthProvider>
)
