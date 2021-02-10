import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Row, Spinner } from 'reactstrap';
import { useAuth } from '../../../../hooks/use-auth';
import Alert from '../../../shared/Alert/Alert';

const Login = () => {
    const history = useHistory();
    const auth = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { from } = { from: { pathname: "/dashboard" } };
    
    const login = (e) => {
        e.preventDefault();
        setIsLoading(true);
        auth.signin(email, password)
            .then(() => {
                history.push(from);
            })
            .catch(error => {
                setIsLoading(false);
                const { statusText, status } = error.response
                setError({ statusText, status });
                setIsError(true);
            });
    };
    const loading = isLoading ? <Spinner style={{marginLeft:"10px"}} /> : null;

    if (auth.user) {
        return <Redirect to={{ pathname: '/dashboard' }} />;
    }
    return (
        <Container >
            <Row className="d-flex justify-content-center">
                <Form onSubmit={login} >
                    <h1>Please Log In</h1>
                    <FormGroup row>
                        <label>
                            <p>Email</p>
                            <input aria-label="email" type="text" onChange={e => setEmail(e.target.value)} />
                        </label>
                    </FormGroup>
                    <FormGroup row>
                        <label>
                            <p>Password</p>
                            <input aria-label="password" type="password" onChange={e => setPassword(e.target.value)} />
                        </label>
                    </FormGroup>
                    <Container>
                        <Button type="submit" disabled={isLoading}>Submit</Button>
                        {loading}
                    </Container>
                </Form>
            </Row>
            {isError&&(<div style={{margin:"10px"}}>
                <Alert statusText={error.statusText} status={error.status} />
            </div>)}
        </Container>
    )
};
export default Login;