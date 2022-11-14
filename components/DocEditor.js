import { Button, Checkbox, Container, Flex, Table } from "@mantine/core";
import InlinesExample from '../lib/inlines';
import styles from '../styles/DocEditor.module.css';

const DocEditor = () => {
    return (
        <div className={styles.editor}>
            <div className={styles.txtContainer}>
                <div className={styles.text}>
                    <InlinesExample />
                </div>
            </div>
            <div className={styles.options}>
                <div className={styles.section}>
                    <h3>Rules</h3>

                </div>
                <div className={styles.section}>
                    <h3>Entities</h3>
                    <div className={styles.tags}>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ width: 40 }}>
                                        <Checkbox />
                                    </th>
                                    <th>Tag</th>
                                    <th>Text</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className={styles.section}>
                <Button variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 105 }}>Save and Continue</Button>
                </div>
            </div>
        </div>
    );
}

export default DocEditor;