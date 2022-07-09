import { useCallback, useEffect, useState } from "react";

interface BaseProps{
    path:string,
    start:boolean
}

type GetProps = {
    method:"GET"|"HEAD",
    data?:never
}

type PostProps = {
    method:"POST"|"DELETE"|"PUT",
    data:object
}

type ConditionalProps = GetProps | PostProps;

type Props = BaseProps & ConditionalProps;

type FetchReturn<T> = [
    data:T|undefined,
    loading:boolean,
    refresh:()=>void,
    statusCode:number
]

function getUrl(relative:string)
{
    // eslint-disable-next-line
    const urlExpression = "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)";
    const regex = new RegExp(urlExpression);

    if (relative.match(regex)) {
        return relative;
    }

    var mainURL = process.env.REACT_APP_API_ENDPOINT;
    if(mainURL === undefined) return "";
    if(mainURL.charAt(mainURL.length - 1) !== "/") mainURL += "/";
 
    if(relative.length > 0 && relative.charAt(0) === "/") relative = relative.substring(1, relative.length);

    return mainURL + relative;
}

export function useFetch<T>({path, method, data, start}:Props):FetchReturn<T>
{
    const [result,setResult] = useState<T>()
    const [loading,setLoading] = useState(false);
    const [statusCode, setCode] = useState(-1);

    const fetchData = useCallback(async () => {
        if(loading){return;}

        setLoading(true);

        const staticURL = getUrl(path);

        var response:Response|null = null;

        if(data !== undefined){
            response = await fetch(staticURL, {
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(data),
                method:method
            });
        }
        else
        {
            response = await fetch(staticURL,{
                headers:{"Content-Type":"application/json"},
                method:method
            });
        }

        setCode(response.status);

        try {  
            const text = await response.text();  
            const data = JSON.parse(text);  
            setResult(data);
        } catch (err) {  
            setResult(undefined);
        } 

        setLoading(false);
    },[data, loading, statusCode]);
    
    useEffect(()=>{
        if(start){fetchData();}
    },[fetchData, start]);

    const refresh = () => {
        fetchData();
    }

    return ([result, loading, refresh, statusCode]);
}

export function useGet<T>({path, start}:BaseProps):FetchReturn<T>
{
    return useFetch<T>({path, method:"GET", start});
}

export function usePost<T>({path, start, data}:BaseProps & PostProps):FetchReturn<T>
{
    const fetchResult = useFetch<T>({path, method:"POST", start, data});
    return fetchResult;
}