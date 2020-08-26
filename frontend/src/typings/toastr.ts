export type toastrType = 'success' | 'error' | 'info' | 'warning';
export interface IToastrItem {
  id?: string;
  isVisible?: boolean;
  timeoutId?: any;
  icon?: toastrType;
  readonly type: toastrType;
  readonly title?: string;
  readonly message?: string;
}

export interface IToastrsStateObj {
  readonly [key: string]: IToastrItem;
}
