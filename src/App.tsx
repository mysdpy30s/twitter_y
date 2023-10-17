import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import StartPage from "./components/start";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "",
    element: <StartPage />,
  },
  {
    path: "/layout",
    // ProtectedRoute로 Layout을 보호함으로써, Layout의 children인 Home과 Profile도 함께 보호됨
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
`;
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady(); // 파이어베이스가 쿠키와 토큰을 읽고 백엔드와 소통하여 유저의 로그인여부를 확인하는 동안 기다리기
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
