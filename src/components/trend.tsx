import styled from "styled-components";

export default function Trend() {
  return (
    <Wrapper>
      <H1>
        지금 핫한 트렌드
        <ImgTrend src="/public/trend.svg" alt="trend" />
      </H1>
      <Content>
        가을 단풍 <br />
        100 post
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
`;

const ImgTrend = styled.img`
  width: 10%;
  height: 10%;
`;

const Content = styled.div`
  width: 80%;
  background-color: #f2f2f2;
  border-radius: 3rem;
  padding: 1rem;
`;
