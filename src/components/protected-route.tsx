import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser; // 로그인된 경우 User 값을, 로그인 되지 않은 경우 null 값을 반환함.
  if (user === null) {
    return <Navigate to="/" />; // 로그인되지 않은 경우 홈페이지로 리디렉션 시킴.
  }
  return children; // 로그인된 경우에는 children을 보여줌.
}
