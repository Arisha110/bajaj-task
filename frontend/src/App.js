import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:3000/bfhl", parsedData);
      setResponseData(res.data);
      setError("");
    } catch (err) {
      setError("Invalid JSON format.");
    }
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {responseData && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
