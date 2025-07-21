import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUser } from "../Context/UserAuth";
import { ROLES } from "../utils/Roles";
import { useState } from "react";

// Styled Components
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

const Sidebar = () => {
  const { user, logout } = useUser();
  const role = user?.role;

  const [collapsed, setCollapsed] = useState(false);
  const [showEmployee, setShowEmployee] = useState(true);
  const [showAdmin, setShowAdmin] = useState(true);

  return (
    <SidebarContainer collapsed={collapsed}>
      <Header collapsed={collapsed}>
        <Title onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? "≡" : "Dashboard"}
        </Title>
        {!collapsed && <LogoutButton onClick={logout}>Logout</LogoutButton>}
      </Header>

      {!collapsed && (
        <>
          {/* EMPLOYEE SECTION */}
          {(role === ROLES.EMPLOYEE || role === ROLES.ADMIN) && (
            <div>
              <SectionTitle onClick={() => setShowEmployee(!showEmployee)}>
                Employee {showEmployee ? "▾" : "▸"}
              </SectionTitle>
              {showEmployee && (
                <List>
                  <ListItem>
                    <StyledLink to="/expense">Expense Creation</StyledLink>
                  </ListItem>
                </List>
              )}
            </div>
          )}

          {/* ADMIN SECTION */}
          {role === ROLES.ADMIN && (
            <div>
              <SectionTitle onClick={() => setShowAdmin(!showAdmin)}>
                Admin {showAdmin ? "▾" : "▸"}
              </SectionTitle>
              {showAdmin && (
                <List>
                  <ListItem>
                    <StyledLink to="/audit-logs">Audit Logs</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/assign-role">Assign Role</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/insights">Insights</StyledLink>
                  </ListItem>
                </List>
              )}
            </div>
          )}
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
