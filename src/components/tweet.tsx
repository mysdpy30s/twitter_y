import styled from "styled-components";
import { MyTweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function Tweet({
  username,
  createdAt,
  photo,
  tweet,
  userId,
  id,
}: MyTweet) {
  const user = auth.currentUser;
  const time = new Date(createdAt);
  const convertedTime = time.toLocaleString("sv");
  const timeAgo = formatDistanceToNow(time, { addSuffix: true });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTweet, setEditedTweet] = useState(tweet);
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    async function fetchUserAvatar() {
      try {
        const avatarUrl = await getDownloadURL(
          ref(storage, `avatars/${userId}`)
        );
        setUserAvatar(avatarUrl);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUserAvatar();
  }, [userId]);

  const onEdit = async () => {
    if (user?.uid !== userId) return;
    if (isEditing) {
      const updateData: { tweet: string; photo?: string } = {
        tweet: editedTweet,
      };
      if (photo) {
        updateData.photo = photo;
      }
      try {
        await updateDoc(doc(db, "tweets", id), updateData);
      } catch (e) {
        console.log(e);
      } finally {
        setIsEditing(!isEditing);
      }
    } else {
      setIsEditing(true);
    }
  };
  const onDelete = async () => {
    const ok = confirm(
      "작성된 트윗을 삭제하시겠습니까? 한번 삭제된 트윗은 다시 복구할 수 없습니다."
    );
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <Wrapper>
      <AvatarColumn>
        {userAvatar ? (
          <img src={userAvatar} alt="user-avatar" />
        ) : (
          <img src="default-avatar.svg" alt="default-avatar" />
        )}
      </AvatarColumn>
      <ContentColumn>
        <NameDateRow>
          <Username>{username}</Username>
          <CreatedAt title={convertedTime}>{timeAgo}</CreatedAt>
        </NameDateRow>
        {isEditing ? (
          <EditInput
            type="text"
            value={editedTweet}
            onChange={(e) => setEditedTweet(e.target.value)}
          />
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {photo ? (
          <ContentColumn>
            <Photo src={photo} />
          </ContentColumn>
        ) : null}
      </ContentColumn>
      <EditColumn>
        {" "}
        {user?.uid === userId ? (
          <EditButton onClick={onEdit}>
            <img src="edit.svg" alt="Edit" />
          </EditButton>
        ) : null}
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>
            <img src="delete.svg" alt="delete" />
          </DeleteButton>
        ) : null}
      </EditColumn>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1em;
  border-top: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const AvatarColumn = styled.div`
  flex: 0.1;
  img {
    width: 3em;
    height: 3em;
    border-radius: 2em;
  }
`;
const ContentColumn = styled.div`
  flex: 0.8;
`;
const NameDateRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Username = styled.span`
  font-weight: 600;
  font-size: 1.1em;
  cursor: default;
`;
const CreatedAt = styled.div`
  font-size: 0.8em;
  font-weight: 400;
  color: #9a9a9a;
  margin-left: 0.5em;
  &:hover {
    cursor: default;
  }
`;
const EditColumn = styled.div`
  flex: 0.1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const EditInput = styled.input`
  border: 0;
  width: 100%;
  height: 4rem;
  background-color: #f4f0ff;
  font-size: 1em;
  margin-top: 0.7em;
  &:focus {
    border: 1px solid #8a66fa;
    outline: none;
  }
`;
const EditButton = styled.button`
  font-weight: 600;
  background-color: transparent;
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
const DeleteButton = styled.button`
  font-weight: 600;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  img {
    width: 1.5em;
    height: 1.5em;
  }
  &:hover {
    transform: scale(130%);
  }
`;
const Photo = styled.img`
  margin-top: 0.4em;
  border-radius: 1em;
  border: 1px solid #f2f2f2;
  width: 80%;
  height: 80%;
`;
const Payload = styled.p`
  margin-top: 0.7em;
  cursor: default;
`;
