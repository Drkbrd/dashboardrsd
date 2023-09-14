import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Dashboard from './dashboard/dashboard.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Score from './score/score.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Score />
  </React.StrictMode>,
)
//<Dashboard />