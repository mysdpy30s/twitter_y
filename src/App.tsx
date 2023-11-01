import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import LoadingScreen from "./components/loading-screen";
import StartPage from "./components/start";
import ProtectedRoute from "./components/protected-route";
import Explore from "./routes/explore";
import Notification from "./routes/notification";
import Message from "./routes/message";
import Bookmark from "./routes/bookmark";

const router = createBrowserRouter([
  {
    path: "",
    element: <StartPage />,
  },
  {
    path: "/",
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
        path: "explore",
        element: <Explore />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "message",
        element: <Message />,
      },
      {
        path: "bookmark",
        element: <Bookmark />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

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
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
`;
const Wrapper = styled.div``;
