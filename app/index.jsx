import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .catch(registrationError => {
        console.error('SW registration failed: ', registrationError); // eslint-disable-line
      });
  });
}

const Index = () => {
  return (
    <div>
      <h1>Hello Boilerplate!</h1>
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
