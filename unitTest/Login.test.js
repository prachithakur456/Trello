import React from 'react';
import { shallow } from 'enzyme';
import Login from '../src/components/Login';

describe('Test case for testing login', () => {
    const wrapper = shallow(<Login />);
    test('username check', () => {
        wrapper.find('input[type="email"]').simulate('change', { target: { name: 'email', value: 'prachi@momoshub.com' } });
        expect(wrapper.state('username')).toEqual('krishankantsinghal');
    })
    it('password check', () => {
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '123456' } });
        expect(wrapper.state('password')).toEqual('krishankant123');
    })
    it('login check with right data', () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'prachi@momoshub.com' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '123456' } });
        wrapper.find('form').simulate('submit');
        expect(wrapper.state('loggedIn')).toBe(true);
    })
    it('login check with wrong data', () => {
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'email', value: 'prachi@momoshub.com' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'password', value: '123456' } });
        wrapper.find('form').simulate('submit');
        expect(wrapper.state('loggedIn')).toBe(false);
    })
})