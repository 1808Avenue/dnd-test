import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 6px;
`;

export const Button = styled.button`
  cursor: pointer;
  & :hover {
    transform: scale(1.01);
  }
`;

export const Title = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #98a2b3;
  user-select: none;
`;
