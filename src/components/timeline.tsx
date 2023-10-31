import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/database";

export interface MyTweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  photoURL?: string;
}

type TimelineProps = {
  searchResults: MyTweet[];
  searchTerm: string;
};

export default function Timeline({ searchResults, searchTerm }: TimelineProps) {
  const [tweet, setTweet] = useState<MyTweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweet = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(20)
      );

      unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
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
        setTweet(tweets);
      });
    };
    fetchTweet();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <TweetRow key={result.id}>
            <Tweet {...result} />
          </TweetRow>
        ))
      ) : searchTerm ? (
        <NoResultFound>검색 결과가 없습니다.</NoResultFound>
      ) : (
        tweet.map((tweet) => (
          <TweetRow key={tweet.id}>
            {" "}
            <Tweet {...tweet} />
          </TweetRow>
        ))
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const TweetRow = styled.div`
  &:hover {
    background-color: #f9f7ff;
  }
`;
const NoResultFound = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
  color: #ff6b3d;
`;
