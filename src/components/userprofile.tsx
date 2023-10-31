import styled from "styled-components";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function ShowProfile() {
  const navigate = useNavigate();
  const userName = auth.currentUser?.displayName;
  const userId = auth.currentUser?.email?.split("@")[0];
  const userAvatar = auth.currentUser?.photoURL ?? `default-avatar.svg`;

  const logOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/");
    }
  };

  return (
    <>
      <Wrapper>
        <ProfileDeco>@</ProfileDeco>
        <ProfileContent>
          {userName}
          <br />
          <UserIdText>{userId}</UserIdText>
        </ProfileContent>
        <ProfileAvatar>
          <AvatarImg src={userAvatar} alt="avatar" />
          <AvatarSubMenu>
            <StyledLink to="/profile">나의 공간</StyledLink>
            <Span style={{ color: "#ff6b3d" }} onClick={logOut}>
              로그아웃
            </Span>
          </AvatarSubMenu>
        </ProfileAvatar>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 9rem;
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
const AvatarSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
  width: 5em;
  height: 3.5em;
  top: -3.5em;
  left: -2.5em;
  background-color: #fff;
  border: 1px solid #f2f2f2;
  position: absolute;
  opacity: 0;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 0.8em;
  cursor: pointer;
  &:hover {
    background-color: #fffbd3;
  }
`;
const Span = styled.span`
  font-size: 0.8em;
  cursor: pointer;
  &:hover {
    background-color: #fffbd3;
  }
`;
const ProfileAvatar = styled.div`
  margin-left: 0.5em;
  margin-right: 0.5em;
  position: relative;
  &:hover {
    ${AvatarSubMenu} {
      opacity: 1;
    }
  }
`;
const AvatarImg = styled.img`
  width: 2.5em;
  height: 2.5em;
  fill: #f2f2f2;
  border-radius: 2em;
  cursor: pointer;
`;
