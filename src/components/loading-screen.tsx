import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 20%;
`;

const Logo = styled.img`
  width: 5%;
  height: 5%;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Logo src="/public/logo.svg" alt="logo" />
    </Wrapper>
  );
}
