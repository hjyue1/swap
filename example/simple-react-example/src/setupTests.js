// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { swapJestInit } from '@tencent/swap';
import * as mockData from '../mocker/index.js';

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });


swapJestInit(
  {
    isMock: true,
    mockData: mockData.default,
  },
  jest
);
