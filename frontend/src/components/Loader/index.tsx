import React from 'react';

import { IProps } from './interface';
import Styles from './styles.module.scss';
import { useSelector } from '../../store/hooks';

const Loader: React.FC<IProps> = () => {
  const isShown = useSelector(state => state.loader.isLoading);
  const message = useSelector(state => state.loader.loaderMessage);
  return (
    isShown && (
      <div className={Styles.loaderWrapper}>
        <div className={Styles.loader}>
          <div className={Styles.loaderSpinner} />
          <div className={Styles.loaderMessage}>{message}</div>
        </div>
      </div>
    )
  );
};

export default Loader;
