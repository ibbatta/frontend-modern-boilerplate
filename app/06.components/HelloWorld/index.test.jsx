import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HelloWorld from '../../../app/06.components/HelloWorld';

describe('HelloWorld', () => {
  describe('init component', () => {
    test('shoul render the component', () => {
      const wrapper = shallow(<HelloWorld />);
      expect(wrapper).toHaveLength(1);
    });

    test('should match the snapshot', () => {
      const wrapper = shallow(<HelloWorld />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('message props', () => {
    test('should render a message from props', () => {
      const wrapper = mount(<HelloWorld />);
      expect(wrapper.prop('message')).toBeDefined();
    });

    test('should render default message', () => {
      const message = undefined;
      const wrapper = mount(<HelloWorld message={message} />);
      expect(wrapper.prop('message')).toEqual('Hello World!');
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('should render a specific message', () => {
      const message = 'Hello Boilerplate!';
      const wrapper = mount(<HelloWorld message={message} />);
      expect(wrapper.prop('message')).toEqual(message);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
