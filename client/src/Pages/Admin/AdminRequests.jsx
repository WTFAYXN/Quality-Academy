import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Navbar/Navbar";
import "./AdminRequests.css";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const userResponse = await fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          if (userResponse.status === 401 || userResponse.status === 403) {
            setError("Unauthorized access. Please log in as an admin.");
            navigate("/login");
          } else {
            setError("Failed to verify user.");
          }
          setLoading(false);
          return;
        }

        const userData = await userResponse.json();
        if (userData.role !== 1) {
          setError("Access denied. Admins only.");
          setLoading(false);
          navigate("/login");
          return;
        }

        const response = await fetch(`${API_URL}/permission-requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("Unauthorized access. Please log in as an admin.");
            navigate("/login");
          } else {
            setError("Failed to fetch permission requests.");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch permission requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [API_URL, navigate]);

  const handleApprove = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/approve-permission/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRequests((prev) => prev.filter((request) => request.user._id !== userId));
      } else {
        setError("Failed to approve the permission request.");
      }
    } catch (error) {
      setError("Error approving permission request.");
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
    <Nav />
    <div className="admin-requests">
      <h1>Permission Requests</h1>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id}>
              <p>Name: {request.user.name}</p>
              <p>Email: {request.user.email}</p>
              <button onClick={() => handleApprove(request.user._id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default AdminRequests;