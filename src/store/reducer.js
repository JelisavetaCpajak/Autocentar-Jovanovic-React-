import * as actionTypes from "./action";
// id_zaposlenog: "04f0537a-3466-4d56-8c1c-ec692ce80d26"
// ime: "Jelisaveta"
// korisnicko_ime: "jelisaveta"
// prezime: "Cpajak"
// sifra: "Jelisaveta16"

const initialState = {
  fullUser: {
    id_zaposlenog: "",
    ime: "",
    prezime: "",
    korisnicko_ime: "",
    sifra: "",
  },
  klijenti: [],
  zapisnici: [],
  akcija: "",
  trenutniPath: "",
  listaStavki: [],
  racunZaIzmenu: {},
  stavkaZaIzmenu: {},
  novaStavkaIzIzmene: false,
  listaRacunaZaKrit: [],
  odabranKriterijum: false,
  klijentZaIzmenu: {},
};

const reducer = (state = initialState, action) => {
  console.log("USER_REDUCER: ", action);

  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        fullUser: action.user,
      };
    case actionTypes.UCITAJ_KLIJENTE:
      console.log("UCITAJ_KLIJENTE: ", action);
      return {
        ...state,
        klijenti: action.klijenti,
      };
    case actionTypes.UCITAJ_ZAPISNIKE:
      return {
        ...state,
        zapisnici: action.zapisnici,
      };

    case actionTypes.DODAJ_STAVKU:
      let stara = state.listaStavki;
      stara.push(action.data);
      let nova = stara;
      console.log("reducer -> DODAJ_STAVKU ", nova);
      return {
        ...state,
        listaStavki: nova,
      };

    case actionTypes.SET_RACUN_ZA_IZMENU:
      return {
        ...state,
        racunZaIzmenu: action.racun,
      };
    //{ type: actionTypes.IZMENI_STAVKU, stavka: stavka }

    case actionTypes.SET_STAVKA_IZMENI:
      console.log("[reducer->SET_STAVKA_IZMENI] stavka: ", action.stavka);
      return {
        ...state,
        stavkaZaIzmenu: action.stavka,
      };

    case actionTypes.IZMENI_RACUN:
      console.log(
        "[reducer->IZMENI_RACUN] racun(koji se menja) pre izmene: ",
        state.racunZaIzmenu
      );
      return {
        ...state,
        racunZaIzmenu: action.racun,
      };

    case actionTypes.NOVA_STAVKA_IZ_IZMENE:
      return {
        ...state,
        novaStavkaIzIzmene: true,
      };
    case actionTypes.DODAJ_NOVU_STAVKU_IZ_IZMENE:
      let listaStavki = state.racunZaIzmenu.nizStavki;
      listaStavki.push(action.stavka);
      return {
        ...state,
        racunZaIzmenu: {
          ...state.racunZaIzmenu,
          nizStavki: listaStavki,
        },
      };

    case actionTypes.SET_LISTA_RACUNA_ZA_KRITERIJUM:
      return {
        ...state,
        listaRacunaZaKrit: action.listaRacunaZaKrit,
      };

    case actionTypes.SET_KRITERIJUM:
      return {
        ...state,
        odabranKriterijum: action.val,
      };

    case actionTypes.SET_KLIJENT_ZA_IZMENU:
      return {
        ...state,
        klijentZaIzmenu: action.klijent,
      };

    default:
      return state;
  }
};

export default reducer;
