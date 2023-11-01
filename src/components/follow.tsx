import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Follow() {
  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        // setRandomUsers(selectedUsers);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRandomUsers();
  }, []);

  return (
    <Wrapper>
      <H1>팔로우 추천</H1>
      <Content>
        {/* {randomUsers.map((item, index) => (
          <ShowRandomUsers key={index}>
            <RandomUserName>{item.name} </RandomUserName>
            {item.userId}
            {item.userAvatar}
          </ShowRandomUsers>
        ))} */}
      </Content>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-left: 1em;
  width: 100%;
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
const ShowRandomUsers = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0.5em 0.3em;
`;
const RandomUserName = styled.p`
  font-size: 1.1em;
  font-weight: 700;
`;
