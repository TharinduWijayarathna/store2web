import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "@/context/AuthContext";
import SuperadminPage from "@/features/admin/SuperadminPage";
import CreateStorePage from "@/features/merchant/CreateStorePage";
import DashboardPage from "@/features/merchant/DashboardPage";
import StoreAdminRoot from "@/features/merchant/store/StoreAdminRoot";
import StoreOverviewPage from "@/features/merchant/store/StoreOverviewPage";
import StoreProductsPage from "@/features/merchant/store/StoreProductsPage";
import StoreSettingsPage from "@/features/merchant/store/StoreSettingsPage";
import HomePage from "@/features/platform/HomePage";
import LoginPage from "@/features/platform/LoginPage";
import RegisterPage from "@/features/platform/RegisterPage";
import ContentPageView from "@/features/storefront/ContentPageView";
import ProductDetailPage from "@/features/storefront/ProductDetailPage";
import StoreHomePage from "@/features/storefront/StoreHomePage";
import { StorefrontRoot } from "@/features/storefront/StorefrontRoot";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Platform marketing & auth */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Merchant dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/stores/new" element={<CreateStorePage />} />
          <Route path="/stores/:storeId" element={<StoreAdminRoot />}>
            <Route index element={<StoreOverviewPage />} />
            <Route path="products" element={<StoreProductsPage />} />
            <Route path="settings" element={<StoreSettingsPage />} />
          </Route>

          {/* Customer storefront */}
          <Route path="/s/:slug" element={<StorefrontRoot />}>
            <Route index element={<StoreHomePage />} />
            <Route path="products/:productSlug" element={<ProductDetailPage />} />
            <Route path="pages/:pageSlug" element={<ContentPageView />} />
          </Route>

          {/* Platform admin */}
          <Route path="/superadmin" element={<SuperadminPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}

export default App;
