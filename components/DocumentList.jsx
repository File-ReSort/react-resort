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

    function formatDate(input) {
      const date = new Date(input);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      return (
          <span>
              {`${month} ${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'}, ${year}`}
          </span>
      );
  }

  const Table = () => {
    return (
      <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>File Name</th>
              <th className={styles.tableHeader}>Upload Date</th>
              <th className={styles.tableHeader}>Edit Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(document => (
              <tr className={styles.tableRow} key={document.ID}>
                <td className={styles.tableCell}>
                  <Link className={styles.link} href={`/documents/${document.ID}`}>{document.Name}</Link>
                </td>
                <td className={styles.tableCell}>{document.FileName}</td>
                <td className={styles.tableCell}>{formatDate(document.UploadDate)}</td>
                <td className={styles.tableCell}>{formatDate(document.LastEditDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
    )
  }
  
    return (
      <div className={styles.Inner}>
          <h3 className={styles.Title}>All files:</h3>

        {documents ? (
          <Table/>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      
    );
  };
  
  export default DocumentList;