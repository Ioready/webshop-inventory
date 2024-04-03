import { useContext, useState, useEffect } from 'react';
import apis from "./apis";
import { MainContext } from "../contexts/mainProvider";

export function useFetchSingle(params: any) {
    const { token } = useContext(MainContext)
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response: any = await apis.getSingleDataApi(params.url, params.query, token);
            if (response) {
                setData(response);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return { data, loading };
}