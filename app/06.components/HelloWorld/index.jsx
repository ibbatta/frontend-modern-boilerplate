import React from 'react';
import PropTypes from 'prop-types';

const HelloWorld = ({ message }) => {
  return (
    <div className="helloworld">
      <h1 className="helloworld__message">{message}</h1>
    </div>
  );
};

HelloWorld.propTypes = {
  message: PropTypes.string
};

HelloWorld.defaultProps = {
  message: 'Hello World!'
};

export default HelloWorld;
