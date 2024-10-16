enum Types {
  
}

type State = {

};

type Action = {
  type: string;
};

function reducer(state: State, action: Action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default reducer;