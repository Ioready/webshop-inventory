import { useContext, useState } from 'react';
import apis from "./apis";
import { MainContext } from "../contexts/mainProvider";

export function usePostToWebshop() {
    const { token } = useContext(MainContext)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const update = async (url: any, body: any) => {
        try {
            setLoading(true);
            const response: any = await apis.editDataApi(url, body, token);
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { update, data, loading };
}