import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Templates from './pages/Templates'
import CreateProfile from './pages/CreateProfile'
import PreviewProfile from './pages/PreviewProfile'
import PublicProfile from './pages/PublicProfile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Public shareable profile renders without the app chrome */}
      <Route path="/profile/:slug" element={<PublicProfile />} />

      {/* Main app shell */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/preview" element={<PreviewProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
