import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { postInterface, temaInterface } from "../models/models";
import { api, deletePost, deleteTema } from "../services/api";
import { AuthContext } from "../contexts/authcontext";
import { ToastContainer, toast } from "react-toastify";

export default function Remover() {

  const { usuario } = useContext(AuthContext);
  const notify = (content: string, options: object) => toast(content, options);

  const [temas, setTemas] = useState<Array<temaInterface>>();
  const [temaExcluido, setTemaExcluido] = useState<temaInterface>({ id: 0 })
  const [getTemaAgain, setGetTemaAgain] = useState(0);

  useEffect(() => {
    const getTemas = async () => {
      const data: Array<temaInterface> = await api.get('/tema').then((response) => response.data);
      setTemas(data);
    }
    getTemas()
  }, [getTemaAgain])

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
      notify("Removido com sucesso!", { type: 'success' })
      setGetTemaAgain(getTemaAgain+ 1);
    } catch (error) {
      console.error(error)
      notify("Erro, não foi possivel remover", { type: 'error' })
    }
  }

  const [posts, setPosts] = useState<Array<postInterface>>();
  const [postExcluido, setPostExcluido] = useState({ id: 0 })
  const [getPostAgain, setGetPostAgain] = useState(0);


  useEffect(() => {
    const getPosts = async () => {
      const data: Array<postInterface> = await api.get('/posts').then((response) => response.data);
      setPosts(data);
    }

    getPosts()
  }, [getPostAgain])

  function atualizarEstadoPost(e: ChangeEvent<HTMLSelectElement>) {
    console.log('função estado post')
    setPostExcluido({
      ...postExcluido,
      [e.target.name]: Number(e.target.value)
    })
  }

  async function excluirPost(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('função excluir post')

    try {
      await deletePost(`/posts/${postExcluido.id}`, { headers: { Authorization: usuario.token } })
      notify("Removido com sucesso!", { type: 'success' })
      setGetPostAgain(getPostAgain +1);
    } catch (error) {
      console.error(error)
      notify("Erro, não foi possivel remover", { type: 'error' })
    }
  }

  console.log(postExcluido.id)

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
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >
              Excluir
            </button>
          </div>
        </form>
        <ToastContainer />
      </main>
    </>
  )
}
