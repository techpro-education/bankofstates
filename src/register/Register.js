import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import "./Register.css";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  dob: Yup.string().required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string().email("Invalid email").required("Required"),
});

const RegistrationForm = (props) => (
  <div className="container">
    <fieldset>
      <legend>Register</legend>
      <Form>
        <div className="row justify-content-start">
          <div className="col-lg-2 text-center padding-left-20">
            <Field
              component={TextField}
              name="firstName"
              type="text"
              label="First Name"
            />
          </div>
          <div className="col-lg-2 text-center p-3">
            <Field
              component={TextField}
              name="lastName"
              type="text"
              label="Last Name"
            />
          </div>
        </div>
        <div className="row justify-content-start p-3">
          <div className="col-lg-2">
            <Field
              component={TextField}
              name="dob"
              type="date"
              label="Date Of Birth"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="col-lg-2">
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-lg-2 p-3">
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
          </div>
          <div className="col-lg-2 p-3">
            <Field
              component={TextField}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
            />
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-lg-12 text-center">
            {props.isSubmitting && <LinearProgress />}
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-lg-4 text-center p-3">
            <Button
              variant="contained"
              color="primary"
              disabled={props.isSubmitting}
              onClick={props.submitForm}
              className="register__btn"
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </fieldset>
  </div>
);

const Register = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
          alert(JSON.stringify(values));
        }, 500);
        actions.resetForm();
      }}
      component={RegistrationForm}
    ></Formik>
  );
};

export default Register;
