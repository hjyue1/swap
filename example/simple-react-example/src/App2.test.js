// 第二种【enzyme】写法
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import App from './App';
import { waitFor } from 'rocket-swap';


const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};

test('renders react', async () => {
  const wrapper = mount(<App />);
  expect(wrapper.find('.App-header > div').at(0).text()).toBe('unknown');
  expect(wrapper.find('.code').text()).toBe('0');

  // https://github.com/enzymejs/enzyme/issues/2073
  // before the state updated
  await waitForComponentToPaint(wrapper);
  // after the state updated
  await waitFor();
  // expect(wrapper.find('.App-header > div').at(0).text()).toBe('Lazada');
  expect(wrapper.find('.code').text()).toBe('202');
});
