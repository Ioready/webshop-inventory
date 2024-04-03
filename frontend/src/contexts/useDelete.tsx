import { useContext, useState } from 'react';
import apis from "./apis";
import { MainContext } from "../contexts/mainProvider";

export function useDelete() {
    const { token } = useContext(MainContext)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const remove = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await apis.deleteDataApi(url, body, token);
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { remove, data, loading };
}