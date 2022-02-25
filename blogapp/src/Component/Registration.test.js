import React from 'react';
import renderer from 'react-test-renderer';
// import Registration from './Registration';

test('Sign up button', () => {
  // i want test to sign up button
  const component = renderer.create(
    <button className="btn btn-primary">Sign up</button>
  );
  //how test sign up button
  let tree = component.toJSON();
  //expect to match snapshot
  expect(tree).toMatchSnapshot();
});

// test('Email field', () => {

//   const component = renderer.create(
//     <input type="email" placeholder="Email" defaultValue="email@gmail.com" />
//   );
//   expect(component).toContain('email@gmail.com');
//   expect(new Set(component)).toContain('email@gmail.com');
// });
