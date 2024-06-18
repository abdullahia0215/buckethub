import { combineReducers } from "redux";

const adventureReducer = (state = [], action) => {
  if (action.type === "SET_ADVENTURE") {
    return action.payload;
  } else {
    return state;
  }
};

const cultureReducer = (state = [], action) => {
  if (action.type === "SET_CULTURE") {
    return action.payload;
  } else {
    return state;
  }
};

const serviceReducer = (state = [], action) => {
  if (action.type === "SET_SERVICE") {
    return action.payload;
  } else {
    return state;
  }
};

const growthReducer = (state = [], action) => {
  if (action.type === "SET_GROWTH") {
    return action.payload;
  } else {
    return state;
  }
};

const brigadeReducers = combineReducers({
    adventureReducer,
    cultureReducer,
    serviceReducer,
    growthReducer
})

export default brigadeReducers;