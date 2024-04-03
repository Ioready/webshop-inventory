import { createContext, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import { Languages } from "../common";
import { useStorage } from "./useStorage";
import apis from "./apis";

interface MainContextProps {
    labels: any,
    isLoading: boolean,
    token: any,
    user: any,
    login: (params: object) => Promise<void>,
    logout: () => Promise<void>,
    sidebar: boolean,
    setSidebar: (values: any) => Promise<void>,
}

export const MainContext = createContext<MainContextProps>({
    labels: {},
    isLoading: false,
    token: null,
    user: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    sidebar: false,
    setSidebar: () => Promise.resolve(),
})

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
    const [labels] = useState<any>({ ...Languages })
    const [isLoading, setIsLoading] = useState<any>(false)
    const [token, setToken] = useStorage('token')
    const [user, setUser] = useStorage('user')
    const [sidebar, setSidebar] = useState<any>(false)

    const loginPress = async (params: any) => {
        setIsLoading(true)
        const response: any = await apis.login(params);
        if (response) {
            setToken(`Bearer ${response?.token}`)
            setUser(response)
        }
        setIsLoading(false)
    }
    const logout = async () => {
        await apis.logout();
        setToken(null)
        setUser(null)
        setUser(null)
    }
    const handleSidebar = async (value: any) => {
        return setSidebar(value)
    }

    return (
        <MainContext.Provider value={{ labels, isLoading, token, user, login: loginPress, logout, sidebar, setSidebar: handleSidebar }}>
            {children}
        </MainContext.Provider>
    )
}