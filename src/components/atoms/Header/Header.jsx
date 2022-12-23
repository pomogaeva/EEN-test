import { FlatButton, List, ListItem } from "material-ui";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("acess_token");
    navigate("/login");
  };


  return (
    <>
      <header>
        <nav>
          <List>
            <ListItem>
              <Link to="/cameras">Cameras</Link>
            </ListItem>
          </List>
          <FlatButton type="button" onClick={handleLogOut}>
            Log out
          </FlatButton>
        </nav>
      </header>
    </>
  );
};

export default Header;
