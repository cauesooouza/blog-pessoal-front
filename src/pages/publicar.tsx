import { useNavigate } from "react-router-dom"
import { postInterface, temaInterface } from "../models/models";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { api, publicarPostagem, publicarTema } from "../services/api";
import { AuthContext } from "../contexts/authcontext";

export default function Publicar() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Meses são indexados a partir de 0
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  let navigate = useNavigate()

  const [temas, setTemas] = useState<Array<temaInterface>>();

  const { usuario } = useContext(AuthContext);


  useEffect(() => {
    const getTemas = async () => {
      const data: Array<temaInterface> = await api.get('/tema').then((response) => response.data);
      setTemas(data);
    }
    getTemas()
  }, [])

  const [postagem, setPostagem] = useState<postInterface>({
    titulo: '',
    text: '',
    date: formattedDate,
    foto: '',
    tema: {},
    usuario: {}
  })

  const [novoTema, setNovoTema] = useState<temaInterface>({ description: '' })


  function atualizarEstadoPostagem(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value
    })
  }

  async function publicarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await publicarPostagem(`/posts`, postagem, { headers: { Authorization: usuario.token } })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  function atualizarEstadoTema(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setNovoTema({
      ...novoTema,
      [e.target.name]: e.target.value
    })
  }

  async function publicarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await publicarTema(`/tema`, novoTema, { headers: { Authorization: usuario.token } })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>BLOGGY | Publique</title>
      </Helmet>
      <main className="h-[80svh] flex justify-center items-center gap-4">
        {/* pub */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={publicarNovaPostagem}>
          <div className="text-xl font-medium mb-4">Nova publicação</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Titulo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="titulo"
              type="text"
              placeholder="Titulo da postagem"
              name="titulo"
              value={postagem.titulo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoPostagem(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Texto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              type="text"
              name="text"
              placeholder="texto da sua postagem"
              value={postagem.text}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoPostagem(e)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Foto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="foto"
              type="text"
              placeholder="https://suafoto.png"
              name="foto"
              value={postagem.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoPostagem(e)}
            />
          </div>
          <div className="mb-4 hidden">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Data
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="datetime-local"
              name="date"
              value={formattedDate}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Tema
            </label>
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="tema"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstadoPostagem(e)}>
              <option selected>Selecione um tema</option>
              {temas?.map((tema, index) => (
                <option value={tema.id} key={index}>{tema.description}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 hidden">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario Id
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="usuarioId"
              type="number"
              name="usuario"
              value={usuario.id}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Cadastrar
            </button>
          </div>
        </form>

        {/* tema */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={publicarNovoTema}>
          <div className="text-xl font-medium mb-4">Novo tema</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Titulo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="titulo"
              type="text"
              placeholder="Titulo da postagem"
              name="description"
              value={novoTema.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstadoTema(e)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </main>
    </>
  )
}
