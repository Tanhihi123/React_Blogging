import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
const PostTittleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;
const PostTitle = ({ children, className = "", size = "normal", to = "/" }) => {
  return (
    <PostTittleStyles size={size} className={`post-title ${className}`}>
      <Link to={`/${to}`}>{children}</Link>
      {/* Cái này xài Link chứ k xài NavLink */}
    </PostTittleStyles>
  );
};

export default PostTitle;
