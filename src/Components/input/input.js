import { IconEyeOpen } from "Components/Icon";
import { has } from "lodash";
import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyled = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: ${props => props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .input-icon {
    position: absolute;
    right: 25px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = ({
  name = "",
  type = "text",
  children,
  hasIcon = true,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyled hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props}></input>
      {children ? <div className="input-icon">{children}</div> : null}
    </InputStyled>
  );
};

export default Input;
