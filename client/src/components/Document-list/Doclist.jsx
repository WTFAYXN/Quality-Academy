import React from 'react';
import './Doclist.css';

const Doclist = ({ filteredResources, handleDelete, isAdmin }) => {
  return (
    <ul className="document-list">
      <div className="document-header">
        <li id="title" className="title">Title</li>
        <li id="category" className="category">Category</li>
        <li id="uploadedBy" className="uploadedBy">Uploaded by</li>
        <li id="uploadDate" className="uploadDate">Upload Date</li>
        <li id="fileType" className="fileType">File Type</li>
        <li id="download" className="download">Download</li>
        {isAdmin && <li id="delete" className="delete">Delete</li>}
      </div>
      {filteredResources.map((resource) => (
        <div key={resource._id} className="documents">
          <li className="title">{resource.title}</li>
          <li className="category">{resource.category}</li>
          <li className="uploadedBy">{resource.uploadedBy.name}</li> {/* Use resource.uploadedBy.name */}
          <li className="uploadDate">
            {new Date(resource.createdAt).toLocaleDateString()}
          </li>
          <li className="fileType">
            {resource.imageUrl.split('.').pop().toLowerCase()}
          </li>
          <li 
            className="download" 
            onClick={() => window.open(resource.imageUrl, '_blank')}
            style={{cursor: 'pointer'}}
          >
            Download
          </li>
          {isAdmin && <button className='delete-btn-resource delete' onClick={() => handleDelete(resource._id)}>Delete</button>}
        </div>
      ))}
    </ul>
  );
};

export default Doclist;