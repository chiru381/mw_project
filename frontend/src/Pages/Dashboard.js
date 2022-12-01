import React, { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import "../Styles/SearchBar.css";
import { Search, Delete, Edit, GroupAdd } from "@mui/icons-material";
import service from "../Service/Service";
import Sidebar from "../SharableComponents/SideBar";
import EditUser from "../Components/EditUser";
import DeleteUser from "../Components/DeleteUser";
import CreateAccount from "../Components/CreateUser";
import { ErrorMessage, SuccessMessage } from "../SharableComponents/Messages";

function Dashboard() {
  const keys = ["first_name", "last_name", "email", "status", "phone_number", "user_id"];
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [deleteUser, setDeleteUser] = useState(false);
  const [CreateUser, setCreateUser] = useState(false);
  const [loading, setLoading] = useState(false);

  // const searchUsers =
  //   users &&
  //   users?.filter((user) => {
  //     return keys.some((key) => user[key].toString().toLowerCase().includes(query.toLowerCase()));
  //   });

  //get all users
  useEffect(() => {
    service
      .getUsers()
      .then((res) => setUsers(res.data.users))
      .catch((error) => console.log(error.response.data));
  }, [success]);

  //create user
  function handleCreateUser(data) {
    setLoading(true);
    service
      .createUser(data)
      .then((res) => {
        if (res.data.responseCode === 200) {
          setLoading(false);
          setCreateUser(false);
          setSuccess("Successfully Registered!");
          setTimeout(() => setSuccess(null), 5000);
        }
      })
      .catch((e) => {
        setLoading(false);
        setCreateUser(false);
        setError(e.response.data.errorMessage);
        setTimeout(() => setError(null), 5000);
      });
  }

  //edit user
  function handleEditUser(data) {
    setLoading(true);
    service
      .updateUser(data)
      .then((res) => {
        if (res.data.responseCode === 200) {
          setLoading(false);
          setEdit(false);
          setSuccess("Successfully Updated!");
          setTimeout(() => setSuccess(null), 5000);
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response.data.errorMessage);
        setTimeout(() => setError(null), 5000);
      });
  }

  //delete user
  function handleDelete() {
    setLoading(true);
    service
      .deleteUser(selectedUser.id)
      .then((res) => {
        if (res.data.responseCode === 200) {
          setLoading(false);
          setDeleteUser(false);
          setSuccess("User deleted!");
          setTimeout(() => setSuccess(null), 5000);
        }
      })
      .catch((e) => {
        setLoading(false);
        setDeleteUser(false);
        setError(e.response.data.errorMessage);
        setTimeout(() => setError(null), 5000);
      });
  }

  function closeMessage() {
    setError(null);
    setSuccess(null);
  }

  return (
    <>
      <Sidebar />
      {success && <SuccessMessage message={success} onClose={closeMessage} />}
      {error && <ErrorMessage message={error} onClose={closeMessage} />}

      {edit && (
        <EditUser
          onClose={() => setEdit(false)}
          onSubmit={handleEditUser}
          user={selectedUser}
          loading={loading}
        />
      )}
      {CreateUser && (
        <CreateAccount
          onClose={() => setCreateUser(false)}
          onSubmit={handleCreateUser}
          loading={loading}
        />
      )}
      {deleteUser && (
        <DeleteUser
          onCancel={() => setDeleteUser(false)}
          onDelete={handleDelete}
          loading={loading}
        />
      )}

      <div id="dashboard" className="mg-l">
        <header>
          <div id="searchBar">
            <Search className="search-icon" />
            <input type="text" placeholder="search..." onChange={(e) => setQuery(e.target.value)} />
          </div>
        </header>

        <main>
          <button onClick={() => setCreateUser(true)}>
            <GroupAdd style={{ marginRight: 5 }} sx={{ fontSize: 20 }} />
            Create Account
          </button>

          <div>
            <table>
              <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.user_id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.status}</td>
                    <td>
                      <Edit
                        className="action-icons"
                        onClick={() => {
                          setSelectedUser(user);
                          setEdit(true);
                        }}
                      />
                      <Delete
                        className="action-icons"
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteUser(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            {users.length === 0 && <h3 className="search-error">No users found!</h3>}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
