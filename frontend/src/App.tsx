import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import CreateStorePage from "@/pages/CreateStorePage";
import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import StoreAdminPage from "@/pages/StoreAdminPage";
import StorefrontPage from "@/pages/StorefrontPage";
import SuperadminPage from "@/pages/SuperadminPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/stores/new" element={<CreateStorePage />} />
          <Route path="/stores/:storeId" element={<StoreAdminPage />} />
          <Route path="/s/:slug" element={<StorefrontPage />} />
          <Route path="/superadmin" element={<SuperadminPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
