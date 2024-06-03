import { createContext, ReactNode, useState } from "react"
import { UsuarioLogin } from "../models/models.ts" 
import { login } from "../services/api.ts"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout():void
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isAuthenticated: boolean
}

interface AuthProviderProps { children: ReactNode}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}: AuthProviderProps){

    
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id:0,
        nome:"",
        usuario:"",
        senha:"",
        foto:"",
        tipo:"",
        token:""
    })

    const [isAuthenticated, setisAuthenticated] = useState(false);

    async function handleLogin(user: UsuarioLogin){

        try{
            await login(`/usuarios/logar`, user, setUsuario);

            setisAuthenticated(true);
        } catch(error){
            console.error(error);

        }
    }

    function handleLogout(){
        setisAuthenticated(false);
        setUsuario({
            id:0,
            nome:"",
            usuario:"",
            senha:"",
            foto:"",
            tipo:"",
            token:""
        })
    }


    return(
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}