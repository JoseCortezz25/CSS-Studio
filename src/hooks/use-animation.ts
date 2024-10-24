enum Actions {
  ADD_KEYFRAME = 'ADD_KEYFRAME',
  UPDATE_KEYFRAME = 'UPDATE_KEYFRAME',
  DELETE_KEYFRAME = 'DELETE_KEYFRAME'
}

interface Keyframe {
  time: number;
  translateX: number;
  translateY: number;
  opacity: number;
  width: number;
  height: number;
  background: string;
  color: string;
}

type AddKeyframeAction = {
  type: 'ADD_KEYFRAME';
  payload: Keyframe;
};

type UpdateKeyframeAction = {
  type: 'UPDATE_KEYFRAME';
  payload: Partial<Keyframe> & { time: number };
};

type DeleteKeyframeAction = {
  type: 'DELETE_KEYFRAME';
  payload: { time: number };
};

type AnimationAction = AddKeyframeAction | UpdateKeyframeAction | DeleteKeyframeAction;

const initialState: Keyframe[] = [];

function animationReducer(state: Keyframe[], action: AnimationAction): Keyframe[] {
  switch (action.type) {
    case Actions.ADD_KEYFRAME:
      return [...state, action.payload];

    case Actions.UPDATE_KEYFRAME:
      return state.map((keyframe) =>
        keyframe.time === action.payload.time ? { ...keyframe, ...action.payload } : keyframe
      );

    case Actions.DELETE_KEYFRAME:
      return state.filter((keyframe) => keyframe.time !== action.payload.time);

    default:
      return state;
  }
}

export { animationReducer, initialState };