import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null); 

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.success) {
        setSuccessMessage(result.message);
        setUsername(result.data.username); 
      } else {
        setError(result.message || "Authentication failed");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-container">
      <h2>Authenticate</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {username && <p className="username-display">Logged in as: {username}</p>}
      {error && <p className="error-message">{error}</p>}
      <button className="auth-button" onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
