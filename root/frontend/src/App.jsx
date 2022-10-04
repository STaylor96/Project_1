import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Catalog, Warehouses, PageNotFound } from './pages';
import { AppNav } from './components/Nav';

export const App = () => {
  return (
      <BrowserRouter>
        <AppNav />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/warehouses" element={<Warehouses />}/>
          <Route path="/products" element={<Catalog />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
  );
}