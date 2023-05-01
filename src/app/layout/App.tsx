import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/Store';
import LoadingComponents from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import HomePage from '../../features/activities/home/HomePage';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) {
    return <LoadingComponents content='Loading app...' />
  }

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      { location.pathname === '/' ? <HomePage /> : (
        <>
          <Container style={{marginTop: '7em'}}>
          {!!userStore.isLoggedIn && <NavBar />}
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
