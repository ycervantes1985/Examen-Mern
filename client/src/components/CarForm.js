import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const CarForm = (props) => {
  const { marca, precio,rating,content, onSubmitProp } = props;

  return (
    <div>
      <Formik
        initialValues={{
          nombre: marca,
          precio:precio,
          rating:rating,
          content:content
        }}

        validationSchema={Yup.object().shape({
            marca: Yup.string()
            .min(4,"La marca es muy corta")
            .max(15,"la marca es muy larga")
            .required("Por favor ingresa una marca"),
            precio: Yup.number()
            .required("Por favor ingresa un precio"),
            rating:Yup.number(),
            content:Yup.string()
            .min(10, "El contenido de la reseña es muy corto")
            .required("Por favor ingresa el contenido de la reseña")
        })}

        onSubmit={(values,{setSubmitting})=>{
            console.log("INFO DEL FORMIK",values);
            onSubmitProp(values);
        }}

      >

        {({errors,touched,handleSubmit})=>{
            return(
              <div class="container-fluid">
	<div class="row">
		<div class="col-md-4">
		</div>
		<div class="col-md-4">
    <h2>FORMULARIO DE AUTOS</h2>
                    <Form>
                        <label htmlFor="marca" >Marca</label>
                        <Field id="marca" type="text" placeholder="Ingresa una Marca" name="marca" className="form-control" />
                        {errors.marca && touched.marca && <p> {errors.marca} </p>}

                        <label htmlFor="precio">Precio</label>
                        <Field id="precio" type="number" placeholder="Ingresa precio" name="precio" className="form-control"></Field>
                        {errors.precio && touched.precio && <p> {errors.precio} </p>}

                        <label htmlFor="rating" >Rating de la reseña</label>
                        <Field id="rating" type="number" as="select" className="form-select" name="rating">
                          <option value={1}>1 Estrella</option>
                          <option value={2}>2 Estrellas</option>
                          <option value={3}>3 Estrellas</option>
                          <option value={4}>4 Estrellas</option>
                          <option value={5}>5 Estrellas</option>
                        </Field>
                        {errors.rating && touched.rating && <p> {errors.rating} </p>}

                        <label htmlFor="content" >content</label>
                        <Field id="content" type="text" as="textarea" placeholder="Ingresa el contenido de la reseña" name="content" className="form-control" />
                        {errors.content && touched.content && <p> {errors.content} </p>}

                        <button type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0} >ENVIAR</button>
                    </Form>
                    </div>
                    <div class="col-md-4">
                    </div>
                  </div>
                </div>
                
            )
        }}


      </Formik>
    </div>
  );
};

export default CarForm;