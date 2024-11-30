import React, { useState, useEffect } from 'react';
import './Resources.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import line from '../../assets/svgs/Line.svg';
import download from '../../assets/images/download-icon.png';
import filtera from '../../assets/svgs/ascending.svg';
import upload from '../../assets/svgs/upload.svg';
import pd from '../../assets/images/pdf.png';

const fileTypeIcons = {
  pdf: pd,
  xls: 'path/to/excel-icon.png',
  xlsx: 'path/to/excel-icon.png',
  doc: 'path/to/word-icon.png',
  docx: 'path/to/word-icon.png',
  jpg: 'path/to/image-icon.png',
  jpeg: 'path/to/image-icon.png',
  png: 'path/to/image-icon.png',
  gif: 'path/to/image-icon.png',
  mp4: 'path/to/video-icon.png',
  webm: 'path/to/video-icon.png',
  ogg: 'path/to/video-icon.png',
  mp3: 'path/to/audio-icon.png',
  wav: 'path/to/audio-icon.png',
};

const Resources = () => {
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    // Fetch resources from the server when the component mounts
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      // Automatically trigger upload when a file is selected
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('File uploaded successfully');
          // Fetch the updated list of resources after upload
          const updatedResources = await fetch('http://localhost:5000/resources');
          const data = await updatedResources.json();
          setResources(data);
        } else {
          alert('File upload failed');
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        alert('An error occurred during file upload');
      }
    }
  };

  const handleSort = () => {
    const sortedResources = [...resources].sort((a, b) => {
      if (isAscending) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setResources(sortedResources);
    setIsAscending(!isAscending);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/resources/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Resource deleted successfully');
        // Fetch the updated list of resources after deletion
        const updatedResources = await fetch('http://localhost:5000/resources');
        const data = await updatedResources.json();
        setResources(data);
      } else {
        alert('Resource deletion failed');
      }
    } catch (error) {
      console.error('Error during resource deletion:', error);
      alert('An error occurred during resource deletion');
    }
  };

  const renderPreview = (resource) => {
    const fileExtension = resource.imageUrl.split('.').pop().toLowerCase();
    const fileTypeIcon = fileTypeIcons[fileExtension] || 'path/to/default-icon.png';
    return <img src={fileTypeIcon} alt={resource.title} />;
  };

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="heading-resources">
        <h1 className="heading-resources-text">Elevate your knowledge with Our Resources</h1>
        <img src={line} alt="Line" />
        <p className="heading-p">One solution for your Learning Preparation</p>
      </div>
      <div className="resources">
        <div className="search-filter">
          <input
            className="resources-search"
            type="text"
            placeholder="Search Resources"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="resource-button">
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <button
              className="upload"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <img src={upload} alt="Upload" />
            </button>
            <button className="filter" onClick={handleSort}>
              <img src={filtera} alt="Filter" />
            </button>
          </div>
        </div>
        <div className="resource-grid">
          {filteredResources.map((resource) => (
            <div key={resource._id}>
              {renderPreview(resource)}
              <div className="download-resources">
                <h3>{resource.title}</h3>
                <a href={resource.imageUrl} download>
                  <img src={download} alt="Download" />
                </a>
                <button onClick={() => handleDelete(resource._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resources;