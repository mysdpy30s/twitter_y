import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const userName = auth.currentUser?.displayName;
  const navigate = useNavigate();
  const signOut = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <>
      <h1>Home!</h1>
      {userName}님 환영합니다!;
      <button onClick={signOut}>로그아웃</button>
    </>
  );
}
