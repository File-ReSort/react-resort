import React from 'react';
import Link from 'next/link';
import { Button, Placeholder } from 'semantic-ui-react';
import styles from '../styles/Home.module.css';

export default function Navigation() {

    const items = [
        { title: 'Upload Files', href: '/upload/1' },
        { title: 'View Documents', href: '/documents' },
        { title: 'Rules Database', href: '/rules' },
    ].map((item) => (
        <Link href={item.href}>
            {item.title}
        </Link>
    ));

    return (
        <div className={styles.HomeNav}>
            {items.map(item => (
              <Button style={{marginTop: "2rem"}}className={styles.navItem}>
                {item}
              </Button>
            ))}
        </div>
    );
  };

  /*
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
            */