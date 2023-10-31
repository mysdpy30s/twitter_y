import { useState } from "react";
import styled from "styled-components";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTweet, setSearchTweet] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTweet);
  };

  return (
    <Wrapper>
      <SearchBox>
        <SearchForm onSubmit={handleSearch}>
          <Searchinput
            type="text"
            placeholder="찾고싶은 키워드가 있나요?"
            value={searchTweet}
            onChange={(e) => setSearchTweet(e.target.value)}
          />
          <SearchButton type="submit">
            <svg
              type="submit"
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
          </SearchButton>
        </SearchForm>
      </SearchBox>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const SearchForm = styled.form``;
const Searchinput = styled.input`
  width: 11rem;
  height: 1.5rem;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  padding: 0.3em;
  &::placeholder {
    color: #a2a2a2;
  }
  &:focus {
    border-bottom: 1px solid #8a66fa;
    outline: none;
  }
`;
const SearchButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  cursor: pointer;
  svg {
    width: 1.7em;
    height: 1.7em;
    &:hover {
      transform: scale(130%);
    }
  }
`;
