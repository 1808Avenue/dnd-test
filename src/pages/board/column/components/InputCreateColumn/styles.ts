import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background: #f9fafb;
  padding: 12px;
  border-radius: 12px;
  min-width: 428px;
  height: 64px;
`;

export const Input = styled.input`
  width: 100%;

  &::placeholder {
    font-family: Inter;
    font-size: 18px;
    font-weight: 500;
    line-height: 27px;
    letter-spacing: 0em;
    text-align: left;
    color: #98a2b3;
  }
`;
