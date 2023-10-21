import styled from "styled-components";
import Posting from "../components/posting";
import Timeline from "../components/timeline";
import SearchBar from "../components/search";

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
        </Aside>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-right: 1px solid #f2f2f2;
`;

const Content = styled.div`
  width: 600px;
`;

const Aside = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
`;
