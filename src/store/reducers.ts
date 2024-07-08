import { AppState, TOGGLE_SIDEBAR, AppActionTypes } from './types';

const initialState: AppState = {
  isSidebarOpen: false,
};

const rootReducer = (state = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};

export default rootReducer;
