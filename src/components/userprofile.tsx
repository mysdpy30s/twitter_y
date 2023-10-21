import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ShowProfile() {
  const navigate = useNavigate();
  const userName = auth.currentUser?.displayName;
  const userId = auth.currentUser?.email;
  const userAvatar = auth.currentUser?.photoURL ?? `/public/default-avatar.svg`;

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
          <AvatarImg src={userAvatar} alt="avatar" onClick={logOut} />
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
const AvatarImg = styled.img`
  width: 2.5em;
  height: 2.5em;
  fill: #f2f2f2;
  border-radius: 2em;
  cursor: pointer;
`;
