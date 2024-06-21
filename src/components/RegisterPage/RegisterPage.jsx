import React from "react";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();
  useEffect(() => {
    document.body.classList.add("animated-background");
    return () => {
      document.body.classList.remove("animated-background");
    };
  }, []);
  return (
    <div>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn"
          style={{backgroundColor: 'gray'}}
          onClick={() => {
            history.push("/login");
          }}
        >
          Or Login
        </button>
      </center>
    </div>
  );
}

export default RegisterPage;
