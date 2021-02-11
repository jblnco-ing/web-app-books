import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap';
import bookingsFake from '../../../../consts/bookingsFake';
import columns from '../../../../consts/columns';
import { useAuth } from '../../../../hooks/use-auth';
import bookingService from '../../../../services/booking.service';
import Alert from '../../../shared/Alert/Alert';
import FilterTable from '../../../shared/FilterTable/FilterTable';
import { Spinner } from 'reactstrap';

const getBokingsByUser = (email, token, adminemail) => {
  const data = { email };
  const config = {
    headers: {
      token,
      adminemail,
      app: 'APP_BCK'
    }
  };
  return bookingService.getBokingsByUser(data, config)
    .then(response => {
      if (response)
        return response.map((item) => ({
          bookingId: item.bookingId,
          bookingTime: item.bookingTime,
          client: `${item.tutenUserClient.firstName} ${item.tutenUserClient.lastName}`,
          client: `${item.tutenUserClient.firstName} ${item.tutenUserClient.lastName}`,
          streetAddress: item.locationId.streetAddress,
          bookingPrice: item.bookingPrice
        }));
      return response;
    });
};


const Dashboard = () => {
  const auth = useAuth();
  const { email, token } = auth?.user || { email: '', token: '' };
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [emailClient, setEmailClient] = useState('contacto@tuten.cl');

  const getData = async () => {
    setIsLoading(true);
    try {
      setIsError(false);
      const result = await getBokingsByUser(emailClient, token, email);
      setIsLoading(false);
      setBookings(result);
    } catch (error) {
      setIsLoading(false);
      const { statusText, status } = error.response
      setError({ statusText, status });
      setIsError(true);
    }
  };

  const handleSignout = () => {
    auth.signout()
      .catch(error => {
        console.log(error.response);
      });
  };

  const loading = isLoading ? <Spinner style={{ width: '7rem', height: '7rem' }} /> : null;
  const content = isError ? <Alert statusText={error.statusText} status={error.status} /> : <FilterTable columns={columns} data={bookings} />

  return (
    <Container >
      <Row className="d-flex align-items-center justify-content-between">
        <Col sm={{ size: 'auto', offset: 1 }}>
          <h2 >Dashboard</h2>
        </Col>
        <Col sm={{ size: 'auto', offset: 1 }}>
          <Button onClick={handleSignout} size="sm">Signout</Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        <Col sm={{ size: 'auto', offset: 1 }}>
          <FormGroup row>
            <label className="d-flex align-items-center">
              <span style={{ marginRight: "5px" }}>Email</span>
              <input aria-label="email" type="text" placeholder="contacto@tuten.cl"
                value={emailClient}
                onChange={e => setEmailClient(e.target.value)}
              />
              <Button onClick={getData} size="sm">Send</Button>
            </label>
          </FormGroup>
        </Col>
      </Row>
      <Container style={{ textAlign: "center" }}>
        {loading}
        {!isLoading && content}
        {!bookings.length && !isLoading && <span>Send a email.</span>}
      </Container>
    </Container>
  );
};
export default Dashboard;