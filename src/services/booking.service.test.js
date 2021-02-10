import booking from "./booking.service";

// Data test
const data = {
  email: 'testapis@tuten.cl',
};
const config = {
  headers: {
    app: 'APP_BCK',
    adminemail:'testapis@tuten.cl',
    token: 'testapis@tuten.cliqjmasr2qarshsa45doao83b0f'
  }
}

test('can get bookings with testapis@tuten.cl', async () => {
  const response = await booking.getBokingsByUser(data,config);
  expect(response).toBeTruthy();
});