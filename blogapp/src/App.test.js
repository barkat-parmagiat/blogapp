import { render, screen } from '@testing-library/react';
import App from './App';
import { getAllUser } from './services/authservice';

describe('Frontend testing', () => {
  it('get all user data testing', async function () {
    const response = await getAllUser();
    var data = response.data;
    expect(data[1]._id).toEqual('618ce835c0e1ebf866c1b4a3');
  });
})




