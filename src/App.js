import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { commonRoutes, unauthRoutes, authRoutes } from './routes/routes';
import routeConfig from './config/routeConfig';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        {/* Common routes */}
        {commonRoutes.map((route, index) => {
          const Page = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <Page />
                </DefaultLayout>
              }
            />
          );
        })}

        {/* Unauth routes */}
        {!user.isLoggedIn &&
          unauthRoutes.map((route, index) => {
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}

        {/* Auth routes */}
        {user.isLoggedIn &&
          authRoutes.map((route, index) => {
            const Page = route.component;

            if (route.admin && !user.currentUser.roles.includes('ADMIN')) {
              return null;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}

        {/* Not found page */}
        <Route path='*' element={<Navigate to={routeConfig.home} />} />
      </Routes>
    </Router>
  );
}

export default App;
