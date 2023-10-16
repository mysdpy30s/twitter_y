import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 10%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 2em;
`;
const H2 = styled.h2`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.5em")};
  font-weight: 700;
  margin-bottom: 1em;
`;

const Text = styled.p`
  font-size: 0.4em;
  color: #686868;
  margin-bottom: 10em;
  a {
    text-decoration: none;
    color: #a889ff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logo = styled.img`
  width: 80%;
  height: 80%;
`;

const Signdiv = styled.div`
  width: 250px;
`;

const Button = styled.button`
  width: 15em;
  height: 2.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#a889ff"};
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: 1em;
  font-weight: 700;
  border-radius: 5em;
  border: 0;
  cursor: pointer;
`;

export default function StartPage() {
  return (
    <Wrapper>
      <div>
        <Logo src="logo.png" alt="logo" />
      </div>
      <div>
        <H1>지금 일어나고 있는 일</H1>
        <Signdiv>
          <H2>지금 가입하세요.</H2>
          <Button>계정 만들기</Button>
          <Text>
            가입하시려면 <a href="#">쿠키 사용</a>을 포함해{" "}
            <a href="#">이용약관</a>과 <a href="#">개인정보 처리방침</a>에
            동의해야 합니다.
          </Text>
          <H2 style={{ fontSize: "1em" }}>이미 트위터에 가입하셨다면,</H2>
          <Button
            style={{
              backgroundColor: "#ffffff",
              color: "#a889ff",
              border: "1px solid #DFDFDF",
            }}
          >
            로그인
          </Button>
        </Signdiv>
      </div>
    </Wrapper>
  );
}
