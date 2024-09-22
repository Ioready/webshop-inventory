import { useState, useContext } from 'react';
import { MainContext } from "../contexts/mainProvider";
import apis from "./apis";

export function useFetchByLoad() {
    const { token } = useContext(MainContext)
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const fetch = async (params: any) => {
        try {
            setLoading(true);
            setData(null);
            const response: any = await apis.getDataApi(params.url, params.query ? JSON.parse(params.query) : {}, token);
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    const fetchById = async (params: any) => {
        try {
            setLoading(true);
            setData(null);
            const response: any = await apis.getDataApiById(params.url, token);
            if (response) {
                setData(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    return { fetch, data, loading, fetchById };
}