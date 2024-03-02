import {useState} from "react";


export default function usePost(url: string, data: any) {
    const [responseData, setResponseData] = useState<string | null>(null);
    (async() => {
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        const jsonData = await response.json();
        setResponseData(jsonData);

    } )();
    return {responseData};
}