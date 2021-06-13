export const LOGIN = "LOGIN";
export const UCITAJ_KLIJENTE = "UCITAJ_KLIJENTE";
export const UCITAJ_ZAPISNIKE = "UCITAJ_ZAPISNIKE";

//login action creator
export const login = (user) => {
  return { type: LOGIN, payload: user };
};

//load_all_clients action creator
export const ucitajKlijente = (klijenti) => {
  return { type: UCITAJ_KLIJENTE, payload: klijenti };
};

//load_all_zapisnici action creator
export const ucitajZapisnike = (zapisnici) => {
  return { type: UCITAJ_ZAPISNIKE, payload: zapisnici };
};
