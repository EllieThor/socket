const initialState = {
  vacations: [],
  user: [],

  // vacation form
  vacationFormButtonsStatus: 0,
  vacationToEdit: {},

  // modal content
  content: 1,
};

function rootReducer(state = initialState, action) {
  console.log("root:", action.type, ", ", action.payload);

  switch (action.type) {
    case "updateVacations":
      state = { ...state, vacations: action.payload };
      break;
    case "updateUser":
      state = { ...state, user: action.payload };
      break;

    // vacation form
    case "updateVacationButtonsForm":
      state = { ...state, vacationFormButtonsStatus: action.payload };
      break;
    case "updateVacationToForm":
      state = { ...state, vacationToEdit: action.payload };
      break;

    case "updateNumberOfStars":
      state = { ...state, numberOfStars: action.payload };
      break;
    // modal
    case "updateContent":
      state = { ...state, content: action.payload };
      break;
  }
  return state;
}

export default rootReducer;
