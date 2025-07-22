import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Context/UserAuth";
import { ROLES } from "../utils/Roles";
import { useState } from "react";
import {
  SidebarContainer,
  Header,
  Title,
  SectionTitle,
  List,
  ListItem,
  StyledLink,LogoutButton
} from "../styles/Sidebar"

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
                    <StyledLink to="/expense-admin">Expenses</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/assign-role">Assign Role</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/audit-logs">Audit Logs</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/insights">Insights</StyledLink>
                  </ListItem>
                  <ListItem>
                    <StyledLink to="/csv-export">CSV</StyledLink>
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
