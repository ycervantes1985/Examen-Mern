import React, { useEffect, useState } from 'react';
import {useParams,useNavigate} from "react-router-dom"
import CarForm from '../components/CarForm';
import { simpleGet } from '../services/simpleGet';
import { simplePut } from '../services/simplePut';

const Update = () => {

    const {id} = useParams()
    const navigate = useNavigate();
    const [car, setCar] = useState();

    useEffect(() => {
        getCar()
    }, []);

    const getCar = async() => {
        const response = await simpleGet("http://localhost:8000/api/cars/"+id)
        setCar(response.data.car);
    }

    const editarCar = async(values) => {
        const response = await simplePut("http://localhost:8000/api/cars/update/"+id,values)
        navigate("/");
    }


    return (
        <div>
            <h2>Actualizar auto de id: {id} </h2>
            {car && <CarForm nombre={car.marca} precio={car.precio} onSubmitProp={editarCar}></CarForm>}
            
        </div>
    );
}

export default Update;
