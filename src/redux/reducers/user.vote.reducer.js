const userVoteReducer = (state = [], action) => {
    if (action.type === "SET_MY_VOTES") {
      return action.payload;
    } else {
      return state;
    }
  };
  
  export default userVoteReducer;