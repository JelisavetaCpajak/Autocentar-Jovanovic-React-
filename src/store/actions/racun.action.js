export const DODAJ_STAVKU = "DODAJ_STAVKU";

//dodaj_stavku action creator
export const dodajStavku = (stavka) => {
  return { type: DODAJ_STAVKU, payload: stavka };
};
