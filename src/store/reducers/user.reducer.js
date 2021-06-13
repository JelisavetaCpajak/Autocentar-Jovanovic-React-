import {
  LOGIN,
  UCITAJ_KLIJENTE,
  UCITAJ_ZAPISNIKE,
} from "../actions/user.action";
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
};

const userReducer = (state = initialState, action) => {
  console.log("USER_REDUCER: ", action);
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        fullUser: action.payload,
      };
    case UCITAJ_KLIJENTE:
      return {
        ...state,
        klijenti: action.payload,
      };

    case UCITAJ_ZAPISNIKE:
      return {
        ...state,
        zapisnici: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
