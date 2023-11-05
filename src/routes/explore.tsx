import styled from "styled-components";
import Follow from "../components/follow";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface CommentProps {
  fontSize?: string;
}

export default function Explore() {
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
    const shuffledTrendData = [...dataSet].sort(() => Math.random() - 0.5);
    const randomTrends = shuffledTrendData.slice(0, 4);

    setRandomTrends(randomTrends);
  }, []);

  return (
    <>
      <Wrapper>
        <Content>
          <Header>
            <H1>탐색하기</H1>
          </Header>
          <ShowVideo>
            <ReactPlayer
              url={"https://youtu.be/R1oLapFKmGo?si=rywq8GI0HZW4EvjO"}
              width={"23rem"}
              height={"12rem"}
              playing={true}
              muted={false}
              controls={false}
              light={false}
              pip={false}
            />
            <VideoComment>
              <Comment>
                #지금은커버곡열풍
                <br />
                #SOLE
              </Comment>
              <br />
              <Comment style={{ fontSize: "1.3em", fontWeight: 400 }}>
                SOLE 'Get Up' (longer ver.) | Original by NewJeans
              </Comment>
            </VideoComment>
          </ShowVideo>
          <H1 style={{ paddingTop: "1em", paddingLeft: "1em" }}>
            지금 핫한 트렌드
          </H1>
          <TrendContent>
            {randomTrends.map((item, index) => (
              <ShowTrend key={index}>
                <div>
                  <span>대한민국에서 트렌드중</span>
                  <TrendName>{item.name} </TrendName>
                  <TrendPosts>{item.number} posts</TrendPosts>
                </div>
              </ShowTrend>
            ))}
          </TrendContent>
        </Content>
        <Aside>
          <Follow />
        </Aside>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  cursor: default;
`;
const Content = styled.div`
  flex: 0.7;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 0.2em;
`;
const VideoComment = styled.div`
  width: 18rem;
  height: 100%;
  background-color: #f2f2f2;
  opacity: 1;
`;
const ShowVideo = styled.div`
  margin-top: 0.4em;
  padding: 0.5em;
  position: relative;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  font-size: 1.2em;
  font-weight: 700;
  background-color: #f2f2f2;
`;
const Comment = styled.h1<CommentProps>`
  padding: 0.5em;
  letter-spacing: -0.05em;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.8em")};
`;
const TrendContent = styled.div`
  padding: 1em;
  width: 15rem;
`;
const ShowTrend = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  span {
    font-size: 0.8em;
    color: #727272;
  }
`;
const TrendName = styled.p`
  font-size: 1em;
  font-weight: 700;
  line-height: 1.3em;
`;
const TrendPosts = styled.p`
  color: #6c6c6c;
  font-size: 0.9em;
  font-weight: 400;
`;
const Aside = styled.div`
  display: flex;
  flex: 0.3;
  flex-direction: column;
  gap: 2em;
  margin-left: 1em;
  margin-right: 1em;
  border-left: 1px solid #f2f2f2;
`;
const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
`;
