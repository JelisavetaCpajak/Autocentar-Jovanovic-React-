import React, { Component } from "react";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  AppBar,
  Toolbar,
  ListItemIcon,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { connect } from "react-redux";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../axios";

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

class IzmeniKlijenta extends Component {
  state = {
    id_klijenta: this.props.klijentZaIzmenu.id_klijenta,
    ime_prezime_klijenta: this.props.klijentZaIzmenu.ime_prezime_klijenta,
    jmbg: this.props.klijentZaIzmenu.jmbg,
    broj_lk: this.props.klijentZaIzmenu.broj_lk,
    datum_vazenja_lk_klijenta: this.props.klijentZaIzmenu
      .datum_vazenja_lk_klijenta,
    adresa_klijenta: this.props.klijentZaIzmenu.adresa_klijenta,
    ime_firme: this.props.klijentZaIzmenu.ime_firme,
    pib: this.props.klijentZaIzmenu.pib,
    adresa_firme: this.props.klijentZaIzmenu.adresa_firme,
  };

  componentDidMount() {
    console.log("klijent za izmenu: ", this.state);
  }

  handleChangeDatumVazenjaLK = (date) => {
    // console.log("datum: ", date.getTime());
    let dan = date.getDate();
    let mesec = date.getMonth() + 1;
    let godina = date.getFullYear();
    let dat = new Date();

    dat.setFullYear(godina);
    dat.setMonth(mesec - 1);
    dat.setDate(dan);
    console.log("datum-dan: ", dan, "; mesec: ", mesec, "; godina: ", godina);
    // console.log("novi format datuma: ", dat.toJSON().split("T")[0]);
    dat = dat.toJSON().split("T")[0];
    console.log("datum: ", dat);
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

  sacuvajIzmene = () => {
    console.log("klijent koji sa izmenama: ", this.state);

    //  pravim axios post req koji prosledjuje celog klijenta
    // this.state.datum_vazenja_lk_klijenta = null;
    let klijent = {
      id_klijenta: this.state.id_klijenta,
      ime_prezime_klijenta: this.state.ime_prezime_klijenta,
      jmbg: this.state.jmbg,
      broj_lk: this.state.broj_lk,
      datum_vazenja_lk_klijenta: this.state.datum_vazenja_lk_klijenta,
      adresa_klijenta: this.state.adresa_klijenta,
      ime_firme: this.state.ime_firme,
      pib: this.state.pib,
      adresa_firme: this.state.adresa_firme,
    };
    let url = "/klijent/izmena/";
    axios
      .put(url, {
        headers: {},
        data: {
          klijent,
        },
      })
      .then((res) => {
        console.log("uspesna izmena klijenta!");
      })
      .catch((err) => {
        console.log("greska pri izmeni: ", err);
        // alert(err);
      });
  };

  render() {
    let forma = null;
    if (this.props.klijentZaIzmenu.ime_prezime_klijenta !== "") {
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
    } else {
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
                <NavLink to="/pretraziKlijenta" style={mystyle}>
                  <ListItemIcon>
                    <KeyboardArrowLeftIcon fontSize="small" />
                  </ListItemIcon>
                </NavLink>
              </ListItemIcon>
            </StyledMenuItem>
          </Toolbar>
        </AppBar>
        <div>
          <CssBaseline
            style={{ padding: 16, margin: "auto", maxWidth: 1000 }}
          />
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            IZMENA KLIJENATA
          </Typography>
          {forma}{" "}
          <div style={{ marginTop: 8 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: 8 }}
              onClick={this.sacuvajIzmene}
            >
              sacuvaj izmene
            </Button>
            <Link to="/pretraziKlijenta">
              <Button variant="contained" color="primary" type="submit">
                odustani
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    klijentZaIzmenu: state.klijentZaIzmenu,
  };
};

export default connect(mapStateToProps)(IzmeniKlijenta);
