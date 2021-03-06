import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import LoginForm from '../../components/LoginForm';
import RegForm from '../../components/RegForm';
import { LocalStorage } from '../../utils';
import styles from './index.module.scss';
import { connect, ConnectedProps } from 'react-redux';
import { AppStore } from '../../store';
import { keepLogin } from '../../store/user/actions';
import {Image} from "antd";

const mapState = ({ user }: AppStore) => ({
  user,
});

const mapDispatch = {
  keepLogin,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Home: FC<RouteComponentProps & PropsFromRedux> = ({
  history,
  user,
  keepLogin,
}) => {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const userId = LocalStorage.get('userId');
    const username = LocalStorage.get('username');
    const info1 = LocalStorage.get('info1');
    if (userId && username&&info1) {
      if (!user.userId) {
        keepLogin({ userId, username, errMsg: '' ,position:'',info1:''});
      } else {
        history.push('/home');
      }
    }
  }, [user]);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Goods List</h1>
        {showLogin ? <LoginForm /> : <RegForm />}
        <p className={styles.tip}>
          <span>Or&nbsp;&nbsp;</span>
          <span onClick={toggleForm}>
            {showLogin ? '现在注册!' : '已有账号!'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default connector(withRouter(Home));
