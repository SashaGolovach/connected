import { IToastrItem } from '../../../typings';
import { positionType } from '../interface';
import { removeToastr, showToastr } from '../../../store/actions/toastrs';

export interface IProps {
  toastr: IToastrItem;
  removeToastr: typeof removeToastr;
  showToastr: typeof showToastr;
  position: positionType;
}
