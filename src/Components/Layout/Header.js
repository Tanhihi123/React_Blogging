import { Button } from "Components/Button";
import { useAuth } from "Contexts/Auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const HeaderStyles = styled.header`
  padding: 30px 0;
  .header-man {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }
  .header-right {
    margin-left: auto;
    flex: 1;
  }
  .search {
    position: relative;
    margin-left: auto;
    padding: 12px;
    border: 1px solid ${(props) => props.theme.primary};
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  .header-button {
    margin-left: 20px;
    height: 48px;
  }
`;
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];
function getLastName(name) {
  if(!name) return "User"
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfo } = useAuth();
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-man">
          <NavLink to="/">
            <img srcSet="./logo.png 2x" alt="Tanhihi" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item hover:-translate-y-1 font-bold" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          {!userInfo ? (
            <Button
              style={{ maxWidth: "180px" }}
              className="header-button"
              to={"/sign-up"}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              style={{ maxWidth: "180px" }}
              className="header-button"
              to={"/dashboard"}
            >
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
