import styled from "styled-components";

export default function Posting() {
  return (
    <Wrapper>
      <form>
        <Input type="text" placeholder="메시지를 입력하세요" />
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 1rem;
  border: none;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
`;

const Input = styled.input`
  width: 100%;
  height: 80px;
  margin-top: 1em;
  margin-bottom: 1em;
  text-align: start;
  border: none;
  background-color: #f4f0ff;
  vertical-align: top;
  font-size: 1.2em;

  &::placeholder {
    color: #c8c8c8;
    font-size: 1em;
    vertical-align: top;
  }

  &:focus {
    border: 1px solid #f2f2f2;
  }
`;
