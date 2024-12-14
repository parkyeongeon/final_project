import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []); // 빈 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 실행

  const getVeggie = async () => {
    // 새로운 추천 메뉴를 요청합니다.
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=1`);
    const data = await api.json();
    setVeggie(data.recipes);
  };

  return (
    <Wrapper>
      <h3>Today's Recommended Menu</h3>
      {veggie.length > 0 && (
        <Card>
          <Link to={'/recipe/' + veggie[0].id}>
            <p>{veggie[0].title}</p>
            <img src={veggie[0].image} alt={veggie[0].title} onError={(e) => e.target.src = 'default-image.jpg'} />
            <Gradient />
          </Link>
        </Card>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
  h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 2rem;
  }
`;

const Card = styled.div`
  min-height: 30rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 18px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 24px; /* 호버 시 그림자 효과 */
  }

  img {
    border-radius: 1rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 10%;
    transform: translate(-50%, 0);
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7); /* 텍스트 그림자 추가 */
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)); /* 위에서 아래로 그라디언트 */
`;

export default Veggie;
