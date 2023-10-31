import styled from "styled-components";
import Posting from "../components/posting";
import Timeline, { MyTweet } from "../components/timeline";
import SearchBar from "../components/search";
import Trend from "../components/trend";
import Follow from "../components/follow";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [searchResults, setSearchResults] = useState<MyTweet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (searchTerm: string) => {
    setSearchTerm(searchTerm);

    const searchTermLowerCase = searchTerm.toLowerCase();
    const searchQuery = query(
      collection(db, "tweets"),
      where("tweet", ">=", searchTermLowerCase),
      where("tweet", "<=", searchTermLowerCase + "\uf8ff")
    );

    const searchSnapshot = await getDocs(searchQuery);
    const newSearchResults = searchSnapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo, photoURL } =
        doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        photoURL,
      };
    });
    setSearchResults(newSearchResults);
  };

  return (
    <>
      <Wrapper>
        <Content>
          <Header>
            <H1>홈</H1>
            <SearchBar onSearch={handleSearch} />
          </Header>
          <Posting />
          <ScrollableTimeline>
            <Timeline searchResults={searchResults} searchTerm={searchTerm} />
          </ScrollableTimeline>
        </Content>
        <Aside>
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
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 1em;
  margin-right: 1em;
`;
const Content = styled.div`
  flex: 0.7;
`;
const ScrollableTimeline = styled.div`
  overflow: auto;
  max-height: calc(100vh - 260px);
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
