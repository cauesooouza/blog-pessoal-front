import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Footer from "./components/footer";
import Login from "./pages/login";
import Cadastre from "./pages/cadastre";
import Publicar from "./pages/publicar";
import Remover from "./pages/remover";
import NotFound from "./pages/notfound";
import { AuthProvider } from "./contexts/authcontext";
import Perfil from "./pages/perfil";


function AppRoutes() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastre" element={<Cadastre />} />
          <Route path="/publicar" element={<Publicar />} />
          <Route path="/remover" element={<Remover />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default AppRoutes;
