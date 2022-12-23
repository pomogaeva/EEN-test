import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { List, ListItem, TextField } from "material-ui";
import { useSelector, useDispatch } from "react-redux";
import { fetchCameras } from "../../../slice/camerasSlice";
import Layout from "../../atoms/Layout/Layout";
import { baseUrl } from "../Login/Login";

function Cameras() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("access_token");
    if (loggedIn) setAuthenticated(true);
  }, []);

  const [user, setUser] = useState(null);
  const acc_token = localStorage.getItem("access_token");

  const createNewSession = async (token) => {
    try {
      const data = await fetch(`${baseUrl}/rest/v2.0/users/self/sessions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        return res.json();
      });
      setUser(data.session.userId);
    } catch (error) {
      console.error(error);
    }
  };

  if (authenticated) {
    createNewSession(acc_token);
  }

  const cameras = useSelector((state) => state.cameras);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCameras());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    return (
      <Layout>
        <List>
          {cameras.map((camera) => (
            <ListItem key={camera.id}>
              <Link to={`/cameras/${camera.id}`}>
                <TextField primary={camera.name} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Layout>
    );
  } else {
    return <Navigate replace to="/login" />;
  }
}

export default Cameras;
