import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LOGIN_ROUTE, ERROR_ROUTE } from './constants/routes';
import Login from './pages/login';
import PageNotFound from './pages/pageNotFound';
import Error from './pages/error';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<Error />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
