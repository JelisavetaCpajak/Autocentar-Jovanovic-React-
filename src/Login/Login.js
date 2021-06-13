import React, { Component } from "react";
import Input from "../UI/Input/Input";
// import Button from "../UI/Button/Button";
import classes from "./Login.css";
import axios from "../axios";
import { connect } from "react-redux";
import * as actionTypes from "../store/action";
import {
  Typography,
  Paper,
  Button,
  Grid,
  CssBaseline,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  CardMedia,
} from "@material-ui/core";

import HomePage from "../HomePage/HomePage";

class Login extends Component {
  state = {
    loginForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Korisnicko ime",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Lozinka",
        },
        value: "",

        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: true,
    loading: false,
    ulogovan: false,
  };

  componentDidMount() {
    console.log("state iz reducer-a: ", this.props);
    this.ucitajKlijenteHandler();
    this.ucitajZapisnikeHandler();
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedForm = {
      ...this.state.loginForm,
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    //console.log(updatedFormElement);

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    //console.log(formIsValid);
    this.setState({ loginForm: updatedForm, formIsValid: formIsValid });
  };

  ucitajKlijenteHandler = () => {
    let url = "/klijent/";
    axios
      .get(url)
      .then((response) => {
        //odg iz baze

        if (response.data.length == 0) {
          //alert("U bazi ne postoje klijenti");
          console.log("response.data je prazan");
        } else {
          this.props.ucitajKlijente(response.data); //saljem niz klijenata reducer-u
          console.log("RESPONSE IZ BAZE(klijenti): ", response.data);
        }
      })
      .catch((error) => {
        alert("Greska pri povezivanju na bazu!");
      });
  };

  ucitajZapisnikeHandler = () => {
    let url = "/zapisnik.OTehnickomPregledu/";
    axios
      .get(url)
      .then((response) => {
        //odg iz baze

        if (response.data.length == 0) {
          //alert("U bazi ne postoje zapisnici");
          console.log("response.data je prazan");
        } else {
          this.props.ucitajZapisnike(response.data); //saljem niz klijenata reducer-u
          console.log("RESPONSE IZ BAZE(zapisnici): ", response.data);
        }
      })
      .catch((error) => {
        alert("Greska pri povezivanju na bazu!");
      });
  };

  loginHandler = (event) => {
    event.preventDefault();
    //console.log(this.state.loginForm);
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.loginForm) {
      formData[formElementIdentifier] = this.state.loginForm[
        formElementIdentifier
      ].value;
    }
    const user = {
      name: this.state.loginForm.name.value,
      password: this.state.loginForm.password.value,
    };
    // if (user.name === "" || user.password === "") {
    //   return <Alert severity="error">Stavka ne sme imati prazna polja!</Alert>;
    // }
    console.log(user);
    if (user.name === "" || user.password === "") {
      alert("Morate uneti username i password!");
    } else {
      let url = "/zaposleni/" + user.name + "/" + user.password + "/";
      axios
        .get(url)
        .then((response) => {
          // this.setState({ loading: false });
          // this.props.history.push("/");
          //odavde treba da me odvede na pocetnu str
          console.log("RESPONSE IZ BAZE: ", response);
          if (response.data.length == 0)
            alert("Uneli ste pogresno korisnicko ime ili lozinku!");
          else {
            this.props.onLogIn(response.data);

            console.log("state iz reducer-a: ", this.props);
            this.setState({ ulogovan: true });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
    }
  };

  render() {
    const formElemetsArray = [];
    for (let key in this.state.loginForm) {
      formElemetsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }
    console.log("zaposleni: ", formElemetsArray);

    let form = null;
    if (this.state.ulogovan) {
      form = (
        <HomePage
          klijenti={this.props.klijenti}
          zapisnici={this.props.zapisnici}
        />
      );
    } else {
      form = (
        <div style={{ padding: 16, margin: "auto", maxWidth: 1000 }}>
          <CssBaseline />
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            PRIJAVA NA SISTEM
          </Typography>

          <form noValidate>
            <Paper style={{ padding: 16 }}>
              <CardMedia
                style={{ height: "45vh", marginTop: "7vh" }}
                image="logo.png"
                title="Logo"
              />
              <Grid container alignItems="flex-start" spacing={2}>
                {formElemetsArray.map((formElemet) => (
                  <Grid item xs={12}>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      type={formElemet.config.elementConfig.type}
                      label={formElemet.config.elementConfig.placeholder}
                      fullWidth
                      name={formElemet.config.elementConfig.placeholder}
                      value={this.state.ime_prezime_klijenta}
                      onChange={(event) =>
                        this.inputChangedHandler(event, formElemet.id)
                      }
                    />
                    <br />
                  </Grid>
                ))}
                <Grid item style={{ marginTop: 16, marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!this.state.formIsValid}
                    onClick={this.loginHandler}
                  >
                    PRIJAVI SE
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </div>
      );
    }

    return <div className={classes.ContactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    fullUser: state.fullUser,
    klijenti: state.klijenti,
    zapisnici: state.zapisnici,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogIn: (userFromDb) =>
      dispatch({ type: actionTypes.LOGIN, user: userFromDb }),
    ucitajKlijente: (klijenti) =>
      dispatch({ type: actionTypes.UCITAJ_KLIJENTE, klijenti: klijenti }),
    ucitajZapisnike: (zapisnici) =>
      dispatch({ type: actionTypes.UCITAJ_ZAPISNIKE, zapisnici: zapisnici }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
