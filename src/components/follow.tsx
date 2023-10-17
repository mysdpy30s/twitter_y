import styled from "styled-components";

export default function Follow() {
  return (
    <Wrapper>
      <H1>팔로우 추천</H1>
      <Content>오늘의 이야기</Content>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-left: 2em;
`;

const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  margin-right: 3rem;
  margin-bottom: 1em;
`;
const Content = styled.div`
  width: 80%;
  background-color: #f2f2f2;
  border-radius: 3rem;
  padding: 1rem;
  margin-bottom: 5rem;
`;
