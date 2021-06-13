import {
  Button,
  Container,
  FormLabel,
  List,
  ListItem,
  TextField,
  Typography,
  CssBaseline,
  MenuItem,
  AppBar,
  Toolbar,
  ListItemIcon,
} from "@material-ui/core";
import React, { Component } from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/action";

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

class IzmeniStavku extends Component {
  state = {
    sifra_racuna: this.props.stavkaZaIzmenu.sifra_racuna,
    redni_broj: this.props.stavkaZaIzmenu.redni_broj,
    naziv: this.props.stavkaZaIzmenu.naziv,
    kolicina: this.props.stavkaZaIzmenu.kolicina,
    cena_bez_pdv: this.props.stavkaZaIzmenu.cena_bez_pdv,
    cena_sa_pdv: this.props.stavkaZaIzmenu.cena_sa_pdv,
    kreiranje: false,
    izmena: false,
    brisanje: false,
  };

  //   constructor(props){
  //     super(props);
  //     this.onSubmit = this.onSubmit.bind(this);
  //   }

  //   onSubmit(e) {
  //     e.preventDefault();
  //     var title = this.title;
  //     console.log(title);
  //   }
  izmeni = () => {
    let izmenjenaStavka = this.state;
    if (
      izmenjenaStavka.naziv == "" ||
      izmenjenaStavka.kolicina == "" ||
      izmenjenaStavka.cena_bez_pdv == "" ||
      izmenjenaStavka.cena_sa_pdv == ""
    ) {
      alert("Stavka ne sme imati prazna polja!");
    } else if (isNaN(izmenjenaStavka.kolicina)) {
      alert("Kolicina mora biti ceo broj!");
    } else if (isNaN(izmenjenaStavka.cena_bez_pdv)) {
      alert("Cena mora biti broj!");
    } else if (isNaN(izmenjenaStavka.cena_sa_pdv)) {
      alert("Cena sa PDV-om mora biti broj!");
    } else {
      izmenjenaStavka.izmena = true;
      let racun = this.props.racunZaIzmenu;
      console.log("izmenjena stavka: ", izmenjenaStavka);
      console.log("RACUN->STAVKE: ", this.props.racunZaIzmenu);
      let stare = [];
      this.props.racunZaIzmenu.nizStavki.map((st) => {
        stare.push(st);
      });
      console.log("stare stavke: ", stare);
      stare.map((st) => {
        if (
          st.sifra_racuna == izmenjenaStavka.sifra_racuna &&
          st.redni_broj == izmenjenaStavka.redni_broj
        ) {
          //st = izmenjenaStavka;
          st.naziv = izmenjenaStavka.naziv;
          st.kolicina = izmenjenaStavka.kolicina;
          st.cena_bez_pdv = izmenjenaStavka.cena_bez_pdv;
          st.cena_sa_pdv = izmenjenaStavka.cena_sa_pdv;
          st.izmena = izmenjenaStavka.izmena;
          st.kreiranje = izmenjenaStavka.kreiranje;
          st.brisanje = izmenjenaStavka.brisanje;
        }
      });
      console.log("stare stavke posle izmene: ", stare);
      // this.props.racunZaIzmenu.nizStavki = stare;
      let sumaBezPdva = 0;
      let sumaSaPdvom = 0;
      stare.map((st) => {
        sumaBezPdva += st.cena_bez_pdv * st.kolicina;
        sumaSaPdvom += st.cena_sa_pdv * st.kolicina;
      });
      racun.nizStavki = stare;
      racun.ukupno_bez_pdv = sumaBezPdva;
      racun.ukupno_sa_pdv = sumaSaPdvom;
      console.log("racun koji se salje na izmenu: ", racun);
      // this.props.racunZaIzmenu.ukupno_bez_pdv = sumBezPdva;
      // this.props.racunZaIzmenu.ukupno_sa_pdv = sumBezPdva;
      this.props.postaviAzuriranRacun(racun);
      console.log(
        "RACUN->STAVKE(pozvana metoda ka reducer-u): ",
        this.props.racunZaIzmenu
      );
      //ovde treba da se pokupe podaci sa forme, setuju u stavku koja se salje
      // i vrate na racun novi podaci za izmenu stavke
    }
  };

  render() {
    const setNaziv = (value) => {
      // let stara = this.state.naziv;
      // let nova = stara + value;
      this.setState({ naziv: value });
    };
    const setKolicina = (value) => {
      // let stara = this.state.naziv;
      // let nova = stara + value;
      this.setState({ kolicina: value });
    };
    const setCena = (value) => {
      // let stara = this.state.naziv;
      // let nova = stara + value;
      this.setState({ cena_bez_pdv: value });
    };
    const setCenaPdv = (value) => {
      // let stara = this.state.naziv;
      // let nova = stara + value;
      this.setState({ cena_sa_pdv: value });
    };

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <StyledMenuItem>
              <ListItemIcon>
                <NavLink to="/izmeniRacun" style={mystyle}>
                  <ListItemIcon>
                    <KeyboardArrowLeftIcon fontSize="small" />
                  </ListItemIcon>
                </NavLink>
              </ListItemIcon>
            </StyledMenuItem>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 16, margin: "auto", maxWidth: 500 }}>
          <CssBaseline />
          <Typography variant="h4" align="center" component="h1" gutterBottom>
            IZMENA STAVKE
          </Typography>
          <Container>
            <List>
              <ListItem>
                <FormLabel> Naziv stavke: </FormLabel> <br></br>
                <TextField
                  name="nazivStavke"
                  placeholder=""
                  onChange={(event) => setNaziv(event.target.value)}
                  value={this.state.naziv}
                ></TextField>
              </ListItem>
              <ListItem>
                <FormLabel> Kolicina: </FormLabel> <br></br>
                <TextField
                  placeholder=""
                  name="kolicinaStavke"
                  onChange={(event) => setKolicina(event.target.value)}
                  value={this.state.kolicina}
                ></TextField>
              </ListItem>
              <ListItem>
                <FormLabel> Cena(bez pdv-a): </FormLabel> <br></br>
                <TextField
                  name="cenaStavke"
                  placeholder=""
                  onChange={(event) => setCena(event.target.value)}
                  value={this.state.cena_bez_pdv}
                ></TextField>
              </ListItem>
              <ListItem>
                <FormLabel> Cena(sa pdv-om): </FormLabel> <br></br>
                <TextField
                  name="cenaStavkeSaPdv"
                  placeholder=""
                  onChange={(event) => setCenaPdv(event.target.value)}
                  value={this.state.cena_sa_pdv}
                ></TextField>
              </ListItem>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.izmeni}
              >
                Izmeni stavku
              </Button>
            </List>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    racunZaIzmenu: state.racunZaIzmenu,
    stavkaZaIzmenu: state.stavkaZaIzmenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postaviAzuriranRacun: (racun) =>
      dispatch({ type: actionTypes.IZMENI_RACUN, racun: racun }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IzmeniStavku);
