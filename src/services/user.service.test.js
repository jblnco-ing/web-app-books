import user from './user.service';
// Data test
const data = {
  email: 'testapis@tuten.cl',
};
const config = {
  headers: {
    app: 'APP_BCK',
    password: '1234'
  }
}

test('can signin user with testapis@tuten.cl', async () => {
  const response = await user.signin(data, config);
  expect(response).toBeTruthy();
  expect(user.token).toEqual(response.data.sessionTokenBck);
});

test('can signout user with testapis@tuten.cl', async () => {
  user.signout();
  expect(user.token).toBeNull();
});