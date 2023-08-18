import { Router, Route, Routes } from "@solidjs/router";
import { createResource } from "solid-js";
import { Toaster } from "solid-toast";
import { User, getUsers } from "./helpers/userApi";

function App() {
  const [users] = createResource<User[]>(getUsers);

  function Data() {
    return (
      <div>
        {users.loading && <div>Loading...</div>}
        {users.error && <div>{users.error.message}</div>}
        {!users.loading && !users.error && (
          <div>
            {users()?.map((user) => (
              <div>{user.userName}</div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Data />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
