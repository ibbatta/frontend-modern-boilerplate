import React from 'react';
import { shallow } from 'enzyme';

import HelloWorld from '../../../app/06.components/HelloWorld';

describe('HelloWorld', () => {
  test('should render a message from props', () => {
    const message = 'Hello Boilerplate!';
    const wrapper = shallow(<HelloWorld message={message} />);
    expect(wrapper.find('.helloworld__message').get(0).props.children).toEqual(
      message
    );
  });
});
