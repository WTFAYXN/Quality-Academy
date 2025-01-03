import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Navbar/Navbar';
import './AdminRequests.css';
import pending from './pending.svg';
import docs from '../../assets/images/docs.png';
import excel from '../../assets/images/excel.png';
import jpg from '../../assets/images/jpg.png';
import mp4 from '../../assets/images/mp4.png';
import pd from '../../assets/images/pdf.png';
import line from '../../assets/svgs/Line.svg';
import Footer from '../../components/Footer/Footer';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTitle, setEditingTitle] = useState({});
  const [editingCategory, setEditingCategory] = useState({});
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        navigate('/login');
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
            setError('Unauthorized access. Please log in as an admin.');
            navigate('/login');
          } else {
            setError('Failed to verify user.');
          }
          setLoading(false);
          return;
        }

        const userData = await userResponse.json();
        if (userData.role !== 1) {
          setError('Access denied. Admins only.');
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await fetch(`${API_URL}/pending-resources`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError('Unauthorized access. Please log in as an admin.');
            navigate('/login');
          } else {
            setError('Failed to fetch permission requests.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setRequests(data.filter(requests => requests.category.toLowerCase() !== 'quiz'));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch permission requests.');
        setLoading(false);
      }
    };

    fetchRequests();
  }, [API_URL, navigate]);

  const handlePublish = async (resourceId) => {
    const token = localStorage.getItem('token');
    const title = editingTitle[resourceId] || '';
    const category = editingCategory[resourceId] || '';
    try {
      const response = await fetch(`${API_URL}/publish-resource/${resourceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, category }),
      });

      if (response.ok) {
        setRequests((prev) => prev.filter((request) => request._id !== resourceId));
      } else {
        setError('Failed to publish the resource.');
      }
    } catch (error) {
      setError('Error publishing resource.');
    }
  };

  const handleReject = async (resourceId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/reject-resource/${resourceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRequests((prev) => prev.filter((request) => request._id !== resourceId));
      } else {
        setError('Failed to reject the resource.');
      }
    } catch (error) {
      setError('Error rejecting resource.');
    }
  };

  const handleTitleChange = (resourceId, newTitle) => {
    setEditingTitle((prev) => ({ ...prev, [resourceId]: newTitle }));
  };

  const handleCategoryChange = (resourceId, newCategory) => {
    setEditingCategory((prev) => ({ ...prev, [resourceId]: newCategory }));
  };

  const renderPreview = (resource) => {
    const fileExtension = resource.imageUrl.split('.').pop().toLowerCase();
    const fileTypeIcons = {
      pdf: pd,
      xls: excel,
      xlsx: excel,
      doc: docs,
      docx: docs,
      jpg: jpg,
      jpeg: jpg,
      png: jpg,
      gif: 'path/to/image-icon.png',
      mp4: mp4,
      webm: 'path/to/video-icon.png',
      ogg: 'path/to/video-icon.png',
      mp3: 'path/to/audio-icon.png',
      wav: 'path/to/audio-icon.png',
    };

    const fileTypeIcon = fileTypeIcons[fileExtension] || 'path/to/default-icon.png';

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return <img src={resource.imageUrl} alt={resource.title} />;
    } else {
      return <img src={fileTypeIcon} alt={resource.title} />;
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <Nav />
      <div className="container table-responsive py-5">
        <div className="heading-resources">
          <h1 className="heading-resources-text">Pending Resource</h1>
          <img className='resources-line' src={line} alt="Line" />
        </div>
        {requests.length === 0 ? (
          <p className="no-req"><span><img src={pending} alt="Pending" /></span>No pending requests.</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Uploaded by</th>
                <th scope="col">Email</th>
                <th scope="col">File</th>
                <th scope="col">Publish?</th>
                <th scope="col">Reject?</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      type="text"
                      value={editingTitle[request._id] || request.title}
                      onChange={(e) => handleTitleChange(request._id, e.target.value)}
                      className="form-control title-input"
                    />
                  </td>
                  <td>
                    <select
                      value={editingCategory[request._id] || request.category}
                      onChange={(e) => handleCategoryChange(request._id, e.target.value)}
                      className="form-control"
                    >
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="Geography">Geography</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Research">Research</option>
                      <option value="Publication">Publication</option>
                      <option value="ISO">ISO</option>
                      <option value="COPC">COPC</option>
                      <option value="Digital Transformation">Digital Transformation</option>
                      <option value="Lean Six Sigma">Lean Six Sigma</option>
                      <option value="Continuous Improvement">Continuous Improvement</option>
                      <option value="Business Process Management">Business Process Management</option>
                      <option value="Others">Others</option>
                    </select>
                  </td>
                  <td>{request.uploadedBy.name}</td>
                  <td>{request.uploadedBy.email}</td>
                  <td>
                    <a href={request.imageUrl} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                  <td>
                    <button className='btn btn-success' onClick={() => handlePublish(request._id)}>Publish</button>
                  </td>
                  <td>
                    <button className='btn btn-danger' onClick={() => handleReject(request._id)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminRequests;