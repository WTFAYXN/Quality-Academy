import './Doclist.css';

export default function Doclist() {

    
    return (
        <>
        <ul className="document-list">
            <div className="document-header">
                <li id="title" className="title">Title</li>
                <li id="uploadedBy" className="uploadedBy">Uploaded by</li>
                <li id="uploadDate" className="uploadDate">Upload Date</li>
                <li id="uploadDate" className="fileType">File Type</li>
                <li id="download" className="download">Download</li>
            </div>
            {filteredResources.map((resource) => (
                <div key={resource._id} className="documents">
                    <li className="title">{resource.title}</li>
                    <li className="uploadedBy">{resource.uploadedBy}</li>
                    <li className="uploadDate">
                        {new Date(resource.uploadDate).toLocaleDateString()}
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
                </div>
            ))}
        </ul>
        </>
    )
}

