import React from 'react';
import {} from '@testing-library/react';
import { getAllUser } from './authservice';

describe('Frontend testing', () => {
  it('Verify response payload', async () => {
    const response = await getAllUser();
    var data = response.data;
    expect(data).not.toEqual(0);
  }); 
});
