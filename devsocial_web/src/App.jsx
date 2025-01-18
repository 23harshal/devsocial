import { BrowserRouter, Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import ConnectionRequests from "./components/ConnectionRequests";
import Chat from "./components/Chat";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<ConnectionRequests />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
