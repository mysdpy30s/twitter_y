import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Button,
  Closebtn,
  Error,
  Form,
  Input,
  Switcher,
  Text,
  Title,
  Wrapper,
} from "../components/auth-components";

interface SignupProps {
  closeSignupModal: () => void;
}

export default function CreateAccount({ closeSignupModal }: SignupProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "phonenum") {
      setPhonenum(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return; // 로딩중이거나 이름/이메일/패스워드 하나라도 빈칸인 경우 함수를 바로 종료함.
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); // createUserWithEmailAndPassword 설명에 따르면 회원가입이 성공할 경우 UserCredential이라는 Promise를 반환하게 됨. 이 값을 그대로 받아주기 위해 const credentials라는 변수로 선언
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name, // 파이어베이스의 사용자는 이름을 포함하여 작은 아바타 이미지의 URL을 가지는 미니 프로필을 얻게 됨. 이 점을 고려하여, 계정을 만든 후 사용자 이름을 프로필에 업데이트 하도록 해당 코드를 작성.
      });
      navigate("/layout/home"); // 홈 화면으로 이동하게 만듦.
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Closebtn className="close-btn" onClick={closeSignupModal}>
        X
      </Closebtn>
      <Title>계정 만들기</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="이름"
          required
          onChange={onChange}
        />
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
        <Input
          type="tel"
          name="phonenum"
          value={phonenum}
          placeholder="휴대폰번호"
          required
          onChange={onChange}
        />
        <Text>
          가입하면 <a href="#">쿠키 사용</a>을 포함해 <a href="#">이용약관</a>{" "}
          및 <a href="#">개인정보 처리방침</a>에 동의하게 됩니다. 트위터는
          계정을 안전하게 보호하고 광고를 포함한 맞춤 서비스를 제공하는 등
          트위터 개인정보 처리방침에 명시된 목적을 위해 이메일 주소 및 전화번호
          등의 내 연락처 정보를 사용할 수 있습니다.{" "}
          <a href="#">자세히 알아보기.</a> 이메일 또는 전화번호를 제공하시면
          다른 사람들이 이 정보로 내 계정을 찾을 수 있게 됩니다. 해당 정보를
          제공하지 않으시려면 여기에서 변경하세요.
        </Text>
        <Button type="submit">{isLoading ? "Loading..." : "완료"}</Button>
      </Form>
      {error.includes("auth/email-already-in-use") && (
        <Error>이미 가입된 이메일 주소입니다.</Error>
      )}
      {error.includes("auth/weak-password") && (
        <Error>비밀번호는 최소 6자리 이상이어야 합니다.</Error>
      )}
      <Switcher>
        이미 계정이 있으신가요? <Link to="/login">로그인 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
