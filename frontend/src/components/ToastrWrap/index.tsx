import React from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../store/hooks';
import { removeToastr, showToastr } from '../../store/actions/toastrs';

import { IProps } from './interface';

import Toastr from './Toastr';

import Styles from './styles.module.scss';

const ToastrWrap: React.FC<IProps> = props => {
  const wrapper = [Styles.toastrWrap, Styles[props.position]].join(' ');
  const toastrs = useSelector(state => state.toastrs);
  const dispatch = useDispatch();
  const toastrIds = Object.keys(toastrs);
  const toastrsList = toastrIds.reduceRight((accumulator, currentValue) => {
    return accumulator.concat(
      <Toastr
        key={currentValue}
        toastr={toastrs[currentValue]}
        showToastr={toastrId => dispatch(showToastr(toastrId))}
        removeToastr={toastr => dispatch(removeToastr(toastr))}
        position={props.position}
      />
    );
  }, []);

  return <div className={wrapper}>{toastrsList}</div>;
};

ToastrWrap.defaultProps = {
  position: 'topRight',
};

export default ToastrWrap;
