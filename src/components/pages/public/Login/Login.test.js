import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../../App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

const setup = ()=>{
    const {getByLabelText, getByText} = renderWithRouter(<App />, { route: '/' })
    ;
    const email = getByLabelText('email');
    const password = getByLabelText('password');
    const submit = getByText('Submit');
    return({
      email,
      password,
      submit
    });
}

test('login user with testapis@tuten.cl', async () => {
    const {email, password,submit}=setup();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
    fireEvent.change(email,{target:{value:'testapis@tuten.cl'}});
    fireEvent.change(password,{target:{value:'1234'}});
    fireEvent.click(submit);
    await waitFor(() => screen.getByText('Dashboard'));
    expect(localStorage.getItem('user')).toBeTruthy();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
});