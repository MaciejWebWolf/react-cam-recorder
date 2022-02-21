import { login } from "../functions/Login/login";

import React, { useState } from "react";
const RegisterForm = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    const obj = JSON.parse(JSON.stringify(inputValue));
    obj[name] = value;
    setInputValue(obj);
  }

  function formSubmit(e) {
    e.preventDefault();
    login(inputValue, setStatus, setIsLogged);
  }
  //   console.log(inputValue);
  if (!isLogged) {
    return (
      <div>
        <h3>Register</h3>
        <p>{status ? status.msg : null}</p>
        <form action="" onSubmit={formSubmit}>
          <label htmlFor="email">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputValue.name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputValue.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputValue.password}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  } else return null;
};

export default RegisterForm;
