import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // 페이지 상태
  const observer = useRef();

  useEffect(() => {
    getMenu(page);
  }, [page]);

  const getMenu = async (pageNum) => {
    if (loading) return; // 로딩 중에는 API 호출 방지
    setLoading(true);

    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&page=${pageNum}`);
    const data = await api.json();

    setMenu((prevMenu) => [...prevMenu, ...data.recipes]); // 기존 메뉴에 새로운 메뉴 추가
    setLoading(false);
  };

  const lastRecipeElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect(); // 이전 관찰기기 해제
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // 페이지 넘버를 증가시켜서 새로운 레시피 불러오기
      }
    });
    if (node) observer.current.observe(node); // 새로운 요소 관찰
  };

  return (
    <Wrapper>
      <h3>View all menu</h3>
      <RecipeList>
        {menu.map((recipe, index) => {
          if (menu.length === index + 1) {
            return (
              <RecipeCard ref={lastRecipeElementRef} key={recipe.id}>
                <Link to={'/recipe/' + recipe.id}>
                  <CardContent>
                    <Image src={recipe.image} alt={recipe.title} />
                    <Title>{recipe.title}</Title>
                  </CardContent>
                </Link>
              </RecipeCard>
            );
          } else {
            return (
              <RecipeCard key={recipe.id}>
                <Link to={'/recipe/' + recipe.id}>
                  <CardContent>
                    <Image src={recipe.image} alt={recipe.title} />
                    <Title>{recipe.title}</Title>
                  </CardContent>
                </Link>
              </RecipeCard>
            );
          }
        })}
      </RecipeList>
      {loading && <LoadingText>Loading...</LoadingText>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0;
  text-align: center;
  h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 2rem;
  }
`;

const RecipeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const RecipeCard = styled.div`
  position: relative;
  width: 250px;
  margin: 1rem;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardContent = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
`;

const Title = styled.p`
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: 15%;
  transform: translateX(-50%);
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: #f3a61d;
  margin-top: 2rem;
`;

export default Menu;
