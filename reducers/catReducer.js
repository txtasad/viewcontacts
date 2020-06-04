import {ADD_CAT, DELETE_CAT, MOD_CAT,ADD_ALL} from '../actions/types';

const initialState = {
  catList: []
}

const catReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAT:
      return {
        ...state,
        catList: state.catList.concat({
          key: Math.random(),
          name: action.name,
          phone: action.phone,
          type: action.type
        })
      };
    case DELETE_CAT:
      return {
        ...state,
        catList: state.catList.filter((item) =>
          item.key !== action.key)
      };
      case MOD_CAT:
        return {
          ...state,
          catList: state.catList.map((item) =>
              item.key === action.key ? {key: item.key,
                name: action.name,
                phone: action.phone,
                type: action.type} : item)
        };
        case ADD_ALL:
          return {
            ...state,
            catList: action.con
          };
    default:
      return state;
  }
}

export default catReducer;
