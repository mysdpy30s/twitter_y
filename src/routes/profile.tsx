import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { H1 } from "../components/auth-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { MyTweet } from "../components/timeline";
import Tweet from "../components/tweet";

export default function Profile() {
  const user = auth.currentUser;
  const [avatarImg, setAvatarImg] = useState(user?.photoURL);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(user?.displayName || "");
  const [myTweet, setMyTweet] = useState<MyTweet[]>([]);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatarImg(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
      setUploadStatus("사진이 변경되었습니다!");
    }
  };

  const onUserNameEdit = async () => {
    if (!user) return;
    if (isEditing) {
      try {
        await updateProfile(user, {
          displayName: editedUserName,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsEditing(!isEditing);
      }
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    const fetchTweet = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      const snapshot = await getDocs(tweetQuery);
      const myTweets = snapshot.docs.map((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        return {
          tweet,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
      });
      setMyTweet(myTweets);
    };
    fetchTweet();
  }, []);

  return (
    <Wrapper>
      <H1>나의 공간</H1>
      <AvatarContent>
        <AvatarUpload htmlFor="file">
          {avatarImg ? (
            <>
              <AvatarImg src={avatarImg} />
              <AvatarTooltip>사진 변경</AvatarTooltip>
            </>
          ) : (
            <svg
              width="1024"
              height="1024"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0ZM20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5Z"
              />
              <path
                fill="#f2f2f2"
                d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8ZM8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0Z"
              />
            </svg>
          )}
        </AvatarUpload>
        <AvatarInput
          type="file"
          accept="image/*"
          id="file"
          onChange={onAvatarChange}
        />
        <UserInfoWrapper>
          <UserName>
            {isEditing ? (
              <EditInput
                type="text"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
              />
            ) : (
              editedUserName
            )}
            <UserNameEditButton onClick={onUserNameEdit}>
              <img src="/public/edit.svg" alt="username-edit-button" />
            </UserNameEditButton>
          </UserName>
          <UserEmail>{user?.email}</UserEmail>
        </UserInfoWrapper>
      </AvatarContent>
      <UploadStatus>{uploadStatus}</UploadStatus>
      <MyTweetList>
        <MyTweetListTitle>내가 작성한 트윗</MyTweetListTitle>
        {myTweet
          ? myTweet.map((tweet) => <Tweet key={tweet.id} {...tweet} />)
          : "아직 작성한 트윗이 없습니다."}
      </MyTweetList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1em;
  padding: 5em 0em;
`;
const AvatarContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f8f5ff;
  padding: 1.5em;
  border-radius: 3em;
`;
const AvatarTooltip = styled.div`
  position: absolute;
  width: 100%;
  height: 1.3em;
  bottom: 0em;
  background-color: #8a66f1;
  color: #fff;
  opacity: 0;
  pointer-events: none;
  padding: 0.2em;
  font-size: 0.8em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AvatarUpload = styled.label`
  width: 5rem;
  height: 5rem;
  border-radius: 5em;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  svg {
    width: 5rem;
  }
  position: relative;
  &:hover {
    ${AvatarTooltip} {
      opacity: 1;
    }
  }
`;
const AvatarImg = styled.img`
  width: 100%;
  height: 5rem;
  border-radius: 5em;
`;
const AvatarInput = styled.input`
  display: none;
`;
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;
const UserName = styled.span`
  font-size: 1.2em;
`;
const UserNameEditButton = styled.button`
  margin-left: 0.6em;
  background-color: #f8f5ff;
  border: 0;
  cursor: pointer;
  img {
    width: 1.5em;
    height: 1.5em;
  }
  &:hover {
    transform: scale(130%);
  }
`;
const EditInput = styled.input`
  border: 0;
  width: 5rem;
  height: 1.7rem;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #8a66fa;
  font-size: 1em;
  &:focus {
    outline: none;
  }
`;
const UserEmail = styled.span`
  font-size: 1.2em;
  color: #8a66f1;
`;
const UploadStatus = styled.span`
  margin-left: 2em;
  color: #ff6b3d;
`;
const MyTweetList = styled.div`
  display: inline-block;
  position: relative;
  gap: 0.5em;
  margin-top: 2em;
`;
const MyTweetListTitle = styled.div`
  display: inline-block;
  position: relative;
  padding-bottom: 0.2em;
  border-bottom: 3px solid #ae91ff;
  cursor: default;
  font-weight: 600;
`;
