const myBucketReducer = (state = [], action) => {
  if (action.type === "SET_MY_BUCKET") {
    return action.payload;
  } else {
    return state;
  }
};

export default myBucketReducer;