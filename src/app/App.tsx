// import React from 'react';
// import { testOtpLogin } from "./otp-test";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router/AppRouter';
import { GlobalLoadingProvider } from '../shared/provider/GlobalLoadingProvider';
import { ToastProvider } from '../ui/toast/ToastProvider';



const App = () => {
  return (
  
    
   <BrowserRouter>
   <GlobalLoadingProvider >
    <ToastProvider>
      <AppRouter />
      </ToastProvider>
    </GlobalLoadingProvider>
    </BrowserRouter>
  );

};

export default App;