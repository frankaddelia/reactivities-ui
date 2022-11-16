import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/activities/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/Store';
import LoadingComponents from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import ProtectedRoute from './ProtectedRoute';

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
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Container style={{marginTop: '7em'}}>
      {!!userStore.isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/activities" element={
            <ProtectedRoute user={userStore.isLoggedIn}>
              <ActivityDashboard />
            </ProtectedRoute>
          } />
          <Route path="/activities/:id" element={
            <ProtectedRoute user={userStore.isLoggedIn}>
              <ActivityDetails />
            </ProtectedRoute>
          } />
          <Route key={location.key} path="/createActivity" element={
            <ProtectedRoute user={userStore.isLoggedIn}>
              <ActivityForm />
            </ProtectedRoute>
          } />
          <Route key={location.key} path="/manage/:id" element={
            <ProtectedRoute user={userStore.isLoggedIn}>
              <ActivityForm />
            </ProtectedRoute>
          } />
          <Route path="/profiles/:username" element={
            <ProtectedRoute user={userStore.isLoggedIn}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/errors" element={
            <ProtectedRoute user={userStore.isLoggedIn}>
              <TestErrors />
            </ProtectedRoute>
          } />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
