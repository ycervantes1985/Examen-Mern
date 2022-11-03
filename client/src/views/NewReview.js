import React , {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { simpleGet } from '../services/simpleGet';
import { useNavigate } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import { simplePost } from '../services/simplePost';

const NewReview = () => {

    const {idCar} = useParams();
    const [car, setCar] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getCar()
     }, []);
 
     const getCar = async() => {
         const response = await simpleGet("http://localhost:8000/api/cars/"+idCar)
         setCar(response.data.car);
     }

     const agregarReview = async(values)=>{
        console.log("VALUES DE FORMULARIO DENUEVA RESEÑA",values);
        const valuesFinal = {...values,idCar:idCar};
        const response = await simplePost("http://localhost:8000/api/reviews/new",valuesFinal);
        navigate("/")
     }

    return (
        <div>
            <h3>Agregando resña para auto de id: {idCar} </h3>
            <h4>Marca Auto: {car?.marca} </h4>
            <h4>Precio Auto: $ {car?.precio} </h4>
            <button onClick={()=>navigate("/")} >VOLVER</button>
            <ReviewForm rating={1} content="" onSubmitProp={agregarReview}></ReviewForm>
        </div>
    );
}

export default NewReview;
