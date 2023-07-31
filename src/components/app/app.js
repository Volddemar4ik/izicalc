import { Routes, Route } from 'react-router-dom'
import NotFound from '../../pages/404';
import Mainpage from '../../pages/main';
import Layouts from '../layouts/layouts';
import MainDataProvider from '../../hoc/main-data';

export const mainEndpoint = 'https://seashell-app-88ewe.ondigitalocean.app/'
export const proxyEndpoind = 'https://cors-anywhere.herokuapp.com/'

function App() {
  return (
    <MainDataProvider>
      <Routes>
        <Route path='/' element={<Layouts />}>
          <Route index element={<Mainpage />} />
          <Route path='/:id' element={<Mainpage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </MainDataProvider>
  );
}

export default App;
