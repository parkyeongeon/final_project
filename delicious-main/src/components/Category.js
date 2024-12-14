import { FaPizzaSlice } from 'react-icons/fa';
import { GiNoodles, GiBowlOfRice, GiBubblingBowl } from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Category() {
  return (
    <CategoryContainer>
      <CategoryCard to={'/cuisine/Italian'}>
        <CategoryTitle>Italian</CategoryTitle>
      </CategoryCard>
      <CategoryCard to={'/cuisine/Vietnamese'}>
        <CategoryTitle>Vietnamese</CategoryTitle>
      </CategoryCard>
      <CategoryCard to={'/cuisine/Thai'}>
        <CategoryTitle>Thai</CategoryTitle>
      </CategoryCard>
      <CategoryCard to={'/cuisine/Korean'}>
        <CategoryTitle>Korean</CategoryTitle>
      </CategoryCard>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  padding: 0 2rem;
  justify-items: center;
  align-items: center;
`;

const CategoryCard = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 250px;
  height: 100%;
  max-height: 300px;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const IconWrapper = styled.div`
  background-color: #fce1a1;
  border-radius: 50%;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  width: 4rem;
  height: 4rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  svg {
    font-size: 2.5rem;
    color: #f57c00;
  }
`;

const CategoryTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  ${CategoryCard}:hover & {
    color: #f57c00;
  }
`;

export default Category;
