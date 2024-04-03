import { useContext, useState } from 'react';
import apis from "./apis";
import { MainContext } from "../contexts/mainProvider";

export function usePostFile() {
    const { token } = useContext(MainContext)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const create = async (url: any, file: any) => {
        try {
            setLoading(true);
            const response: any = await apis.fileUploadApi(url, file, token);
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { create, data, loading };
}