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
