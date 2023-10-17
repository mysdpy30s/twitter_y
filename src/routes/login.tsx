import { auth } from "../firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  Button,
  Closebtn,
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

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
    setError("");
    if (isLoading || email === "" || password === "") return; // 로딩중이거나 이름/이메일/패스워드 하나라도 빈칸인 경우 함수를 바로 종료함.
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/layout/home"); // 홈 화면으로 이동하게 만듦.
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
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
        <Button type="submit">{isLoading ? "들어가는 중..." : "완료"}</Button>
      </Form>
      {error.includes("auth/invalid-login-credentials") && (
        <Error>이메일 또는 비밀번호가 다릅니다.</Error>
      )}
      <Switcher>
        트위터 계정이 없으신가요?{" "}
        <Link to="/create-account">계정 만들기 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
