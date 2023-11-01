import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Trends() {
  const [randomTrends, setRandomTrends] = useState<
    { name: string; number: number }[]
  >([]);
  const dataSet: { name: string; number: number }[] = [
    { name: "크리스마스", number: 143 },
    { name: "해외여행", number: 1322 },
    { name: "가을비", number: 589 },
    { name: "BTS", number: 8127 },
    { name: "유튜브", number: 2214 },
    { name: "블랙핑크", number: 5329 },
    { name: "건강식", number: 1093 },
    { name: "홈트", number: 918 },
    { name: "맥북 신모델", number: 3713 },
    { name: "코딩", number: 764 },
  ];

  useEffect(() => {
    const shuffledData = [...dataSet].sort(() => Math.random() - 0.5);
    const randomTrends = shuffledData.slice(0, 3);

    setRandomTrends(randomTrends);
  }, []);

  return (
    <Wrapper>
      <H1>
        지금 핫한 트렌드
        <ImgTrend src="trend.svg" alt="trend" />
      </H1>
      <Content>
        {randomTrends.map((item, index) => (
          <ShowTrend key={index}>
            <div>
              <TrendName>{item.name} </TrendName>
              <TrendPosts>{item.number} posts</TrendPosts>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 0 448 512"
            >
              <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
            </svg>
          </ShowTrend>
        ))}
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
  padding: 1.5em;
`;
const ShowTrend = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0.5em 0.3em;
`;
const TrendName = styled.p`
  font-size: 1.1em;
  font-weight: 700;
`;

const TrendPosts = styled.p`
  color: #6c6c6c;
  font-size: 0.9em;
  font-weight: 400;
`;
