import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.aside`
  width: ${(props) => (props.collapsed ? "1rem" : "14rem")};
  background-color: #0d3c44;
  color: white;
  min-height: 100vh;
  padding: 1rem;
  transition: width 0.3s ease;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => (props.collapsed ? "0" : "1.5rem")};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background: #14555e;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #1d6d79;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
`;

const ListItem = styled.li``;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #14555e;
  }
`;

export {
    SidebarContainer,Header,Title,SectionTitle,List,ListItem,StyledLink,LogoutButton
}