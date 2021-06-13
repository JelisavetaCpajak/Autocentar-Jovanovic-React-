import {
  InputLabel,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  ButtonGroup,
  CssBaseline,
  Typography,
  AppBar,
  Toolbar,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import history from "../../history";
import axios from "../../axios";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import IzmeniRacun from "../IzmeniRacun/IzmeniRacun";
import { Link, Route } from "react-router-dom";

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

class PretraziRacun extends Component {
  state = {
    kriterijum: "",
    odabranKriterijum: false,
    promenjenKriterijum: false,
    listaRacunaZaKrit: [],
    message: "",
    racunZaIzmenu: {},
  };

  componentDidMount() {
    //this.setState({ promenjenKriterijum: true });
    console.log("componentDidMount");
    let listaRacunaZaKrit = this.props.listaRacunaZaKrit;
    let lista = [];
    listaRacunaZaKrit.map((rac) => {
      lista.push(rac);
    });
    this.setState({ listaRacunaZaKrit: lista });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  setKriterijum = (value) => {
    // let stara = this.state.naziv;
    // let nova = stara + value;
    this.setState({ kriterijum: value });
  };

  pretraziPoKriterijumuHandler = (event) => {
    event.preventDefault();
    //saljem zahtev ka serveru da nadje racun po zadatom kriterijumu
    this.props.setOdabranKriterijum(true);
    //this.setState({ odabranKriterijum: true });
    let url = "/racun/" + this.state.kriterijum + "/";
    let lista = [];
    axios
      .get(url)
      .then((response) => {
        //odg iz baze

        if (response.data.length == 0) {
          console.log("[PretraziRacun.js] response.data je prazan");
          this.setState({
            message:
              "Ne postoje racuni za trazeni kriterijum, pokusajte ponovo.",
          });
          this.props.setOdabranKriterijum(false);
        } else {
          //postoji racun za kriterijum
          let racuniIzBaze = response.data;
          console.log("RESPONSE IZ BAZE(racuni po krit): ", response.data);
          //novi axios za stavke racuna
          racuniIzBaze.map((rac) => {
            let urlStavka = "/racun/stavke/" + rac.sifra_racuna + "/";
            axios
              .get(urlStavka)
              .then((resp) => {
                if (resp.data.length == 0) {
                  console.log("resp: ", resp);
                  //console.log(urlStavka, "=>prazan niz stavki");
                } else {
                  console.log("resp: stavke za racun po krit", resp.data);
                  let stavke = [];
                  resp.data.map((elem) => {
                    let st = {
                      sifra_racuna: elem.sifra_racuna,
                      redni_broj: elem.redni_broj,
                      naziv: elem.naziv,
                      kolicina: elem.kolicina,
                      cena_bez_pdv: elem.cena_bez_pdv,
                      cena_sa_pdv: elem.cena_sa_pdv,
                    };
                    stavke.push(st);
                  });
                  let racun = {
                    ...rac,
                    nizStavki: stavke,
                  };
                  //console.log("racun sa stavkama: ", racun);
                  lista.push(racun);
                  //console.log("lista(unutrasnji axios): ", lista);
                }
              })
              .then(() => {
                this.setState({ listaRacunaZaKrit: lista });
                this.props.setListaRacunaZaKriterijum(lista);
              })

              .catch((error) => {
                console.log(
                  "Greska pri ucitavanju niza stavki za konkretan racun."
                );
              });
          });
        }
      })
      .then(() => {
        // console.log("lista: ", lista);
        // console.log("listaRacunaZaKrit: ", this.state.listaRacunaZaKrit);
        // this.setState({
        //   listaRacunaZaKrit: lista,
        //   odabranKriterijum: true,
        //   // imeKlijenta: klijent,
        // });
        // console.log(
        //   "listaRacunaZaKrit(posle setState): ",
        //   this.state.listaRacunaZaKrit
        // );
      })
      .catch((error) => {
        alert("Greska pri povezivanju na bazu!");
      });
  };

  izmeni = () => {
    <Route path="/izmeniRacun" component={IzmeniRacun} />;
  };

  obrisiRacun = (sifraRacuna) => {
    let staraLista = this.state.listaRacunaZaKrit;
    let racun = null; //racun koji se brise
    staraLista.map((rac) => {
      if (rac.sifra_racuna == sifraRacuna) {
        let index = this.state.listaRacunaZaKrit.indexOf(rac);
        //pokupi taj racun
        racun = rac;
        console.log("racun koji se brise: ", racun);
        //izbaci taj racun iz liste
        staraLista.splice(index, 1);
      }
    });
    this.setState({ listaRacunaZaKrit: staraLista });

    console.log("preostali racuni: ", this.state.listaRacunaZaKrit);

    //nije izvrsena izmena u bazi!!!
    //axios za delete odredjenog racuna
    //serverska strana je napravljena tako da prima ceo objekat koji zelim da izbrisem
    //on na serverskoj strani prima ceo racun koji treba da obrise

    let url = "/racun/obrisi/";

    axios
      .delete(url, {
        headers: {},
        data: {
          racun: racun,
        },
      })
      .then((response) => {
        console.log("brisanjeRacuna->response: ", response);
      })
      .catch((error) => {
        console.log("brisanjeRacuna->error: ", error);
        alert("Greska pri brisanju racuna u bazi!");
      });

    //treba pri svakom brisanju da
  };

  render() {
    let klijent = null;
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
            PRETRAZIVANJE RACUNA
          </Typography>
          <form noValidate autoComplete="off">
            <br />
            <br />
            <InputLabel>
              Unesite kriterijum(JMBG klijenta ili PIB firme):
            </InputLabel>
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label=""
              variant="outlined"
              style={{ color: "black", textAlign: "center" }}
              onChange={(event) => this.setKriterijum(event.target.value)}
              value={this.state.naziv}
            />{" "}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.pretraziPoKriterijumuHandler}
            >
              Pretrazi
            </Button>
          </form>

          {this.props.odabranKriterijum ? (
            <TableContainer style={{ marginTop: 50 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "primary" }}>
                    <TableCell>REDNI BROJ</TableCell>
                    <TableCell>SIFRA RACUNA</TableCell>
                    <TableCell>UKUPAN IZNOS(SA PDV-OM)</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.state.listaRacunaZaKrit.map((rac) => (
                    //klijent={rac.ime_prezime_klijenta} +{rac.ime_firme};
                    <TableRow key={Math.random()}>
                      <TableCell component="th" scope="row">
                        {this.state.listaRacunaZaKrit.indexOf(rac) + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {rac.sifra_racuna}
                      </TableCell>
                      {/* <TableCell align="right">
                      Klijent:{" "}
                      {rac.ime_prezime_klijenta
                        ? rac.ime_prezime_klijenta
                        : rac.ime_firme}
                    </TableCell> */}
                      <TableCell component="th" scope="row">
                        {rac.ukupno_sa_pdv} RSD
                      </TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Link to="/izmeniRacun" racun={rac}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={() => this.props.setRacunZaIzmenu(rac)}
                            >
                              izmeni RACUN
                            </Button>
                          </Link>
                          <Button
                            onClick={() => this.obrisiRacun(rac.sifra_racuna)}
                          >
                            obrisi RACUN
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>
              {
                <TableRow>
                  <TableCell>{this.state.message}</TableCell>
                </TableRow>
              }
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    racunZaIzmenu: state.racunZaIzmenu,
    listaRacunaZaKrit: state.listaRacunaZaKrit,
    odabranKriterijum: state.odabranKriterijum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRacunZaIzmenu: (racun) =>
      dispatch({ type: actionTypes.SET_RACUN_ZA_IZMENU, racun: racun }),
    setListaRacunaZaKriterijum: (listaRacunaZaKrit) =>
      dispatch({
        type: actionTypes.SET_LISTA_RACUNA_ZA_KRITERIJUM,
        listaRacunaZaKrit: listaRacunaZaKrit,
      }),
    setOdabranKriterijum: (val) => {
      dispatch({ type: actionTypes.SET_KRITERIJUM, val: val });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PretraziRacun);
