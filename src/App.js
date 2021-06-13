import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Login from "./Login/Login";

import KreirajRacun from "./Racun/KreirajRacun/KreirajRacun";
import PretraziRacun from "./Racun/PretraziRacun/PretraziRacun";

import { connect } from "react-redux";

import IzmeniRacun from "./Racun/IzmeniRacun/IzmeniRacun";
import IzmeniStavku from "./Racun/IzmeniRacun/IzmeniStavku/IzmeniStavku";
import StavkaRacuna from "./Racun/StavkaRacuna/StavkaRacuna";
import KreirajKlijenta from "./Klijent/KreirajKlijenta/KreirajKlijenta";
import PretraziKlijenta from "./Klijent/PretraziKlijenta/PretraziKlijenta";
import HomePage from "./HomePage/HomePage";
import IzmeniKlijenta from "./Klijent/IzmeniKlijenta/IzmeniKlijenta";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route
            path="/kreirajRacun"
            component={KreirajRacun}
            klijenti={this.props.klijenti}
            zapisnici={this.props.zapisnici}
          />
          <Route path="/homePage" component={HomePage} />
          <Route path="/pretraziRacun" component={PretraziRacun} />
          <Route path="/izmeniRacun" component={IzmeniRacun} />
          <Route path="/izmeniStavku" component={IzmeniStavku} />
          <Route path="/novaStavka" izmena={true} component={StavkaRacuna} />
          <Route path="/kreirajKlijenta" component={KreirajKlijenta} />
          <Route path="/pretraziKlijenta" component={PretraziKlijenta} />
          <Route path="/izmeniKlijenta" component={IzmeniKlijenta} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    klijenti: state.klijenti,
    zapisnici: state.zapisnici,
  };
};

export default connect(mapStateToProps)(App);
