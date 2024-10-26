export interface Keyframe {
  position: number;
  time: string;
  properties: {
    translateX?: string;
    translateY?: string;
    opacity?: string;
    width?: string;
    height?: string;
    background?: string;
    color?: string;
  };
}

export enum ButtonActions {
  PLAY = 'play',
  PAUSE = 'pause',
  REWIND = 'rewind',
  REPLAY = 'replay',
};