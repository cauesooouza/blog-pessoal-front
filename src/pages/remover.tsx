import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { postInterface, temaInterface } from "../models/models";
import { api, deletePost, deleteTema } from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext";

export default function Remover() {

  const { usuario } = useContext(AuthContext);

  const navigate = useNavigate();

  const [temas, setTemas] = useState<Array<temaInterface>>();
  const [temaExcluido, setTemaExcluido] = useState<temaInterface>({ id: 0 })

  useEffect(() => {
    const getTemas = async () => {
      const data: Array<temaInterface> = await api.get('/tema').then((response) => response.data);
      setTemas(data);
    }
    getTemas()
  }, [])

  function atualizarEstadoTema(e: ChangeEvent<HTMLSelectElement>) {
    setTemaExcluido({
      ...temaExcluido,
      [e.target.name]: Number(e.target.value)
    })
  }

  async function excluirTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await deleteTema(`/tema/${temaExcluido.id}`, { headers: { Authorization: usuario.token } })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const [posts, setPosts] = useState<Array<postInterface>>();
  const [postExcluido, setPostExcluido] = useState({ id: 0 })

  useEffect(() => {
    const getPosts = async () => {
      const data: Array<postInterface> = await api.get('/posts').then((response) => response.data);
      setPosts(data);
    }

    getPosts()
  }, [])

  function atualizarEstadoPost(e: ChangeEvent<HTMLSelectElement>) {
    setPostExcluido({
      ...postExcluido,
      [e.target.name]: Number(e.target.value)
    })
  }

  async function excluirPost(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await deletePost(`/posts/${postExcluido.id}`, { headers: { Authorization: usuario.token } })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>BLOGGY | Remova</title>
      </Helmet>
      <main className="h-[80svh] flex justify-center items-center gap-4 px-3 flex-wrap">
       {/* apagar tema */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"  onSubmit={excluirTema}>
          <div className="text-xl font-medium mb-4">Apagar tema</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Tema
            </label>
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="id"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstadoTema(e)}
              >
                <option  disabled selected>Selecione um tema</option>
              {temas?.map((tema, index) => (
                <option value={tema.id} key={index}>{tema.description}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Excluir
            </button>
          </div>
        </form>

        {/* apagar pub */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"  onSubmit={excluirPost}>
          <div className="text-xl font-medium mb-4">Apagar publicação</div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Publicação
            </label>
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="id"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstadoPost(e)}
              >
                <option  disabled selected>Selecione um post</option>
              {posts?.map((post, index) => (
                <option value={post.id} key={index}>{post.titulo}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Excluir
            </button>
          </div>
        </form>
      </main>
    </>
  )
}
