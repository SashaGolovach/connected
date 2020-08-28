import React, { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'src/store/hooks';
import { getMatch } from 'src/store/actions/users';

import Sidebar from 'src/components/Sidebar';

import { IProps } from './interface';

import Styles from './styles.module.scss';

import { Pie } from 'react-chartjs-2';

const Match: FC<IProps> = props => {
  const dispatch = useDispatch();

  const score = useSelector(state => state.users.score);

  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 10,
      },
    },
    tooltips: {
      enabled: false,
    },
  };

  useEffect(() => {
    (async () => {
      await dispatch(getMatch(props.match.params.id));
    })();
  }, []);

  return (
    <Sidebar>
      <div className={Styles.matchWrap}>
        <h2 className={Styles.title}>Congratulations 🎉</h2>
        <Pie data={data} height={300} width={300} options={options} />
      </div>
    </Sidebar>
  );
};

export default Match;
