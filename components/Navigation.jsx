import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import styles from '../styles/Home.module.css';

export default function Navigation() {
    return (
        <div className={styles.HomeNav}>
            <div>navbar links</div>
            <div>
                <Placeholder style={{ animationPlayState: "paused" }}>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>

                <Placeholder style={{ animationPlayState: "paused" }}>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>

                <Placeholder style={{ animationPlayState: "paused" }}>
                    <Placeholder.Paragraph>
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Paragraph>
                </Placeholder>
            </div>
        </div>
    );
  };