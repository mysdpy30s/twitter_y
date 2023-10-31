import styled from "styled-components";

export default function Trend() {
  return (
    <Wrapper>
      <H1>
        지금 핫한 트렌드
        <ImgTrend src="trend.svg" alt="trend" />
      </H1>
      <Content>
        가을 단풍 <br />
        100 post
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 1em;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.6em;
`;

const ImgTrend = styled.img`
  width: 1.5em;
  height: 1.5em;
`;

const Content = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 3rem;
  padding: 1rem;
`;
