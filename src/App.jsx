import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Pos from "./pages/Pos";
import SalesReport from "./pages/SalesReport";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoutes";
import PrivateRoute from "./components/routes/PrivateRoutes";
import PageNotFound from "./pages/PageNotFound";
import CogonBranch from "./pages/admin/CogonBranch";
import AkutBranch from "./pages/admin/AkutBranch";
import KulambogBranch from "./pages/admin/KulambogBranch";
import MontalbanBranch from "./pages/admin/MontalbanBranch";
import PimentelBranch from "./pages/admin/PimentelBranch";
import RamonalBranch from "./pages/admin/RamonalBranch";
import TotalSales from "./pages/admin/TotalSales";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/users" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pos" element={<Pos />} />
          <Route path="products" element={<Products />} />
          <Route path="sales-report" element={<SalesReport />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cogon-branch" element={<CogonBranch />} />
          <Route path="akut-branch" element={<AkutBranch />} />
          <Route path="kulambog-branch" element={<KulambogBranch />} />
          <Route path="montalban-branch" element={<MontalbanBranch />} />
          <Route path="pimentel-branch" element={<PimentelBranch />} />
          <Route path="ramonal-branch" element={<RamonalBranch />} />
          <Route path="total-sales" element={<TotalSales />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
