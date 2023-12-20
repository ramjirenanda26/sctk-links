import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import FormPage from './Pages/FormPage/FormPage';
import MapPage from './Pages/MapPage/MapPage';
import LoginPage from './Pages/AuthPage/loginPage';
import RegisterPage from './Pages/AuthPage/registerPage';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import ForgotPage from './Pages/AuthPage/forgotPassword';
import PageNotFound from './Pages/NotFound/PageNotFound';
import DashRegistrationPage from './Pages/DashboardPage/DashboardPage';
import DashReportPage from './Pages/DashboardPage/DashRegistPage';
import DashDetailPage from './Pages/DashboardPage/DashDetailRegistPage';
import ListReportProfile from './Pages/ProfilePage/listRegistration';
import UserProfile from './Pages/ProfilePage/userProfile';
import ChangePasswordProfile from './Pages/ProfilePage/changePassword';
import DashAdminPage from './Pages/DashboardPage/DashAdminPage';
import DashUserPage from './Pages/DashboardPage/DashUserPage';

const App = () => {
  const RequireAuth = ({ children, requiredRole }) => {
    const { currentUser } = useContext(AuthContext);

    // Check if the user role matches any of the required roles
    const isAuthorized = Array.isArray(requiredRole) && requiredRole.includes(currentUser?.role);

    if (isAuthorized) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPage />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="profile">
            <Route
              index
              element={
                <RequireAuth requiredRole={['user']}>
                  <UserProfile />
                </RequireAuth>
              }
            />
            <Route path="list">
              <Route
                index
                element={
                  <RequireAuth requiredRole={['user']}>
                    <ListReportProfile />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="change">
              <Route
                index
                element={
                  <RequireAuth requiredRole={['user']}>
                    <ChangePasswordProfile />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>

          <Route path="form">
            <Route
              index
              element={
                <RequireAuth requiredRole={['user']}>
                  <FormPage />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="dashboard">
            <Route
              index
              element={
                <RequireAuth requiredRole={['admin']}>
                  <DashRegistrationPage />
                </RequireAuth>
              }
            />
            <Route path="registration">
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin']}>
                    <DashReportPage />
                  </RequireAuth>
                }
              />
              <Route
                path="detail/:id"
                element={
                  <RequireAuth requiredRole={['admin']}>
                    <DashDetailPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="admin">
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin']}>
                    <DashAdminPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="user">
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin']}>
                    <DashUserPage />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
