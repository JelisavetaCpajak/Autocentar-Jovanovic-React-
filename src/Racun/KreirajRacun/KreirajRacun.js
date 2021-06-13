import {
  ButtonBase,
  Button,
  FormGroup,
  FormLabel,
  AppBar,
  Toolbar,
  ListItem,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TextField,
  CssBaseline,
  Typography,
  MenuItem,
  ListItemIcon,
  Paper,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { withStyles } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";
//import { button } from "bootstrap";
import React, { Component } from "react";
import axios from "../../axios";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import StavkaRacuna from "../StavkaRacuna/StavkaRacuna";
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

class KreirajRacun extends Component {
  state = {
    novaStavka: false,

    dodataStavka: false,
    klijenti: this.props.klijenti,
    zapisnici: this.props.zapisnici,
    selektovanKlijent: this.props.klijenti[0].id_klijenta,
    selektovanZapisnik: this.props.zapisnici[0].id_broj,
    datum: Date,
  };
  //kreirajRacun = () => {};

  componentDidMount() {
    console.log("svi klijenti: ", this.props.klijenti);
    // this.setState({
    //   klijenti: this.props.klijenti,
    //   zapisnici: this.props.zapisnici,
    // });
    console.log("ucitani klijenti: ", this.state.klijenti);
    console.log("ucitani zapisnici: ", this.state.zapisnici);
    console.log(
      "selektovan klijent: ",
      this.state.selektovanKlijent,
      "selektovan zapisnik: ",
      this.state.selektovanZapisnik
    );
  }

  dodajStavku = () => {
    this.setState({ dodataStavka: this.props.stavke.length != 0 });
  };

  handleChangeKlijent = (e) => {
    this.setState({ selektovanKlijent: e.target.value });
    console.log("SETOVAN KLIJENT: ", this.state.selektovanKlijent);
  };

  handleChangeZapisnik = (e) => {
    this.setState({ selektovanZapisnik: e.target.value });
    console.log("SETOVAN zapisnik: ", this.state.selektovanZapisnik);
  };

  handleChangeDatum = (e) => {
    let dat = e.target.value;

    console.log("SETOVAN datum: ", dat);
    let datum = dat;
    console.log("datum: ", datum);
    this.setState({ datum: datum });
  };

  sacuvajRacun = () => {
    let kl = null;
    let zap = null;
    this.state.klijenti.forEach((klijent) => {
      if (klijent.id_klijenta === this.state.selektovanKlijent) kl = klijent;
    });
    this.state.zapisnici.forEach((zapisnik) => {
      if (zapisnik.id_broj === this.state.selektovanZapisnik) zap = zapisnik;
    });
    console.log("zapisnik-properties: ", this.state.selektovanZapisnik);
    if (kl.id_klijenta !== zap.id_klijenta) {
      alert(
        "Za datog klijenta mogu se izabrati samo zapisnici koji se na njega i odnose!"
      );
    } else {
      //new Date().toISOString().slice(0, 19).replace('T', ' ');
      let dat = this.state.datum;
      console.log("dat: ", dat);
      //if(dat==null){
      //   alert("Morate selektovati datum");
      // }
      // dat.getUTCFullYear() +
      //   "-" +
      //   ("00" + (dat.getUTCMonth() + 1)).slice(-2) +
      //   "-" +
      //   ("00" + dat.getUTCDate()).slice(-2);
      // dat = dat.toLocaleDateString();
      // let datumKonacno = dat.replaceAll("/", "-");
      // console.log("datum: ", datumKonacno);
      let racun = {
        sifra_racuna: null,
        klijent: kl, //this.state.selektovanKlijent
        zapisnik: zap, //this.state.selektovanZapisnik
        datum: dat, //treba da bude dat
        nizStavki: this.props.stavke,
        ukupno_bez_pdv: 0,
        ukupno_sa_pdv: 0,
      };
      let ukupno_bez_pdv = 0;
      let ukupno_sa_pdv = 0;

      racun.nizStavki.forEach((stavka) => {
        ukupno_bez_pdv += stavka.kolicina * stavka.cena_bez_pdv;
        ukupno_sa_pdv += stavka.kolicina * stavka.cena_sa_pdv;
      });
      racun.ukupno_bez_pdv = ukupno_bez_pdv;
      racun.ukupno_sa_pdv = ukupno_sa_pdv;
      this.setState({ dodataStavka: false }); //???, da se ne bi prikazivala dole tabela
      //ali moram i da posaljem u bazu
      //i "ispraznim" racun, odnosno nizStavki!!!!
      console.log("Salje se racun: ", racun);
      let url = "/racun/";
      // body: {
      //   racun: {
      //     sifra_racuna: null,
      //     datum: '2021-02-17T11:07:34.529+01:00',
      //     ukupno_sa_pdv: 1200,
      //     ukupno_bez_pdv: 1000,
      //     klijent: [Object],
      //     zapisnik: [Object],
      //     nizStavki: [Array]
      //   }
      // }
      axios
        .post(url, {
          headers: {},
          data: {
            racun,
          },
        })
        .then
        //kad ovo uspe, onda  this.props.stavke treba da bude null
        //this.props.stavke=null
        ()
        .catch((error) => {
          alert("Neuspesno cuvanje racuna!");
          console.log("Neuspesno cuvanje racuna!; greska: ", error);
        });
    }
  };

  render() {
    var d = new Date();
    // <ion-datetime
    //           display-format="DD MMM YYYY"
    //           picker-format="DD MMM YYYY"
    //           ngModel
    //           required
    //           name="datum"
    //         >
    //         </ion-datetime>
    let datum = (
      <form
        noValidate
        onChange={this.handleChangeDatum}
        style={{ marginLeft: 20, marginBottom: 10 }}
      >
        <TextField
          id="date"
          label=""
          type="date"
          defaultValue={d.getDate()}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );

    //na klik dugmeta se pokupe podaci, ubace u tabelu ispod i izbrisu vrednosti gore
    //ovde tabela u kojoj ce se prikazati sve do sada unete stavke

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
            KREIRANJE RACUNA
          </Typography>

          <FormGroup>
            <Paper>
              <Row>
                <FormLabel
                  style={{
                    marginLeft: 10,
                    marginBottom: 10,
                    marginTop: 10,
                    marginRight: 5,
                  }}
                >
                  Klijent:
                </FormLabel>
                {
                  <select
                    name="klijent"
                    id="klijentDropdrown"
                    style={{
                      width: "40%",
                      marginRight: "auto",
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                    onChange={this.handleChangeKlijent}
                  >
                    {this.state.klijenti.map((kl) => (
                      <option key={kl.id_klijenta} value={kl.id_klijenta}>
                        {kl.ime_prezime_klijenta}
                        {kl.ime_firme}
                      </option>
                    ))}
                  </select>
                }
              </Row>
              <Row>
                <FormLabel
                  style={{
                    marginRight: "auto",
                    marginBottom: 10,
                    marginTop: 10,
                    marginRight: 5,
                  }}
                >
                  Zapisnik:
                </FormLabel>
                {
                  <select
                    name="zapisnik"
                    id="zapisnikDropdown"
                    style={{
                      width: "40%",
                      marginRight: "auto",
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                    onChange={this.handleChangeZapisnik}
                  >
                    {this.state.zapisnici.map((zap) => (
                      <option key={zap.id_broj} value={zap.id_broj}>
                        {zap.id_broj}
                      </option>
                    ))}
                  </select>
                }
              </Row>
              <FormLabel style={{ marginLeft: 20, marginBottom: 10 }}>
                Datum:
              </FormLabel>
              {datum}
            </Paper>
            <Typography
              style={{ marginTop: 20 }}
              variant="h6"
              align="left"
              component="h1"
              gutterBottom
            >
              Nova stavka
            </Typography>
            <StavkaRacuna dodataStavkaHandler={this.dodajStavku} />

            {this.state.dodataStavka ? (
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Naziv stavke</TableCell>
                      <TableCell>Kolicina</TableCell>
                      <TableCell>Cena</TableCell>
                      <TableCell>Cena sa pdv-om</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.stavke.map((st) => (
                      <TableRow key={Math.random()}>
                        <TableCell component="th" scope="row">
                          {st.naziv}
                        </TableCell>
                        <TableCell align="right">{st.kolicina}</TableCell>
                        <TableCell align="right">{st.cena_bez_pdv}</TableCell>
                        <TableCell align="right">{st.cena_sa_pdv}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
          </FormGroup>

          {this.state.dodataStavka ? (
            <div style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={this.sacuvajRacun}
                style={{ marginLeft: "auto" }}
              >
                Sacuvaj racun
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fullUser: state.fullUser,
    klijenti: state.klijenti,
    zapisnici: state.zapisnici,
    stavke: state.listaStavki,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ucitajKlijente: (klijenti) =>
      dispatch({ type: actionTypes.UCITAJ_KLIJENTE, klijenti: klijenti }),

    ucitajZapisnike: (zapisnici) =>
      dispatch({ type: actionTypes.UCITAJ_ZAPISNIKE, zapisnici: zapisnici }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KreirajRacun);
