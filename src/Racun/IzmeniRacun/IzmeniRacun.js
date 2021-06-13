import {
  Button,
  ButtonBase,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CssBaseline,
  StepButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  TextField,
  Toolbar,
  AppBar,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";

import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";

import axios from "../../axios";
import React, { Component } from "react";

import { connect } from "react-redux";

import classes from "./IzmeniRacun.css";

import { Link } from "react-router-dom";
import * as actionTypes from "../../store/action";

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

class IzmeniRacun extends Component {
  state = {
    stareStavke: [],
    noveStavke: [],
    novaStavka: {
      sifra_racuna: this.props.racunZaIzmenu.sifra_racuna,
      redni_broj: "",
      naziv: "",
      kolicina: "",
      cena_bez_pdv: "",
      cena_sa_pdv: "",
      izmena: false,
      brisanje: false,
    },
    nova: false,
  };

  componentDidMount() {
    let racun = this.props.racunZaIzmenu;
    let listaStavki = [];
    racun.nizStavki.map((st) => {
      listaStavki.push(st);
    });
    this.setState({ stareStavke: listaStavki });
    this.props.setOdabranKriterijum(true);
  }

  sacuvajIzmene = () => {
    let racun = this.props.racunZaIzmenu;
    this.props.setOdabranKriterijum(true);
    let url = "/racun/izmena/";
    console.log("salje se racun na izmenu u bazu: ", racun);
    axios
      .put(url, {
        headers: {},
        data: {
          racun,
        },
      })
      .then((resp) => {
        console.log("Uspesna izmena racuna u bazi!");

        // alert("Uspesna izmena racuna u bazi!");
      })
      .catch((error) => {
        console.log("Neuspesna izmena racuna u bazi!");
        alert("Neuspesna izmena racuna u bazi!");
      });
  };

  obrisiStavku = (stavka) => {
    let starestareStavke = this.state.stareStavke;
    console.log("stavka: ", starestareStavke[0]);

    let index;
    starestareStavke.forEach((st) => {
      if (
        st.sifra_racuna == stavka.sifra_racuna &&
        st.redni_broj == stavka.redni_broj
      ) {
        index = starestareStavke.indexOf(st);
        starestareStavke[index].brisanje = true;
        starestareStavke[index].kreiranje = false;
        starestareStavke[index].izmena = false;
      }
    });

    let racun = this.props.racunZaIzmenu;
    racun.nizStavki = starestareStavke;
    starestareStavke.forEach((st) => {
      if (st.brisanje == true) {
        index = starestareStavke.indexOf(st);
        starestareStavke.splice(index, 1);
      }
    });
    this.setState({ stareStavke: starestareStavke });

    let sumaBezPdva = stavka.kolicina * stavka.cena_bez_pdv;
    let sumaSaPdvom = stavka.kolicina * stavka.cena_sa_pdv;

    racun.ukupno_bez_pdv -= sumaBezPdva;
    racun.ukupno_sa_pdv -= sumaSaPdvom;
    this.props.postaviAzuriranRacun(racun);
    // this.setState({stareStavke: })
    console.log("preostale stareStavke: ", this.state.stareStavke);
  };

  azurirajVrednostiNaRacunuBrisanje = (stavka) => {
    let sumaBezPdva = stavka.kolicina * stavka.cena_bez_pdv;
    let sumaSaPdvom = stavka.kolicina * stavka.cena_sa_pdv;
    let racun = this.props.racunZaIzmenu;
    racun.ukupno_bez_pdv -= sumaBezPdva;
    racun.ukupno_sa_pdv -= sumaSaPdvom;
    //this.props.postaviAzuriranRacun(racun);
  };

  novaStavkaIzIzmene = () => {
    //treba da se otvori forma za unos nove stavke, ona se doda u this.state.noveStavke
    let novaStavka = {
      redni_broj: null,
      naziv: "",
      kolicina: "",
      cena: "",
      cenapdv: "",
    };

    this.props.setNovaStavkaIzIzmene();
  };
  setNaziv = (value) => {
    this.setState({ novaStavka: { naziv: value } });
  };
  setKolicina = (value) => {
    this.setState({ novaStavka: { kolicina: value } });
  };
  setCena = (value) => {
    this.setState({ novaStavka: { cena_bez_pdv: value } });
  };
  setCenaPdv = (value) => {
    this.setState({ novaStavka: { cena_sa_pdv: value } });
  };

  novaStavkaHandler = () => {
    this.setState({ nova: true });
  };

  render() {
    // const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    let racun = this.props.racunZaIzmenu;
    console.log("datum racuna:", racun.datum);
    let datPrikaz = racun.datum.split("T")[0];
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <StyledMenuItem>
              <ListItemIcon>
                <NavLink to="/pretraziRacun" style={mystyle}>
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
            IZMENA RACUNA
          </Typography>
          {this.props != null ? (
            <div>
              <Grid
                container
                alignItems="flex-start"
                spacing={2}
                style={{ marginBottom: 10 }}
              >
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Vozilo"
                    variant="outlined"
                    value={("Vozilo: ", racun.reg_oznaka)}
                    disabled={true}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Datum"
                    disabled={true}
                    value={datPrikaz}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-basic"
                    variant="outlined"
                    label="ID zapisnika"
                    disabled={true}
                    value={
                      ("ID zapisnika o tehnickom pregledu: ", racun.id_broj)
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Cena(u rsd)"
                    disabled={true}
                    value={racun.ukupno_bez_pdv}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Cena+pdv(u rsd)"
                    disabled={true}
                    value={racun.ukupno_sa_pdv}
                  />
                </Grid>
              </Grid>

              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    variant="h5"
                    align="center"
                    component="h1"
                    gutterBottom
                  >
                    STAVKE RACUNA
                  </Typography>
                </CardContent>

                {this.state.stareStavke != null ? (
                  <CardContent>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">NAZIV STAVKE</TableCell>
                            <TableCell align="left">KOLICINA</TableCell>
                            <TableCell align="left">CENA</TableCell>
                            <TableCell align="left">CENA SA PDV-OM</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.stareStavke.map((st) => (
                            <TableRow key={Math.random()}>
                              <TableCell component="th" scope="row">
                                {st.naziv}
                              </TableCell>
                              <TableCell align="left">{st.kolicina}</TableCell>
                              <TableCell align="left">
                                {st.cena_bez_pdv}
                              </TableCell>
                              <TableCell align="left">
                                {st.cena_sa_pdv}
                              </TableCell>
                              <TableCell>
                                <ButtonGroup>
                                  <Link
                                    to="/izmeniStavku"
                                    onClick={() =>
                                      this.props.postaviStavkuZaIzmenu(st)
                                    }
                                  >
                                    <StepButton>
                                      <Button
                                        onClick={() =>
                                          console.log("izmeni stavku")
                                        }
                                      >
                                        izmeni stavku
                                      </Button>
                                    </StepButton>
                                  </Link>

                                  <Button onClick={() => this.obrisiStavku(st)}>
                                    obrisi stavku
                                  </Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                ) : null}
                <div>
                  <Link to="/novaStavka">
                    <ButtonBase>
                      <StepButton>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={this.novaStavkaIzIzmene}
                          style={{ marginRight: 20 }}
                        >
                          dodaj stavku
                        </Button>
                        {/* ovo nije uradjeno */}
                      </StepButton>
                    </ButtonBase>
                  </Link>
                </div>
                {/* {this.state.nova ? novaStavka : null} */}
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.sacuvajIzmene}
                    style={{ marginLeft: "auto" }}
                  >
                    Sacuvaj promene
                    {/* ovo nije uradjeno ka bazi */}
                  </Button>
                </CardActions>
              </Card>
            </div>
          ) : (
            <p>greska</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    racunZaIzmenu: state.racunZaIzmenu,
    stavkaZaIzmenu: state.stavkaZaIzmenu,
    novaStavkaIzIzmene: state.novaStavkaIzIzmene,
    odabranKriterijum: state.odabranKriterijum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postaviStavkuZaIzmenu: (stavka) =>
      dispatch({ type: actionTypes.SET_STAVKA_IZMENI, stavka: stavka }),
    setNovaStavkaIzIzmene: () =>
      dispatch({ type: actionTypes.NOVA_STAVKA_IZ_IZMENE }),
    postaviAzuriranRacun: (racun) =>
      dispatch({ type: actionTypes.IZMENI_RACUN, racun: racun }),
    setOdabranKriterijum: (val) => {
      dispatch({ type: actionTypes.SET_KRITERIJUM, val: val });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IzmeniRacun);
