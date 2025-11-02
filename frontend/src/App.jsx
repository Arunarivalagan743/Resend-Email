import React, { useState } from 'react';
import EmailForm from './components/EmailForm';
import Header from './components/Header';
import Footer from './components/Footer';
import ApiStatus from './components/ApiStatus';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  return (
    <div className="App">
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