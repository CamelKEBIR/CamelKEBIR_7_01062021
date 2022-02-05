import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"

function Registration() {

  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: "",
    email:"",
    firstname:"",
    lastname:"",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().required(),
    firstname: Yup.string().min(3).max(25).required(),
    lastname: Yup.string().min(3).max(25).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
      navigate("/login")
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="loginContainer">
          <label>Pseudo: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            
            id="inputCreatePost"
            name="username"
            placeholder="JohnDoe123..."
          />&nbsp;

          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            
            id="inputCreatePost"
            name="email"
            placeholder="johndoe@groupomania.com..."
          />&nbsp;

          <label>Prenom: </label>
          <ErrorMessage name="firstname" component="span" />
          <Field
            
            id="inputCreatePost"
            name="firstname"
            placeholder="John..."
          />&nbsp;

          <label>Nom: </label>
          <ErrorMessage name="lastname" component="span" />
          <Field
            
            id="inputCreatePost"
            name="lastname"
            placeholder="Doe..."
          />&nbsp;


          <label>Mot de passe: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Mot de passe..."
          />&nbsp;

          <button type="submit">S'enregistrer
          <Link to="/login"></Link>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
