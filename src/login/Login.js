import * as React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import "./Login.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Mandatory"),
  password: Yup.string().required("Password is Mandatory"),
});

const LoginForm = (props) => (
  <div className="container">
    <fieldset>
      <legend>Login</legend>
      <Form>
        <div className="row justify-content-start">
          <div className="col-lg-2 text-center p-3">
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
          </div>
          <div className="col-lg-2 text-center p-3">
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
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
              className="login__btn"
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </fieldset>
  </div>
);
const Login = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
          alert(JSON.stringify(values));
        }, 500);
      }}
      component={LoginForm}
    ></Formik>
  );
};
export default Login;
