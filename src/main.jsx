import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'

import Profile from './components/Profile.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to /user/xendatro */}
        <Route path="/" element={<App />}>
          <Route index element={<Profile username="xendatro" />} />
          <Route path="user/:username" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
