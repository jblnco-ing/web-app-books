import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import bookingsFake from '../../../../consts/bookingsFake';
import columns from '../../../../consts/columns';
import { useAuth } from '../../../../hooks/use-auth';
import bookingService from '../../../../services/booking.service';
import Alert from '../../../shared/Alert/Alert';
import FilterTable from '../../../shared/FilterTable/FilterTable';
import { Spinner } from 'reactstrap';

const getBokingsByUser = (email, token, adminemail = '') => {
  const data = { email };
  const config = {
    headers: adminemail ? {
      token,
      adminemail,
      app: 'APP_BCK'
    } : {
        token,
        app: 'APP_BCK'
      }
  }
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
  const { email, token } = auth?.user || {email:'',token:''};
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isResolved, setIsResolved] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        setIsError(false);
        const result = isResolved ? await getBokingsByUser(email, token, email) : await getBokingsByUser(email, token);
        setIsLoading(false);
        setBookings(result);
      } catch (error) {
        setIsLoading(false);
        const { statusText, status } = error.response
        setError({ statusText, status });
        setIsError(true);
      }
    };
    getData();
  }, [email, token, isUpdate]);
  const handleResolve = () => {
    setIsResolved(true);
    setIsUpdate(!isUpdate);
  };
  const handleFakeData = () => {
    setBookings(bookingsFake);
    setIsError(false);
    setIsLoading(false);
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
      <Row>
        <Col sm={{ size: 'auto', offset: 1 }}><h2 >Dashboard</h2></Col>
        <Col sm={{ size: 'auto', offset: 1 }}><Button onClick={handleSignout}>Signout</Button></Col>
      </Row>
      <Container style={{textAlign:"center"}}>
      {loading}
      {!isLoading && content}
      </Container>
      <Button style={{margin:"10px"}} onClick={handleResolve}>Resolve adminemail</Button>
      <Button style={{margin:"10px"}} onClick={handleFakeData}>Use Fake Data</Button>
    </Container>
  );
};
export default Dashboard;