import { Loading } from "Components/Loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
const ButtonStyles = styled.button`
  height: ${(props) => props.height || "66px"};
  cursor: pointer;
  padding: 20px;
  line-height: 1;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(to right, #00a7b4, #a4d96c);
    `};
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {*} onClick Handler Onclick
 * @requires
 * @param {string} type Type of button
 * @returns
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};
Button.propsTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary"]).isRequired,
};
export default Button;
