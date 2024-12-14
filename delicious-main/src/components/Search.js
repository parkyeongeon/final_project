import styled from 'styled-components';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <FaSearch />
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        value={input}
        placeholder="Search recipes..."
      />
    </FormStyle>
  );
}

const FormStyle = styled.form`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 2rem;

  input {
    border: none;
    background: linear-gradient(35deg, #00bfff, #87cefa); /* 하늘색으로 변경 */
    font-size: 1rem; /* 크기 줄이기 */
    color: #fff;
    padding: 0.8rem 1.5rem; /* 패딩 줄이기 */
    border-radius: 30px;
    outline: none;
    width: 50%; /* 너비 줄이기 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:focus {
      background: linear-gradient(35deg, #87cefa, #00bfff); /* 포커스 색상 조정 */
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.3);
    }

    &::placeholder {
      color: #eaeaea;
      font-style: italic;
    }
  }

  svg {
    position: absolute;
    z-index: 30;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    color: white;
    font-size: 1.3rem;
  }
`;

export default Search;
