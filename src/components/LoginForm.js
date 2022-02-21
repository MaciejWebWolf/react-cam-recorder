import { login } from "../functions/Login/login";

import React, { useState } from "react";
const LoginForm = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: "baciey@gmail.com",
    password: "lol123",
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
        <h3>Login status: {isLogged ? "Logged in" : "Not logged in"}</h3>
        <p>{status ? status.msg : null}</p>
        <form action="" onSubmit={formSubmit}>
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

export default LoginForm;
