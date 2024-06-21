import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css'; // Import the CSS file

function LoginPage() {
  const history = useHistory();

  useEffect(() => {
    document.body.classList.add('animated-background');
    return () => {
      document.body.classList.remove('animated-background');
    };
  }, []);

  return (
    <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
