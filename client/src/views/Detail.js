import React, { useEffect, useState } from 'react';
import {useParams,useNavigate,Link} from "react-router-dom"
import { simpleGet } from '../services/simpleGet';

const Detail = () => {

    const {id} = useParams()

    const navigate = useNavigate();
    const [car, setCar] = useState();
    const [reviews, setReviews] = useState();

    useEffect(() => {
        getCar()
    }, []);

    const getCar = async() => {
        const response = await simpleGet("http://localhost:8000/api/cars/"+id)

        setCar(response.data.car);
    }

    useEffect(() => {
       if(car){
         getReviews()
       }
    }, [car]);

    console.log(car)

    const getReviews = async() => {
        const response = await simpleGet("http://localhost:8000/api/reviews/"+id) 
        console.log(id)  
             
        if(response.data.message===""){
            setReviews(response.data.reviews)
            console.log(response.data.reviews);
        }
    }

    useEffect(() => {
       console.log("LAS REVIEWS",reviews);
    }, [reviews]);

    return (
        <div>
            <h3>Detalle de Auto id: {id} </h3>
            <h4>Marca del Auto {car?.marca} </h4>
            <h4>Precio: $ {car?.precio} </h4>
            <Link to={"/cars/edit/"+id}>EDITAR AUTO</Link>
            <button onClick={()=>navigate("/")} >VOLVER</button>
            <h2>LISTADO DE RESEÑAS DEL AUTO</h2>
            {reviews?.map((review,index)=>{
                return(<>
                <div className='review'>
                    <h4> Rating de la review {review.rating}</h4>
                    <h4>Contenido: {review.content} </h4>
                    <h5>Usuario creador: {review.creatorName} </h5>
                </div>
                <hr></hr>
                </>)
            })}
            
        </div>
    );
}

export default Detail;