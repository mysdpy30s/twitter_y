import styled from "styled-components";

export const Wrapper = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  margin: 0 auto;
  padding-top: 3rem;
`;

export const Title = styled.h1`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2em;
`;

export const Form = styled.form`
  margin-bottom: 0.7em;
`;

export const Input = styled.input`
  display: flex;
  flex-direction: column;
  color: #8a61ff;
  width: 23em;
  height: 2em;
  border: 1px solid #dfdfdf;
  margin-top: 0.7em;
  padding-left: 0.5em;
  &::placeholder {
    color: #a889ff;
  }
  &:focus {
    border: 1px solid #a889ff;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 2.5em;
  margin-top: 1.5em;
  background-color: #a889ff;
  color: #ffffff;
  font-weight: 700;
  border-radius: 5em;
  border: 0;
  cursor: pointer;
`;

export const Error = styled.span`
  text-align: center;
  font-size: 0.9em;
  font-weight: 500;
  color: #eb4e5e;
`;

export const Closebtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

export const Switcher = styled.span`
  margin-top: 1.5em;
  font-size: 0.9em;
  color: #545454;
  a {
    text-decoration: none;
    font-weight: 700;
    color: #8a66f1;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Text = styled.span`
  padding-top: 1em;
  font-size: 0.5em;
  color: #686868;
  line-height: -10%;
  a {
    text-decoration: none;
    color: #a889ff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
`;
