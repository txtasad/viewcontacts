import { ADD_CAT, DELETE_CAT,MOD_CAT,ADD_ALL } from './types';

export const addCat = (n,p,t) => (
  {
      type: ADD_CAT,
      name: n,
      phone:p,
      type:t
  }
);

export const deleteCat = (key) => (
  {
    type: DELETE_CAT,
    key: key
  }
);

export const updateCat = (key,n,ps,t) => (
    {
        type: MOD_CAT,
        key: key,
        name: n,
        phone:p,
        type:t
    }
);


export const addAll = (con) => (
  {
    type: ADD_ALL,
    con: con
  }
);