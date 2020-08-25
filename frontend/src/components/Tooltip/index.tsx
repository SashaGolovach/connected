import React, { useState, useEffect } from 'react';
import compact from 'lodash/compact';

import { IProps } from './interface';

import HintStyles from 'styles.module.scss';

const Tooltip: React.FC<IProps> = ({
  position,
  className,
  text,
  children,
  textAlign,
  theme,
  event,
  isHintHidden,
}) => {
  const TIMEOUT_BEFORE_CLOSE: number = 3000;

  /**
   * Reference to hint div
   */
  let hint: HTMLDivElement;

  /**
   * Timeout when hint hides
   */
  let timerId: number;
  /**
   * Adds event listener for showing hint on click
   */
  const initClickEvents = () => {
    hint.onclick = () => {
      showHint();
      clearInterval(timerId);
      timerId = window.setInterval(hideHint, TIMEOUT_BEFORE_CLOSE);
    };
    hint.onmouseout = hideHint;
  };

  /**
   * Adds event listeners for showing hint on hover
   */
  const initHoverEvents = () => {
    hint.onmouseover = () => {
      if (!isHintHidden) {
        showHint();
      }
    };
    hint.onmouseout = hideHint;
  };

  const showHint = () => setShown(true);
  const hideHint = () => setShown(false);

  const [isShown, setShown] = useState<boolean>(false);
  useEffect(() => {
    if (event === 'click') {
      initClickEvents();
    } else {
      initHoverEvents();
    }
  }, []);

  const hintClasses = compact([
    HintStyles.hint,
    HintStyles[`hint--${position}`],
    className,
    isShown && HintStyles.isShown,
    theme === 'light' && HintStyles.light,
  ]).join(' ');

  return (
    <div
      style={{ textAlign }}
      ref={item => (hint = item)}
      className={hintClasses}
      aria-label={text}
    >
      {children}
    </div>
  );
};

Tooltip.defaultProps = {
  position: 'top',
  event: 'hover',
  text: '',
  theme: 'dark',
};

export default Tooltip;
