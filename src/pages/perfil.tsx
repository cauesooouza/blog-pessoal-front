import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";
import { Helmet } from "react-helmet";

export default function Perfil() {
    const { usuario } = useContext(AuthContext);

    return (
        <>
        <Helmet>
            <title>BLOGGY | Perfil</title>
        </Helmet>
        <main className="min-h-[78svh] flex justify-center items-center">
            <div className="border border-black relative p-2 h-[50px] w-[200px] flex flex-col items-center">
                    <img src={usuario.foto} alt={usuario.nome}  className="rounded-full absolute -top-14 -left-14 w-[100px] h-[100px]"/>
                <span className="font-medium text-xl">{usuario.nome}</span>

            </div>
        </main>
        </>
    )
}
