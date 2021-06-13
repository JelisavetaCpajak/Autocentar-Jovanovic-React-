import DODAJ_STAVKU from "../actions/racun.action";

export const dodajStavku = (stavka) => {
  return {
    type: DODAJ_STAVKU,
    payload: stavka,
  };
};
