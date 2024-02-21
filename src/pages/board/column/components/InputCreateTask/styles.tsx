import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 404px;
  // height: 84px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #eaecf0;
  gap: 12px;
  box-shadow: 0px 1px 2px 0px #1010180d;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  &::placeholder {
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #98a2b3;
  }
`;
