import * as actions from "./actions";

export const initialState = {
  searchLists: [],
  isLoading: false,
  pageToken: null,
  errorMessage: null,
  hasMore: true,
};

function todo(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SEARCHLISTS:
      return {
        ...state,
        searchLists: [...state.searchLists, ...action.payload.items],
        pageToken: action.payload?.nextPageToken,
        errorMessage: action.payload.errorMessage,
        hasMore: action.payload?.nextPageToken,
        isLoading: false,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        hasMore: true,
      };
    case "LOADINGANDCLEAN":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        searchLists: [],
        pageToken: null,
        hasMore: true,
      };
    default:
      return state;
  }
}

export default todo;
