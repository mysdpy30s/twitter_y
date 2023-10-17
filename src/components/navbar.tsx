import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const userName = auth.currentUser?.displayName;
  const userId = auth.currentUser?.email?.match(/^[^@]+/)?.[0] ?? null;
  const userAvatar = auth.currentUser?.photoURL;
  const navigate = useNavigate();
  const logOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <Wrapper>
        <Logo src="/public/logo.svg" alt="logo"></Logo>
        <Table>
          <Row>
            <IconCell>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#000000" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7H4Z" />
              </svg>
            </IconCell>
            <MenuCell>홈</MenuCell>
          </Row>
          <Row>
            <IconCell>
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
            </IconCell>
            <MenuCell>탐색하기</MenuCell>
          </Row>
          <Row>
            <IconCell>
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
            </IconCell>
            <MenuCell>알림</MenuCell>
          </Row>
          <Row>
            <IconCell>
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
            </IconCell>
            <MenuCell>쪽지</MenuCell>
          </Row>
          <Row>
            <IconCell>
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
            </IconCell>
            <MenuCell>북마크</MenuCell>
          </Row>
          <Row>
            <IconCell>
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
            </IconCell>
            <MenuCell>더보기</MenuCell>
          </Row>
        </Table>
        <ShowProfile>
          <ProfileDeco>@</ProfileDeco>
          <ProfileContent>
            {userName}
            <br />
            <UserIdText>{userId}</UserIdText>
          </ProfileContent>
          <ProfileAvatar>
            {" "}
            <svg
              width="48"
              height="48"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              onClick={logOut}
              style={{ cursor: "pointer" }}
            >
              <path
                fill="none"
                d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0ZM20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5Z"
              />
              <path
                fill="#d8d8d8"
                d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8ZM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0Z"
              />
            </svg>
            {userAvatar}
          </ProfileAvatar>
        </ShowProfile>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0 0 0 4rem;
  border-right: 1px solid #f2f2f2;
`;

const Logo = styled.img`
  width: 15%;
  height: 5%;
  margin-top: 3em;
  margin-bottom: 2em;
`;

const Table = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 2rem;
  width: 100%;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0.6em;
  &:hover {
    max-width: 80%;
    background-color: #cbb8ff;
    border-radius: 1.5em;
    cursor: pointer;
    font-weight: 700;
  }
`;

const IconCell = styled.div`
  text-align: left;
  margin-right: 2em;
`;
const MenuCell = styled.div`
  text-align: left;
`;
const ShowProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 2rem;
  margin-right: 1em;
`;
const ProfileDeco = styled.div`
  font-size: 2.5rem;
  color: #8a61ff;
  margin-right: 0.3rem;
`;
const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserIdText = styled.span`
  color: #8a61ff;
`;
const ProfileAvatar = styled.div`
  margin-left: 0.5em;
`;
