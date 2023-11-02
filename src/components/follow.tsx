import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Follow() {
  const [randomUsers, setRandomUsers] = useState<
    { photo: string; name: string; email: string; followed: boolean }[]
  >([]);

  const dataSet: {
    photo: string;
    name: string;
    email: string;
    followed: boolean;
  }[] = [
    {
      photo: "pf1.jpg",
      name: "일론 머스크",
      email: "elonmusk",
      followed: false,
    },
    {
      photo: "pf2.jpg",
      name: "내 취향 사진들",
      email: "myfavzzal",
      followed: false,
    },
    { photo: "pf3.jpg", name: "드립짤모음", email: "ee_drip", followed: false },
    {
      photo: "pf4.jpg",
      name: "Bill Gates",
      email: "Billgates",
      followed: false,
    },
    {
      photo: "pf5.jpg",
      name: "Robert Downey Jr",
      email: "RobertDowneyJr",
      followed: false,
    },
    { photo: "pf6.jpg", name: "SpaceX", email: "SpaceX", followed: false },
    {
      photo: "pf7.jpg",
      name: "Taylor Swift",
      email: "taylorswift13",
      followed: false,
    },
    { photo: "pf8.jpg", name: "Rihanna", email: "rihanna", followed: false },
    {
      photo: "pf9.jpg",
      name: "맥도날드(McDonald's)",
      email: "KOR_McDonalds",
      followed: false,
    },
  ];

  const followUser = (email: string) => {
    setRandomUsers((randomUsers) =>
      randomUsers.map((randomUser) => {
        if (randomUser.email === email) {
          return { ...randomUser, followed: !randomUser.followed };
        }
        return randomUser;
      })
    );
  };

  useEffect(() => {
    const shuffledUserData = [...dataSet].sort(() => Math.random() - 0.5);
    const randomUsers = shuffledUserData.slice(0, 3);

    setRandomUsers(randomUsers);
  }, []);

  return (
    <Wrapper>
      <H1>팔로우 추천</H1>
      <Content>
        {randomUsers.map((item, index) => (
          <UserList key={index}>
            <div>
              <UserAvatar src={item.photo} />
            </div>
            <div>
              <UserName>{item.name}</UserName>
              <UserId>@{item.email}</UserId>
            </div>
            <div>
              <UserFollowBtn
                type="submit"
                value={item.followed ? "✔️ 팔로우 중" : "팔로우"}
                onClick={() => followUser(item.email)}
                style={
                  item.followed
                    ? { backgroundColor: "white", color: "#313131" }
                    : {}
                }
              />
            </div>
          </UserList>
        ))}
      </Content>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-left: 1em;
  width: 100%;
  cursor: default;
`;

const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.6em;
`;
const Content = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 3rem;
  padding: 1rem;
  margin-bottom: 3rem;
`;
const UserList = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr auto;
  align-items: center;
  padding: 0.5em 0.5em;
`;
const UserAvatar = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 2em;
  margin-right: 0.4em;
`;
const UserName = styled.p`
  font-weight: 700;
  margin-bottom: 0.2em;
`;
const UserId = styled.p`
  color: #8a66f1;
  font-size: 0.9em;
`;
const UserFollowBtn = styled.input`
  width: 6em;
  font-size: 0.9em;
  font-weight: 600;
  padding: 0.4em 0.2em;
  background-color: #8a66f1;
  color: white;
  letter-spacing: -0.03em;
  border-radius: 3em;
  cursor: pointer;
  border: 0;
  &:hover {
    filter: contrast(1.5);
    font-weight: 700;
  }
`;
