import React, { Component } from "react";
import axios from "../../axios";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  InputLabel,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
import IzmeniKlijenta from "../IzmeniKlijenta/IzmeniKlijenta";

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

class PretraziKlijenta extends Component {
  state = {
    kriterijum: "",
    listaKlijenataPoKrit: [],
  };

  // public jmbg: string,
  // public broj_lk: string,
  // public datum_vazenja_lk_klijenta: Date,
  // public ime_prezime_klijenta: string,
  // public adresa_klijenta: string,
  // public ime_firme: string,
  // public pib: string,
  // public adresa_firme: string,

  handleChangeKriterijum = (val) => {
    this.setState({ kriterijum: val });
  };

  pretraziPoKrit = (event) => {
    event.preventDefault();
    let url = "/klijent/ime/" + this.state.kriterijum + "/";
    let lista = [];
    axios
      .get(url)
      .then((res) => {
        if (res.data.length == 0) {
          console.log("nema klijenata po zadatom krit"); //baci alert ovde
        } else {
          //vracena je lista klijenata iz baze
          console.log("lista klijenata: ", res.data);
          res.data.map((kl) => {
            lista.push(kl);
          });
          this.setState({ listaKlijenataPoKrit: lista });
        }
      })
      .catch((err) => {
        console.log("Greska pri ucitavanju klijenata po kriterijumu.");
      });
  };

  obrisiKlijenta = (klijent) => {
    let klijentID = klijent.id_klijenta;
    let url = "/klijent/obrisi/" + klijentID + "/";
    let lista = this.state.listaKlijenataPoKrit;
    lista.map((kl) => {
      if (kl.id_klijenta === klijentID) {
        let index = lista.indexOf(kl);
        lista.splice(index, 1);
      }
    });
    //  ovde treba da se on izbaci iz listeKlijenata
    this.setState({ listaKlijenataPoKrit: lista });
    axios
      .delete(url)
      .then((res) => {
        console.log("izbrisan klijent: ", klijent);
      })
      .catch((err) => {
        console.log("greska pri brisanju trazenog klijenta: ", err);
        alert("Neuspesno brisanje klijenta!");
      });
  };

  setujKlijentaZaIzmenu = (klijent) => {
    console.log("idKlijenta za izmenu: ", klijent.id_klijenta);
    // this.props.setKlijentZaIzmenu(klijent);
  };

  render() {
    let tabela = null;
    if (this.state.listaKlijenataPoKrit.length != 0) {
      tabela = (
        <TableContainer
          component={Paper}
          style={{ marginTop: 30, marginRight: "auto" }}
        >
          <Table
            style={{ minWidth: "650" }}
            size="small"
            aria-label="a dense table"
          >
            <TableBody>
              {this.state.listaKlijenataPoKrit.map((kl) => {
                if (kl.ime_prezime_klijenta != "") {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Klijent: {kl.ime_prezime_klijenta}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Broj licne karte: {kl.broj_lk}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={() => this.obrisiKlijenta(kl)}
                        >
                          obrisi
                        </Button>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link
                          to="/izmeniKlijenta"
                          onClick={() => this.setujKlijentaZaIzmenu(kl)}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => this.props.setKlijentZaIzmenu(kl)}
                          >
                            izmeni
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Klijent: {kl.ime_firme}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Pib: {kl.pib}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link
                          to="/izmeniKlijenta"
                          klijent={kl}
                          vrstaLica="pravno"
                          onClick={() => this.setujKlijentaZaIzmenu(kl)}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => this.setujKlijentaZaIzmenu(kl)}
                          >
                            izmeni
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={() => this.obrisiKlijenta(kl)}
                        >
                          obrisi
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
            PRETRAZIVANJE KLIJENATA
          </Typography>

          <Form
            initialValues={{ employed: true, stooge: "larry" }}
            render={({ reset, pristine, values }) => (
              <form>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel disabled={true}>
                        Unesite ime i prezime klijenta ili naziv firme
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="standard-basic"
                        label=""
                        variant="outlined"
                        onChange={(event) =>
                          this.handleChangeKriterijum(event.target.value)
                        }
                        value={this.state.kriterijum}
                      ></TextField>
                    </Grid>

                    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                      <Grid item style={{ marginTop: 16, marginRight: "auto" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.pretraziPoKrit}
                        >
                          Pretrazi klijente po kriterijumu
                        </Button>
                      </Grid>
                    </div>
                  </Grid>
                  {this.state.listaKlijenataPoKrit.length != 0 ? tabela : null}
                </Paper>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setKlijentZaIzmenu: (klijent) =>
      dispatch({ type: actionTypes.SET_KLIJENT_ZA_IZMENU, klijent: klijent }),
  };
};

export default connect(null, mapDispatchToProps)(PretraziKlijenta);
