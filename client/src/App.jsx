import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import FormCreatePage from './pages/FormCreatePage'
import FormManagePage from './pages/FormManagePage'
import FormFillPage from './pages/FormFillPage'

function App() {

  return (



    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<FormCreatePage />} />
        <Route path="/formmanage" element={<FormManagePage />} />
        <Route path="/formfill/:id" element={<FormFillPage />} />


      </Route>
    </Routes>



  )
}

export default App
