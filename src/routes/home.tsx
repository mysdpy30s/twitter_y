import styled from "styled-components";
import Posting from "../components/posting";
import Timeline from "../components/timeline";
import SearchBar from "../components/search";
import Trend from "../components/trend";
import Follow from "../components/follow";

export default function Home() {
  return (
    <>
      <Wrapper>
        <Content>
          <H1>홈</H1>
          <Posting />
          <Timeline />
        </Content>
        <Aside>
          <SearchBar />
          <Trend />
          <Follow />
        </Aside>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div``;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  margin-left: 3em;
  gap: 2em;
`;

const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
`;
