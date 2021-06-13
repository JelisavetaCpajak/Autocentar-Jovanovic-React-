import React from "react";

import { Form } from "react-final-form";
import axios from "../../axios";

import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  RadioGroup,
  FormControl,
  FormControlLabel,
  AppBar,
  Toolbar,
  Radio,
  TextField,
  ListItemIcon,
  MenuItem,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import Alert from "@material-ui/lab/Alert";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  }
  return errors;
};

const mystyle = {
  color: "black",
  backgroundColor: "white",
  padding: "10px",
  textAlign: "center",
  textDecoration: "none",
  margin: "auto",
  width: "50%",
};

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class KreirajKlijenta extends Component {
  // public jmbg: string,
  // public broj_lk: string,
  // public datum_vazenja_lk_klijenta: Date,
  // public ime_prezime_klijenta: string,
  // public adresa_klijenta: string,
  // public ime_firme: string,
  // public pib: string,
  // public adresa_firme: string,
  state = {
    fizicko: false,
    pravno: false,
    datum_vazenja_lk_klijenta: new Date(),
    broj_lk: "",
    ime_prezime_klijenta: "",
    jmbg: "",
    adresa_klijenta: "",
    ime_firme: "",
    pib: "",
    adresa_firme: "",
    neuspesno: false,
  };

  setVrstaLica = (event) => {
    let val = event.target.value;

    if (val === "fizicko") {
      this.setState({ fizicko: true, pravno: false });
    } else {
      this.setState({ pravno: true, fizicko: false });
    }
  };

  handleChangeDatumVazenjaLK = (date) => {
    // console.log("datum: ", date.getTime());
    let dan = date.getDate();
    let mesec = date.getMonth() + 1;
    let godina = date.getFullYear();
    let dat = new Date(dan, mesec, godina);

    dat.setFullYear(godina);
    dat.setMonth(mesec);
    dat.setDate(dan);
    console.log("datum-dan: ", dan, "; mesec: ", mesec, "; godina: ", godina);
    // console.log("novi format datuma: ", dat.toJSON().split("T")[0]);
    dat = dat.toJSON().split("T")[0];
    this.setState({ datum_vazenja_lk_klijenta: dat });
  };

  handleChangeImePrezime = (e) => {
    let val = e.target.value;
    this.setState({ ime_prezime_klijenta: val });
  };

  handleChangeJMBG = (e) => {
    let val = e.target.value;
    this.setState({ jmbg: val });
  };

  handleChangeBrojLK = (e) => {
    let val = e.target.value;
    this.setState({ broj_lk: val });
  };

  handleChangeAdresaKlijenta = (e) => {
    let val = e.target.value;
    this.setState({ adresa_klijenta: val });
  };

  handleChangeImeFirme = (e) => {
    let val = e.target.value;
    this.setState({ ime_firme: val });
  };

  handleChangePib = (e) => {
    let val = e.target.value;
    this.setState({ pib: val });
  };

  handleChangeAdresaFirme = (e) => {
    let val = e.target.value;
    this.setState({ adresa_firme: val });
  };

  onSubmit = (event) => {
    //uzme podatke iz state-a i salje ih u redux, preko mapPropsToDispatch
    event.preventDefault();
    let klijent = {
      datum_vazenja_lk_klijenta: this.state.datum_vazenja_lk_klijenta,
      broj_lk: this.state.broj_lk,
      ime_prezime_klijenta: this.state.ime_prezime_klijenta,
      jmbg: this.state.jmbg,
      adresa_klijenta: this.state.adresa_klijenta,
      ime_firme: this.state.ime_firme,
      pib: this.state.pib,
      adresa_firme: this.state.adresa_firme,
    };
    console.log("tip datuma: ", typeof klijent.datum_vazenja_lk_klijenta);
    console.log("klijent koji se salje: ", klijent);
    let url = "/klijent/";
    //provera da li ima praznih polja
    if (this.state.fizicko) {
      if (
        this.state.ime_prezime_klijenta === "" ||
        this.state.jmbg === "" ||
        this.state.broj_lk === "" ||
        this.state.adresa_klijenta === ""
      ) {
        this.setState({ neuspesno: true });
      } else {
        axios
          .post(url, {
            headers: {},
            data: {
              klijent: { ...klijent },
            },
          })
          .then((res) =>
            //kad ovo uspe, onda  this.props.stavke treba da bude null
            //this.props.stavke=null
            {
              this.setState({
                ime_prezime_klijenta: "",
                jmbg: "",
                broj_lk: "",
                adresa_klijenta: "",
                datum_vazenja_lk_klijenta: null,
              });
              console.log("uspesno kreiran klijent!");
              console.log("res: ", res);
            }
          )
          .catch((error) => {
            <Alert severity="error">Neuspesno cuvanje klijenta!</Alert>;
            console.log("Neuspesno cuvanje klijenta!; greska: ", error);
          });
      }
    }
    if (this.state.pravno) {
      if (
        this.state.ime_firme === "" ||
        this.state.pib === "" ||
        this.state.adresa_firme === ""
      ) {
        this.setState({ neuspesno: true });
      } else {
        axios
          .post(url, {
            headers: {},
            data: {
              klijent,
            },
          })
          .then((res) =>
            //kad ovo uspe, onda  this.props.stavke treba da bude null
            //this.props.stavke=null
            {
              this.setState({ ime_firme: "", pib: "", adresa_firme: "" });
              console.log("uspesno kreiran klijent!");
              console.log("res: ", res);
            }
          )
          .catch((error) => {
            <Alert severity="error">Neuspesno cuvanje klijenta!</Alert>;
            console.log("Neuspesno cuvanje klijenta!; greska: ", error);
          });
      }
    }
  };

  resetujFormu = () => {
    if (this.state.fizicko) {
      this.setState({
        fizicko: true,
        pravno: false,
        datum_vazenja_lk_klijenta: new Date(),
        broj_lk: "",
        ime_prezime_klijenta: "",
        jmbg: "",
        adresa_klijenta: "",
        ime_firme: "",
        pib: "",
        adresa_firme: "",
      });
    } else {
      this.setState({
        fizicko: false,
        pravno: true,
        datum_vazenja_lk_klijenta: new Date(),
        broj_lk: "",
        ime_prezime_klijenta: "",
        jmbg: "",
        adresa_klijenta: "",
        ime_firme: "",
        pib: "",
        adresa_firme: "",
      });
    }
  };

  render() {
    let forma = null;

    if (this.state.fizicko) {
      forma = (
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Ime i prezime"
              variant="outlined"
              value={this.state.ime_prezime_klijenta}
              onChange={(event) => this.handleChangeImePrezime(event)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="JMBG"
              onChange={(event) => this.handleChangeJMBG(event)}
              value={this.state.jmbg}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Broj licne karte"
              onChange={(event) => this.handleChangeBrojLK(event)}
              value={this.state.broj_lk}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Datum vazenja licne karte"
                value={this.state.datum_vazenja_lk_klijenta}
                onChange={this.handleChangeDatumVazenjaLK}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Adresa"
              onChange={(event) => this.handleChangeAdresaKlijenta(event)}
              value={this.state.adresa_klijenta}
            />
          </Grid>
        </Grid>
      );
    } else if (this.state.pravno) {
      forma = (
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Naziv firme"
              onChange={(event) => this.handleChangeImeFirme(event)}
              value={this.state.ime_firme}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="PIB"
              onChange={(event) => this.handleChangePib(event)}
              value={this.state.pib}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              label="Adresa firme"
              onChange={this.handleChangeAdresaFirme}
              value={this.state.adresa_firme}
            />
          </Grid>
        </Grid>
      );
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <StyledMenuItem>
              <ListItemIcon>
                <NavLink to="/homePage" style={mystyle}>
                  <ListItemIcon>
                    <KeyboardArrowLeftIcon fontSize="small" />
                  </ListItemIcon>
                </NavLink>
              </ListItemIcon>
            </StyledMenuItem>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 16, margin: "auto", maxWidth: 1000 }}>
          <CssBaseline />
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            KREIRANJE KLIJENTA
          </Typography>

          <Form
            initialValues={{ employed: true, stooge: "larry" }}
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form noValidate>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <RadioGroup row onChange={this.setVrstaLica}>
                          <FormControlLabel
                            value="fizicko"
                            label="Fizicko lice"
                            control={<Radio />}
                          />
                          <FormControlLabel
                            value="pravno"
                            label="Pravno lice"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid style={{ width: "100%", marginBottom: "10" }}>
                      {this.state.neuspesno ? (
                        <Alert severity="error">
                          Sva polja moraju biti popunjena!
                        </Alert>
                      ) : null}
                    </Grid>
                    {forma}
                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                      <Grid item style={{ marginTop: 16, marginLeft: "auto" }}>
                        <Button
                          type="button"
                          variant="contained"
                          onClick={this.resetujFormu}
                          disabled={submitting || pristine}
                        >
                          Odustani
                        </Button>
                      </Grid>
                      <Grid item style={{ marginTop: 16, marginRight: "auto" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={submitting}
                          onClick={this.onSubmit}
                        >
                          Sacuvaj klijenta
                        </Button>
                      </Grid>
                    </div>
                  </Grid>
                </Paper>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default KreirajKlijenta;
