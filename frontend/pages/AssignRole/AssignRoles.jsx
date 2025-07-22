import { useEffect, useState } from "react";
import axiosApi from "../../config/axiosApi";
import { useUser } from "../../Context/UserAuth";
import { ROLES } from "../../utils/Roles";
import Sidebar from "../../components/Sidebar";
import {
  Container,
  Main,
  Wrapper,
  Heading,
  TableWrapper,
  StyledTable,
  Th,
  Td,
  Select,
  Button,
  Message
} from '../../styles/AssignRoles'

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

  // if (loading || dataLoading) return <Message>Loading...</Message>;
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
                    No Users found.
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





