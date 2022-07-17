import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";



const FullPizza = () => {
    const [pizza, setPizza] = React.useState()
    const {id} = useParams();
    const navigate = useNavigate();
    React.useEffect(()=> {
        async function fetchPizza(){
            try {
                const {data} = await axios.get(`https://62b089f0196a9e987025fbef.mockapi.io/items/` + id)
                setPizza(data)
            } catch (error) {
                console.log(error)
                navigate("/")
            }

        }
        fetchPizza()
    }, [])

    if(!pizza){
        return(
            <div>Загрузка</div>
        )
    }

    return(
        <div>
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <p>{pizza.price}</p>
        </div>
    )
}
export default FullPizza;