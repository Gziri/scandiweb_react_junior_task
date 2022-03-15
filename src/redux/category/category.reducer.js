const INITIAL_STATE = {
  category: "all",
};
const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_CATEGORY":
      return { category: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
