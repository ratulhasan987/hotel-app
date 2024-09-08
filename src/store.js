

// export default store;
import { createStore } from 'redux';

// Initial state
const initialState = {
  isAuthenticated: false,
  token: null,
};

// Reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(authReducer);

export default store;
