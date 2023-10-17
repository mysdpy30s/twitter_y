import styled from "styled-components";

export default function SearchBar() {
  return (
    <Wrapper>
      <SearchBox>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="#8a61ff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314Z"
          />
        </svg>
        <input type="text" placeholder="찾고싶은 키워드가 있나요?" />
      </SearchBox>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-left: 2em;
  margin-bottom: 3rem;
`;
const SearchBox = styled.div`
  input {
    width: 15rem;
    height: 1.5rem;
    border: none;
    border-bottom: 1px solid #dfdfdf;
    &::placeholder {
      color: #a2a2a2;
    }
  }
`;
