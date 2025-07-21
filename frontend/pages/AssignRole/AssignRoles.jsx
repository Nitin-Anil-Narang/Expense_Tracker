import { useEffect, useState } from "react";
import styled from "styled-components";
import axiosApi from "../../config/axiosApi";
import { useUser } from "../../Context/UserAuth";
import { ROLES } from "../../utils/Roles";
import Sidebar from "../../components/Sidebar";

export default function AssignRoles() {
  const { user, loading} = useUser();
  const [admins, setAdmins] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const res = await axiosApi.get("/allpersonal");
      const formatted = res.data.map((admin) => ({
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }));
      setAdmins(formatted);
    } catch (error) {
      console.error("Failed to fetch admins", error);
    } finally {
      setDataLoading(false);
    
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRoleChange = (email, newRole) => {
    setAdmins((prev) =>
      prev.map((admin) =>
        admin.email === email ? { ...admin, role: newRole, changed: true } : admin
      )
    );
  };

  const handleSave = async (email, newRole) => {
    try {
      const changeRes = await axiosApi.put("/change-role", { email, newRole });

      if (changeRes.status === 200) {
        const updated = changeRes.data?.updatedUser || {};

        setAdmins((prev) =>
          prev.map((admin) =>
            admin.email === email ? { ...admin, role: newRole, changed: false } : admin
          )
        );

        alert("Role updated successfully!");
      } else {
        alert("Something went wrong while updating the role.");
      }
    } catch (error) {
      console.error("Error while updating role:", error?.response || error.message);
      const message =
        error?.response?.data?.message || "Failed to update role. Please try again.";
      alert(message);
    }
  };

  const handleDelete = async (email) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    if (!confirmDelete) return;

    try {
      await axiosApi.delete(`/users/${email}`);
      setAdmins((prev) => prev.filter((admin) => admin.email !== email));
      alert("Admin deleted successfully!");
    } catch (error) {
      console.error("Failed to delete admin", error);
      alert("Failed to delete admin");
    }
  };

  if (loading || dataLoading) return <Message>Loading...</Message>;
  if (!user) {
    return (
      <div style={{ padding: '2rem', color: '#a00' }}>
        <h2>User not logged in</h2>
      </div>
    );
  }

  return (
    <Container>
      <Sidebar />
      <Main>
        <Heading>Assign Roles</Heading>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th center>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.email}>
                  <Td>{admin.name}</Td>
                  <Td>{admin.email}</Td>
                  <Td>
                    <Select
                      value={admin.role}
                      onChange={(e) => handleRoleChange(admin.email, e.target.value)}
                    >
                      {Object.values(ROLES).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </Select>
                  </Td>
                  <Td center>
                    <Button
                      save
                      onClick={() => handleSave(admin.email, admin.role)}
                      active={admin.changed}
                      disabled={!admin.changed}
                    >
                      Save
                    </Button>
                    <Button delete onClick={() => handleDelete(admin.email)}>
                      Delete
                    </Button>
                  </Td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <Td colSpan="4" center>
                    No admins found.
                  </Td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </Main>
    </Container>
  );
}




const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.div`
  flex-grow: 1;
  padding: 2rem;
  color: #f0f9ff;
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  color: #f0f9ff;
`;

const Heading = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

const TableWrapper = styled.div`
  background-color: #0d3c44;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: ${({ center }) => (center ? "center" : "left")};
  font-size: 0.9rem;
  text-transform: uppercase;
  background-color: #0a2f35;
  color: #e6f5f8;
`;

const Td = styled.td`
  padding: 0.9rem;
  text-align: ${({ center }) => (center ? "center" : "left")};
  color: #e6f5f8;
`;

const Select = styled.select`
  background-color: #14454f;
  color: #e0f4f6;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #1f5d66;
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  margin: 0 0.2rem;
  transition: 0.2s ease-in-out;
  background-color: ${({ delete: isDelete, save, active }) =>
    isDelete ? "#c0392b" :
    save && active ? "#27ae60" :
    "#7f8c8d"};
  color: white;
  cursor: ${({ active }) => (active ? "pointer" : "not-allowed")};
  opacity: ${({ active }) => (active === false ? 0.6 : 1)};

  &:hover {
    background-color: ${({ delete: isDelete, save, active }) =>
      isDelete ? "#e74c3c" :
      save && active ? "#2ecc71" :
      "#95a5a6"};
  }
`;

const Message = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: #ddd;
`;

