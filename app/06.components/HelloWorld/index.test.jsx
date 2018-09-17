import React from 'react';
import { shallow, mount } from 'enzyme';

import HelloWorld from './index';

describe('HelloWorld', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<HelloWorld message="Hello Boilerplate!" />);
  });

  test('should render a message from props', () => {
    expect(wrapper.props().message).toBe('Hello Boilerplate!');
  });
});
