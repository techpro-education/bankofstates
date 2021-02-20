import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router";
import { Autocomplete } from "@material-ui/lab";
import { TextField as FormikTextField } from "formik-material-ui";
import TextField from "@material-ui/core/TextField";
import service from "../service/bankService";
import AccountInfo from "../account/AccountInfo";
import Transactions from "../account/Transactions";
import Divider from "@material-ui/core/Divider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/typographyStyle.js";

const useStyles = makeStyles(styles);

const TransferSchema = Yup.object().shape({
  recipientName: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
});

let recipients;
let classes;

const TransferForm = (props) => (
  <div className="container">
    <fieldset>
      <legend>Transfer</legend>
      <Form>
        <div className="row justify-content-start">
          <div className="col-lg-4 text-center p-3">
            <Autocomplete
              className={classes.formControl}
              id="recipient"
              name="recipientName"
              options={recipients}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              onChange={(e, value) => {
                props.setFieldValue(
                  "recipientName",
                  value !== null ? value.name : ""
                );
              }}
              renderInput={(params) => (
                <TextField label="Recipient" name="recipientName" {...params} />
              )}
            />
          </div>
          <div className="col-lg-4 text-center p-3">
            <Field
              component={FormikTextField}
              id="amount"
              name="amount"
              type="number"
              label="Amount"
            />
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-lg-8 text-center p-3">
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
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </fieldset>
  </div>
);

const Transfer = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const history = useHistory();
  classes = useStyles();
  if (userInfo?.user?.recipients) {
    recipients = userInfo.user.recipients;
  }
  return (
    <div>
      {!userInfo && history.push("/login")}
      {userInfo && userInfo.user && (
        <div>
          <AccountInfo />
          <div>
            <Formik
              initialValues={{
                recipientName: "",
                amount: null,
              }}
              validationSchema={TransferSchema}
              onSubmit={(values, actions) => {
                service.transfer(values).then((response) => {
                  if (response.status === 200) {
                    const userInfo = response.data;
                    if (userInfo.success) {
                      dispatch({
                        type: "UPDATE",
                        item: userInfo,
                      });
                      toast.success(userInfo.message, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      actions.resetForm();
                    } else {
                      toast.error(userInfo.message, {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }
                  }
                });
                actions.setSubmitting(false);
              }}
              component={TransferForm}
            ></Formik>
            <ToastContainer />
          </div>
          <Divider />
          <h1 className={classes.infoText}>Transactions</h1>
          <Transactions />
        </div>
      )}
    </div>
  );
};

export default Transfer;
