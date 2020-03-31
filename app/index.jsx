import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';

const HelloWorld = loadable(() => import('Components/HelloWorld'));

const Index = () => {
  return (
    <div>
      <HelloWorld message="Hello Boilerplate!" />
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
