import styled from "styled-components";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface GoogleButtonProps {
  text: string;
}

export default function GoogleButton({ text }: GoogleButtonProps) {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="google.svg" alt="google-logo" />
      {text}
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 2.5em;
  margin-top: 1em;
  border-radius: 5em;
  background-color: white;
  border: 1px solid #ececec;
  color: #888888;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 1.5em;
  margin-right: 0.5em;
`;
