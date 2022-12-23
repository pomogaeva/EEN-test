import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, FlatButton } from "material-ui";
import Layout from "../../atoms/Layout/Layout";

export const baseUrl = "http://rest.cameramanager.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("access_token") || false
  );
  const navigate = useNavigate();

  const id = "dev_test";
  const secret = "3H1Bf6mCctIgpCuzvrnyekf3VhAUEnKJ";
  const encoded = window.btoa(`${id}:${secret}`);

  async function login() {
    try {
      const data = await fetch(
        `${baseUrl}/oauth/token?grant_type=password&scope=write&username=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        }
      ).then((res) => {
        return res.json();
      });
      setAuthenticated(true);
      localStorage.setItem("access_token", data.access_token);
      if (authenticated) {
        navigate("/cameras");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  if (!authenticated) {
    return (
      <Layout>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FlatButton type="submit">Log In</FlatButton>
        </form>
      </Layout>
    );
  } else {
    return <Navigate replace to="/cameras" />;
  }
}

export default Login;
