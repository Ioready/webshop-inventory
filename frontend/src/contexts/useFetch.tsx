import { useEffect, useState, useContext } from 'react';
import { MainContext } from "../contexts/mainProvider";
import apis from "./apis";

export function useFetch(params: any) {
    const { token } = useContext(MainContext)
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response: any = await apis.getDataApi(params.url, params.query ? JSON.parse(params.query) : {}, token);
            console.log(response,"usefech");
            
            if (response) {
                setData(response);
            }
            setLoading(false);
        };
        fetchData();
    }, [params.query]);

    return { data, loading };
}