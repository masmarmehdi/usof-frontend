const LOGIN_REDUCER = (state, action) => {
  switch (action.type) {
    case "START_LOGIN_SESSION":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "SUCCESS_LOGIN":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default LOGIN_REDUCER;
