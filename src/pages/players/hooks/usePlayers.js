import {useEffect, useState} from "react";
import axiosInstance from "../../../api/axiosInstance";


export const usePlayers = () => {
    const [players, setPlayers] = useState();

    useEffect(() => {
        axiosInstance.get('http://localhost:3004/players' ).then(response => setPlayers(response.data))
    }, []);
    return {players, setPlayers};
}
