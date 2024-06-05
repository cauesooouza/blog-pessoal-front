import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.API_URL
});

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const publicarPostagem = async (url: string, dados: Object, config: AxiosRequestConfig): Promise<void> => {
    try {
        await api.post(url, dados, config);
    } catch (error) {
        console.error(error);
    }
}

export const publicarTema = async (url: string, dados: Object, config: AxiosRequestConfig): Promise<void> => {
    try {
        await api.post(url, dados, config);
    } catch (error) {
        console.error(error);
    }
}

export const deleteTema = async (url: string, config: AxiosRequestConfig): Promise<void> => {
    try {
        await api.delete(url, config);
    } catch (error) {
        console.error(error);
    }
}

export const deletePost = async (url: string, config: AxiosRequestConfig): Promise<void> => {
    return await api.delete(url, config);
}