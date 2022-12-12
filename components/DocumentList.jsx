import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Documents.module.css';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
  
    useEffect(() => {
      // Fetch the list of documents from the API
      fetch('https://cr8qhi8bu6.execute-api.us-east-1.amazonaws.com/prod/documents')
        .then(response => response.json())
        .then(data => {
          setDocuments(data);
        });
    }, []);
  
    return (
      <div className={styles.Inner}>
          <h3 className={styles.Title}>All files:</h3>

          <ul className="list">
            {documents.map(document => (
            <li className="list" key={document.ID}>
              <Link href={`/documents/${document.ID}`}>{document.Name}</Link>
            </li>
            ))}
          </ul>
      </div>
      
    );
  };
  
  export default DocumentList;