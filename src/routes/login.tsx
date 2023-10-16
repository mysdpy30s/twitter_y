import styled from "styled-components";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginProps {
  closeLoginModal: () => void;
}
export default function Login({ closeLoginModal }: LoginProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || email === "" || password === "") return; // 로딩중이거나 이름/이메일/패스워드 하나라도 빈칸인 경우 함수를 바로 종료함.
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/layout"); // 홈 화면으로 이동하게 만듦.
    } catch (e) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Closebtn className="close-btn" onClick={closeLoginModal}>
        X
      </Closebtn>
      <Title>들어가기</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="이메일"
          required
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="비밀번호"
          required
          onChange={onChange}
        />
        <Button type="submit">{isLoading ? "Loading..." : "완료"}</Button>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  margin: 0 auto;
  padding-top: 3rem;
`;

const Title = styled.h1`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2em;
`;

const Form = styled.form``;

const Input = styled.input`
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

const Button = styled.button`
  width: 24em;
  height: 3em;
  margin-top: 3em;
  background-color: #a889ff;
  color: #ffffff;
  font-weight: 700;
  border-radius: 5em;
  border: 0;
  cursor: pointer;
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const Closebtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;
