import styled from "styled-components";

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 428px;
  height: 100%;
  padding: 12px;
  border-radius: 12px;
  background: #f9fafb;
  gap: 30px;
`;

export const ColumnTitle = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 404px;
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  user-select: none;
  cursor: pointer;
`;

export const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;


