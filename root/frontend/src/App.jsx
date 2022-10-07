import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Catalog, Warehouses, Warehouse_Id, PageNotFound } from './pages';
import { AppNav } from './components/Nav';

export const App = () => {
  return (
      <BrowserRouter>
        <AppNav />
        <Routes>
          <Route path="/" element={<Warehouses />}/>
          <Route path="/products" element={<Catalog />}/>
          <Route path="/:id" element={<Warehouse_Id />}/>
          <Route path="*" element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
  );
}