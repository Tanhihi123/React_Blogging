import { Button } from "Components/Button";
import { useAuth } from "Contexts/Auth-context";
import React, { useEffect, useState } from "react";
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
    url: "/",
    title: "Blog",
  },
  {
    url: "/",
    title: "Contact",
  },
];
function getLastName(name) {
  if (!name) return "User";
  const length = name.split(" ").length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfo } = useAuth();
  const [move, setMove] = useState("");
  // useEffect(() => {
  //   if (move === "Contact") {
  //     const commentElement = move === "Contact" && document.querySelector(".footer");
  //     window.scrollTo({
  //       top: commentElement.offsetTop - 200,
  //       behavior: "smooth",
  //     });
  //     setMove("");
  //   }
  // }, [move]);
  switch (move) {
    case "Contact":
      handleScroll(".footer");
      break;
      case "Contact":
        handleScroll(".footer");
        break;
    default:
      break;
  }
  function handleScroll(className) {
    const commentElement = document.querySelector(className);
    window.scrollTo({
      top: commentElement.offsetTop - 200,
      behavior: "smooth",
    });
    setMove("");
  }
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-man">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="Tanhihi" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li
                className="menu-item hover:-translate-y-1 font-bold cursor-pointer select-none"
                key={item.title}
              >
                <span onClick={() => setMove(item.title)}>{item.title}</span>
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
