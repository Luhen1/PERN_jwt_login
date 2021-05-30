import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import "./Register.css";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);

      }
    } catch (err){ 
      console.error(err.message);
  
    }
  }

  return (
    <div className="container">
      <Fragment>
        <h1 className="text-center my-5">Register</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="email"
            id = "email"
            className="form-control my-3"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            id = "password"
            className="form-control my-3"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            type="name"
            name="name"
            placeholder="name"
            id = "name"
            className="form-control my-3"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <div className="col text-center">
          <button className="btn btn-success btn-block">Submit</button>
          <span> </span>
          <Link className="btn btn-success btn-block" to="/login">Login</Link>
          </div>
        </form>
      </Fragment>
    </div>
  );
};

export default Register;
