import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LOGIN_ROUTE, ERROR_ROUTE, REGISTER_ROUTE, HOME_ROUTE } from './constants/routes';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import PageNotFound from './pages/pageNotFound';
import Error from './pages/error';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<Error />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
