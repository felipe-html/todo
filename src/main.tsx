import { TaskProvider } from './hooks/useTasks'
import {Home} from './pages/home/Home'
import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/index.scss"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TaskProvider>
      <Home />  
    </TaskProvider>
  </React.StrictMode>,
)
