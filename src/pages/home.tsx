import { Helmet } from "react-helmet"
import ShowPost from "../components/showPost"
import { useEffect, useState } from "react"
import { api } from "../services/api";
import { postInterface } from "../models/models";

export default function Home() {



  const [posts, setPosts] = useState<Array<postInterface>>();

  useEffect(() => {
    const getPosts = async () => {
      const data: Array<postInterface> = await api.get('/posts').then((response) => response.data);
      setPosts(data);
    }

    getPosts()
  }, [])


  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    return `${formattedDay}-${formattedMonth}-${year}`;
  }


  return (
    <>
      <Helmet>
        <title>BLOGGY</title>
      </Helmet>
      <main className="container px-3 grid sm:grid-cols-[3fr_1fr] grid-cols-1 gap-4 my-5 min-h-[80svh]">
        <section className="flex flex-col gap-7">
          {posts?.map((post: postInterface, index) => (
            <ShowPost principal={{ titulo: post.titulo, desc: post.text, info: `${post.usuario.nome} - ${formatDate(post.date)}`, image: post.foto }}
              tema={post.tema.description} key={index} />
          ))}



        </section>

        <aside className="flex flex-col gap-5">
          <div className="bg-white max-w-[300px]">
            <div className="px-3 py-2 border-b border-b-[#eee] ">
              <span className="font-bold capitalize">
                Faça parte do time
              </span>
            </div>
            <div className="p-3 flex flex-col gap-6">
              <p className="text-sm">Cadastre-se, e comece a publicar no BLOGGY</p>
            </div>
          </div>
        </aside>
      </main>
    </>
  )
}
