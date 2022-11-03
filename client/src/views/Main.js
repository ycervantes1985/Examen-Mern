import React, { useEffect, useState } from "react";
import CarForm from "../components/CarForm";
import { simpleGet } from "../services/simpleGet";
import { simplePost } from "../services/simplePost";
import { Link } from "react-router-dom";
import { simpleDelete } from "../services/simpleDelete";
import { useNavigate } from "react-router-dom";



function Main() {
    const [cars, setCars] = useState();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCars();
      }, []);

      const getCars = async () => {
        const response = await simpleGet("http://localhost:8000/api/cars");
        setCars(response.data.cars);
    };

    useEffect(() => {
        if(cars)
        console.log(cars)
    }, [cars]);

      const crearCar = async (values) => {
        console.log("VALORES DESDE FORMIK, EN VISTA MAIN", values);
        const response = await simplePost("http://localhost:8000/api/cars/new",values);
        console.log(response)
        if (response.data.message === "") {
            setCars([...cars, response.data.cars]);
        } else {
          console.log("ERRORES", response.data);
          const errorResponse = response.data.errors;
          console.log("Object keys", Object.keys(errorResponse));
          const errorArr = [];
          for (const llave of Object.keys(errorResponse)) {
            console.log(errorResponse[llave]);
            errorArr.push(errorResponse[llave].message);
          }
          setErrors(errorArr);
        }

        
      };

      const eliminarCar = async (id) => {
        const response = await simpleDelete(
          "http://localhost:8000/api/cars/delete/" + id
        );
        setCars(cars.filter((car) => car._id !== id));
        getCars()
      };
    

  return (
    <div>
        {errors?.map((error, index) => (
        <p key={index}>ERROR: {error} </p>
      ))}
      <CarForm
        marca=""
        precio=""
        onSubmitProp={crearCar}
      ></CarForm>
        <div class="row">
            <div className="col-md-12">
            <h3>TODOS LOS PRODUCTOS</h3>
            <ul>
                {cars?.map((autos)=>(
                    <li key={autos._id}>
                        <p>Hola {autos.marca}</p>
                        {/* <Link to={`/cars/${autos._id}`}>{autos.marca} - ${autos._id}</Link> */}
                        <button className='btn btn-danger' onClick={() => eliminarCar(autos._id)}>ELIMINAR</button>
                        <button className='btn btn-warning' onClick={()=>navigate("/cars/add-review/"+autos._id)}>AÑADIR RESEÑA</button>
                    </li>
                ))}
            </ul>
            </div>
	    </div>

      

    </div>
  )
}

export default Main