import { Input } from "@material-ui/core";
import classes from "./StavkaRacuna.css";
import React, { Component } from "react";
import {
  Container,
  List,
  ListItem,
  FormLabel,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
//import { Button } from "bootstrap";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";

class StavkaRacuna extends Component {
  state = {
    redni_broj: null,
    naziv: "",
    kolicina: "",
    cena_bez_pdv: "",
    cena_sa_pdv: "",
    kreiranje: false,
    izmena: false,
    brisanje: false,
    //disabled: false,
  };

  componentDidMount() {
    let izmena = this.props.izmena;
    console.log("izmena: ", izmena);
  }

  posaljiPodatkeZaStavkuHandler = () => {
    let stavka = this.state;
    if (
      stavka.naziv == "" ||
      stavka.kolicina == "" ||
      stavka.cena_bez_pdv == "" ||
      stavka.cena_sa_pdv == ""
    ) {
      alert("Stavka ne sme imati prazna polja!");
    } else if (isNaN(stavka.kolicina)) {
      alert("Kolicina mora biti ceo broj!");
    } else if (isNaN(stavka.cena_bez_pdv)) {
      alert("Cena mora biti broj!");
    } else if (isNaN(stavka.cena_sa_pdv)) {
      alert("Cena sa PDV-om mora biti broj!");
    } else {
      //<Alert severity="error">Stavka ne sme imati prazna polja!</Alert>;

      console.log("SALJEM STAVKU: ", stavka);
      if (this.props.izmena) {
        //ova stavka treba da se doda na postojeci nizStavki(ili stareStavke) u racunuZaIzmenu
        console.log("podaci iz stavke: ", this.state);
        //treba da nadjem max_rbr prethodnih stavki
        //let maxRbr;
        let racun = this.props.racunIzmena;
        console.log("rac za izmenu: ", racun);

        //ovde treba da ovoj novoj stavki dodam rbr
        let maxRbr = 0;
        for (let index = 0; index < racun.nizStavki.length; index++) {
          let st = racun.nizStavki[index];
          if (maxRbr <= st.redni_broj) maxRbr = st.redni_broj;
        }
        stavka.sifra_racuna = racun.sifra_racuna;
        stavka.redni_broj = maxRbr + 1;
        stavka.kreiranje = true; //ovo znaci da je ova stavka kreirana nova iz IzmeniRacun

        this.props.dodajStavkuURacunZaIzmenu(stavka);
        // = this.props.racunIzmena;
        let ukupno_bez_pdv =
          racun.ukupno_bez_pdv + stavka.kolicina * stavka.cena_bez_pdv;
        let ukupno_sa_pdv =
          racun.ukupno_sa_pdv + stavka.kolicina * stavka.cena_sa_pdv;
        racun.ukupno_bez_pdv = ukupno_bez_pdv;
        racun.ukupno_sa_pdv = ukupno_sa_pdv;
        this.props.postaviAzuriranRacun(racun);
        this.setState({
          naziv: "",
          kolicina: "",
          cena_bez_pdv: "",
          cena_sa_pdv: "",
        });
      } else {
        this.props.dodajStavku(stavka);
        this.setState({
          naziv: "",
          kolicina: "",
          cena_bez_pdv: "",
          cena_sa_pdv: "",
        });
        this.props.dodataStavkaHandler();
      }
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

    let forma = (
      <Container>
        <List>
          <ListItem>
            <FormLabel> Naziv stavke: </FormLabel> <br></br>
            <TextField
              placeholder="Unesite naziv"
              onChange={(event) => setNaziv(event.target.value)}
              value={this.state.naziv}
            ></TextField>
          </ListItem>
          <ListItem>
            <FormLabel> Kolicina: </FormLabel> <br></br>
            <TextField
              placeholder="Unesite kolicinu"
              onChange={(event) => setKolicina(event.target.value)}
              value={this.state.kolicina}
            ></TextField>
          </ListItem>
          <ListItem>
            <FormLabel> Cena(bez pdv-a): </FormLabel> <br></br>
            <TextField
              placeholder="Unesite cenu"
              onChange={(event) => setCena(event.target.value)}
              value={this.state.cena_bez_pdv}
            ></TextField>
          </ListItem>
          <ListItem>
            <FormLabel> Cena(sa pdv-om): </FormLabel> <br></br>
            <TextField
              placeholder="Unesite cenu+pdv"
              onChange={(event) => setCenaPdv(event.target.value)}
              value={this.state.cena_sa_pdv}
            ></TextField>
          </ListItem>
          {/* <Link to="/izmeniRacun"> */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.posaljiPodatkeZaStavkuHandler}
          >
            Dodaj stavku
          </Button>
          {/* </Link> */}
        </List>
      </Container>
    );

    return <div className={classes.root}>{forma}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    stavke: state.listaStavki,
    izmena: state.novaStavkaIzIzmene,
    racunIzmena: state.racunZaIzmenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dodajStavku: (stavka) =>
      dispatch({ type: actionTypes.DODAJ_STAVKU, data: stavka }),
    dodajStavkuURacunZaIzmenu: (stavka) =>
      dispatch({
        type: actionTypes.DODAJ_NOVU_STAVKU_IZ_IZMENE,
        stavka: stavka,
      }),
    postaviAzuriranRacun: (racun) =>
      dispatch({ type: actionTypes.IZMENI_RACUN, racun: racun }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StavkaRacuna);
