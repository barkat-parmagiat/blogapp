import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Functionality test', () => {
  test('username check', () => {
    const wrapper = render(<Login />);
    wrapper.find('input[type="text"]').simulate('change', {
      target: { name: 'email', value: 'krishan@gmail.com' },
    });
    expect(wrapper.state('email')).toEqual('krishan@gmail.com');
  });

  it('password check', () => {
    const wrapper = render(<Login />);
    wrapper.find('input[type="password"]').simulate('change', {
      target: { name: 'password', value: 'krishankant123' },
    });
    expect(wrapper.state('password')).toEqual('krishankant123');
  });
  it('login check with right data', () => {
    const wrapper = render(<Login />);
    wrapper.find('input[type="text"]').simulate('change', {
      target: { name: 'username', value: 'krishankantsinghal' },
    });
    wrapper.find('input[type="password"]').simulate('change', {
      target: { name: 'password', value: 'krishankant123' },
    });
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isLogined')).toBe(true);
  });

  it('login check with wrong data', () => {
    const wrapper = render(<Login />);
    wrapper.find('input[type="text"]').simulate('change', {
      target: { name: 'username', value: 'krishankantsinghal' },
    });
    wrapper.find('input[type="password"]').simulate('change', {
      target: { name: 'password', value: 'krishankant1234' },
    });
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isLogined')).toBe(false);
  });
  it('login button click check', () => {
    const mockCallBack = jest.fn();
    const wrapper = render(<Login />);
    wrapper.find('button[type="submit"]').simulate('click');
    // expect(mockCallBack.mock.calls.length).toEqual(1);
    expect(mockCallBack).toHaveBeenCalled();
  });
  test('Should be able to Submit form', () => {
    const mockFn = jest.fn();
    const { getByRole } = render(<Login loginEvent={mockFn} />);
    const buttonNode = getByRole('button');
    fireEvent.submit(buttonNode);
    expect(mockFn).toHaveBeenCalledTimes(1);
    //expect(mockCallBack).toHaveBeenCalled();
  });
});
