import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Documents.module.css';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
  
    function fetchData() {
      // Fetch the list of documents from the API
      fetch('https://cr8qhi8bu6.execute-api.us-east-1.amazonaws.com/prod/documents')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setDocuments(data);
<<<<<<< HEAD
      });
    }

    const Docs = () => {
      fetchData();

      if (documents) {
        return documents.map(document => (
          <li className="list" key={document.ID}>
            <Link href={`/documents/${document.ID}`}>{document.Name}</Link>
          </li>
        ));
      } else {
        return (<li>Loading...</li>);
      }
    }
=======
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
>>>>>>> fixevan
  
    return (
      <div className={styles.Inner}>
        <h1 className={styles.title}>All files:</h1>

<<<<<<< HEAD
          <ul className="list">
            <Docs />
          </ul>
=======
        {documents ? (
          <Table/>
        ) : (
          <div>Loading...</div>
        )}
>>>>>>> fixevan
      </div>
    );
  };
  
  export default DocumentList;