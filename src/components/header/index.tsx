import { LinkedinLogo, Moon, WhatsappLogo, XLogo } from "@phosphor-icons/react"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/authcontext";
import { api } from "../../services/api";
import { temaInterface } from "../../models/models";

export default function Header() {

  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const [temas, setTemas] = useState<Array<temaInterface>>();



  useEffect(() => {
    const getTemas = async () => {
      const data: Array<temaInterface> = await api.get('/tema').then((response) => response.data);
      setTemas(data);
    }
    getTemas()
  }, [])

  return (
    <header className="bg-[#4653f6]/80 backdrop-blur	shadow-lg sticky top-0 z-10">
      <div className="container flex flex-wrap items-center py-5 px-3 justify-between text-white border-b border-b-white/40">
        <div className="flex gap-3 text-sm order-3 sm:order-1">
          {!isAuthenticated ?
            <>
              <Link to="/" className="hover:underline" >
                Inicio
              </Link>
              <Link to="/login" className="hover:underline" >
                Login
              </Link>
              <Link to="/cadastre" className="hover:underline" >
                Cadastre-se
              </Link>
            </>
            :
            <>
              <Link to="/" className="hover:underline" >
                Inicio
              </Link>
              <button type="button" className="px-3 bg-black uppercase font-bold" onClick={handleLogout}>Sair</button>
            </>
          }
        </div>
        <div className="order-1 sm:order-2">
          <a href="/">
            <span className="text-5xl uppercase font-bold ">Blo
              <span className="text-[#ff0101]">gg</span>y
            </span>
          </a>
        </div>
        <div className="flex gap-3 order-2 sm:order-3">
          <a href="https://www.linkedin.com/in/cauesooouza/" target="_blank" rel="noopener noreferrer">
            <LinkedinLogo size={26} color="#fff" weight="fill" className="hover:bg-red-500 cursor-pointer" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5513981509766" target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={26} color="#ffffff" weight="fill" className="hover:bg-red-500 cursor-pointer" />
          </a>
          <a href="https://x.com/cauesooouza" target="_blank" rel="noopener noreferrer">
            <XLogo size={26} color="#ffffff" weight="fill" className="hover:bg-red-500 cursor-pointer" />
          </a>
        </div>
      </div>
      <div className="container flex items-center p-3 justify-between text-white gap-4">
        <div className="flex gap-3 font-bold text-sm uppercase flex-wrap">
          {!isAuthenticated ?
            temas?.map((e, index) => (
              <Link to={`/tema/${e.id}`} key={index}>{e.description}</Link>
            ))
            :
            <>
              <Link to="/publicar">
                Publicar
              </Link>
              <Link to="/remover">
                Remover
              </Link>
            </>
          }
        </div>
        <div>
          <Moon size={26} color="#ffffff" weight="fill" className="hover:bg-red-500 cursor-pointer" />
        </div>
      </div>
    </header>
  )
}
