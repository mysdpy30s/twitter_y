import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 20%;
`;

const Logo = styled.img`
  width: 10%;
  height: 10%;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Logo src="logo.png" alt="logo" />
    </Wrapper>
  );
}
