import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import ShowProfile from "./userprofile";

export default function Layout() {
  return (
    <>
      <Wrapper>
        <MainElement>
          <Menu>
            <Logo src="logo.svg" alt="logo"></Logo>
            <StyledLink to="home">
              <MenuItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="#000000" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7H4Z" />
                </svg>
                홈
              </MenuItem>
            </StyledLink>
            <StyledLink to="explore">
              <MenuItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314Z"
                  />
                </svg>
                탐색하기
              </MenuItem>
            </StyledLink>
            <StyledLink to="notification">
              <MenuItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M22 20H2v-2h1v-6.969C3 6.043 7.03 2 12 2s9 4.043 9 9.031V18h1v2ZM5 18h14v-6.969C19 7.148 15.866 4 12 4s-7 3.148-7 7.031V18Zm4.5 3h5a2.5 2.5 0 0 1-5 0Z"
                  />
                </svg>
                알림
              </MenuItem>
            </StyledLink>
            <StyledLink to="message">
              <MenuItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12z"
                  />
                </svg>
                메시지
              </MenuItem>
            </StyledLink>
            <StyledLink to="bookmark">
              <MenuItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="m17 18l-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2Z"
                  />
                </svg>
                북마크
              </MenuItem>
            </StyledLink>
            <StyledLink to="/">
              <MenuItem>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Zm14 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2Z"
                  />
                </svg>
                더보기
              </MenuItem>
            </StyledLink>
          </Menu>
          <ShowProfile />
        </MainElement>
        <Outlet />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 1em;
  padding: 2em;
  height: 100vh;
`;
const MainElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #f2f2f2;
`;
const Logo = styled.img`
  width: 3rem;
  height: 3rem;
  margin-bottom: 1.2rem;
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  gap: 0.5em;
`;
const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3em;
  svg {
    width: 2em;
    height: 2em;
    margin-right: 0.6em;
  }
`;
const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 1em;
  &:hover {
    background-color: #f2f2f2;
    padding: 0 0.4em;
    border-radius: 2em;
    color: #8a66fa;
    font-weight: 700;
  }
`;
