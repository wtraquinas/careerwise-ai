import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    api.get("/health")
      .then((res) => {
        console.log("Response:", res.data);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.error(err);
        setStatus("Offline");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>CareerWise</h1>
      <h2>Backend Status:</h2>
      <p>{status}</p>
    </div>
  );
}

export default App;