import React, { useEffect } from 'react';
import compact from 'lodash/compact';
import Button from '@material-ui/core/Button';

import { IProps } from './interface';

import Styles from './styles.module.scss';
import { toastrType } from '../../../typings';

import SuccessIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import Close from '@material-ui/icons/Close';

const Toastr: React.FC<IProps> = props => {
  const toastrTitle: { [x in toastrType]: React.ReactNode } = {
    info: 'Info',
    warning: 'Warning',
    success: 'Success',
    error: 'Error',
  };
  const toastrMessage: { [x in toastrType]: React.ReactNode } = {
    info: 'Info',
    warning: 'Warning',
    success: 'Success',
    error: 'Oops, something went wrong!',
  };
  const toasrtIcon: { [x in toastrType]: React.ReactNode } = {
    info: <InfoIcon />,
    warning: <WarningIcon />,
    success: <SuccessIcon />,
    error: <ErrorIcon />,
  };

  useEffect(() => {
    setTimeout(() => props.showToastr(props.toastr.id), 30);
  }, []);

  const { isVisible, icon, type, title, message } = props.toastr;
  const classes = compact([
    Styles.toastr,
    Styles[type],
    isVisible && Styles.visible,
    Styles[props.position],
  ]).join(' ');

  return (
    <div className={classes}>
      <div className={Styles.toastrContainer}>
        <span className={Styles.toastrStatusIcon}>
          {toasrtIcon[icon || type]}
        </span>
        <div className={Styles.toastrContent}>
          <p className={Styles.toastrTitle}>{title || toastrTitle[type]}</p>
          <p className={Styles.toastrMessage}>
            {message || toastrMessage[type]}
          </p>
        </div>
      </div>
      <Button onClick={() => props.removeToastr(props.toastr)}>
        <Close />
      </Button>
    </div>
  );
};

Toastr.defaultProps = {
  toastr: {
    type: 'error',
  },
};

export default Toastr;
