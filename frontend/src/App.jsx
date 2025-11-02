import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import EmailForm from './components/EmailForm';
import Header from './components/Header';
import Footer from './components/Footer';
import ApiStatus from './components/ApiStatus';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  return (
    <div className="App">
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            fontFamily: 'Lato, sans-serif',
            fontSize: '14px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e1e5e9',
            padding: '12px 16px',
            maxWidth: '350px'
          },
          success: {
            iconTheme: {
              primary: '#2e7d32',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#d32f2f',
              secondary: '#fff',
            },
          },
        }}
      />
      <Header />
      <main className="main-content">
        <div className="container">
          <ApiStatus status={apiStatus} onStatusChange={setApiStatus} />
          <EmailForm apiStatus={apiStatus} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;