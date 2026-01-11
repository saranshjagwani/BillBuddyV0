import { Routes, Route } from "react-router-dom";
import Login from "../auth/pages/Login";
import StockPage from "../stock/pages/StockPage";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import ShopSetup from "../shop/pages/ShopSetup";
import Contact from "../contact/pages/Contact";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layout/AuthLayout";
import AppLayout from "../layout/AppLayout";
import NavLayout from "../layout/NavLayout";
import {TermsContent} from "../pages/TermsContent";
import { PrivacyContent } from "../pages/PrivacyContent";


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/shop-setup" element={<ShopSetup />} />
      </Route>

            <Route element={<AppLayout />}>
            <Route element={<NavLayout />}>
            <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      
      
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/terms" element={<TermsContent />} />
      <Route path="/privacy" element={<PrivacyContent />} />
      </Route>
      <Route
        path="/stock"
        element={
          <ProtectedRoute>
            <StockPage />
          </ProtectedRoute>
        }
      />
      </Route>

    </Routes>
  );
};

export default AppRouter;
