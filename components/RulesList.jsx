import React, { useState, useEffect } from 'react';
import styles from '../styles/Documents.module.css';

const RulesList = () => {
    const [rules, setRules] = useState([]);
  
    useEffect(() => {
      // Fetch the list of documents from the API
      fetch('https://cr8qhi8bu6.execute-api.us-east-1.amazonaws.com/prod/rules')
        .then(response => response.json())
        .then(data => {
          setRules(data);
        });
    }, []);
  
    return (
      <div className={styles.Inner}>
        <h1 className={styles.title}>All Rules:</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Word</th>
              <th className={styles.tableHeader}>Rule</th>
              <th className={styles.tableHeader}>Relationship</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(rule => (
              <tr className={styles.tableRow} key={rule.ruleID}>
                <td className={styles.tableCell}>{rule.Word}</td>
                <td className={styles.tableCell}>{rule.Rule}</td>
                <td className={styles.tableCell}>{rule.Relationship}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RulesList;