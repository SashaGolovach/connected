export type typeTooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export interface IProps {
  text: string;
  event?: 'hover' | 'click';
  className?: string;
  isHintHidden?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  theme?: 'dark' | 'light';
  position?: typeTooltipPosition;
}

export interface IState {
  isShown: boolean;
}
