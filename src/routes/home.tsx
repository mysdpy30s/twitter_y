import styled from "styled-components";
import SearchBar from "../components/search";
import Trend from "../components/trend";
import Follow from "../components/follow";
import Posting from "../components/posting";

export default function Home() {
  return (
    <>
      <Wrapper style={{ display: "flex" }}>
        <Section style={{ flex: 0.65 }}>
          <H1>홈</H1>
          <Posting />
        </Section>
        <Aside style={{ flex: 0.35 }}>
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
  width: 100%;
  border-right: 1px solid #f2f2f2;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 1em;
  padding: 3.5rem 1rem 0 2.5rem;
`;
const H1 = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  margin-right: 3rem;
`;
const Aside = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  border-left: 1px solid #f2f2f2;
`;
