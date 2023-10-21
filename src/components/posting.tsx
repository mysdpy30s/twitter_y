import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Posting() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]); // 업로드된 파일 갯수가 딱 한개일때만 업로드가 진행되도록 함
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "익명의 사용자",
        userId: user.uid,
      });
      if (file) {
        // 업로드할 파일이 선택된 경우, 아래의 경로에 저장된다.
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref); // 업로드한 사진의 URL을 추출하여 저장한다.
        await updateDoc(doc, {
          photo: url, // photo라는 필드에 url을 추가 업데이트해줌.
        });
        setTweet("");
        setFile(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTweet("");
      setIsLoading(false);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <TextArea
          value={tweet}
          placeholder="어떤 이야기를 해볼까요?"
          onChange={onChange}
          rows={5}
          maxLength={180}
          required
        />
        {file && (
          <ImagePreview>
            <img src={URL.createObjectURL(file)} alt="attached image" />
          </ImagePreview>
        )}
        <ItemWrapper>
          <InputWrapper>
            <AttachFileButton htmlFor="file">
              <InputIcon src="/public/attachfile.svg" alt="attach file" />
              <br />
            </AttachFileButton>
            <AttachFileInput
              id="file"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            <InputIcon src="/public/emoji.svg" alt="emoji" />
          </InputWrapper>
          <ButtonWrapper>
            <SubmitBtn
              type="submit"
              value={isLoading ? "올리는 중..." : "올리기"}
            />
          </ButtonWrapper>
        </ItemWrapper>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 1rem;
  border: none;
  margin-bottom: 1em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const TextArea = styled.textarea`
  resize: none;
  height: 4rem;
  border: none;
  background-color: white;
  color: #8a66fa;
  padding: 0.8rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1rem;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  &::placeholder {
    color: #b3b3b3;
  }
  &:focus {
    outline: none;
    border: 1px solid #bca4ff;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

const ButtonWrapper = styled.div``;

const InputIcon = styled.img`
  width: 1.5em;
  height: 1.5em;
  cursor: pointer;
`;
const AttachFileButton = styled.label``;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  padding: 0.5em 1.5em;
  background-color: #d7c9ff;
  color: white;

  border: 1px solid #f2f2f2;
  border-radius: 3em;
  cursor: pointer;
  &:hover {
    background-color: #8a61ff;
    color: white;
    font-weight: 700;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  img {
    max-width: 100%;
    max-height: 20rem;
  }
`;
