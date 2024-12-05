import { useLocation } from "react-router-dom";

export function useGetParams(key: string){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(key);
}

export function useGetQueryParams() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    return queryParams;
}