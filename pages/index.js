import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Placeholder } from 'semantic-ui-react';

const items = [
    { title: 'Upload Files', href: '/upload/doc-editor' },
    { title: 'Link 2', href: '#' },
    { title: 'Link 3', href: '#' },
].map((item, index) => (
    <Link href={item.href} key={index}>
        {item.title}
    </Link>
));

const Home = () => {
    return (
        <div>
            <Head>
                <title>File ReSort</title>
                <link rel="icon" href="favicon.ico" />
            </Head>
            <div className={styles.container}>
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
                    </div>
                </div>

                <div>
                    <div>
                        <h1>File ReSort</h1>
                    </div>
                    <div>
                        <div>
                            <div>No files yet!</div>

                            <Link href="/upload/1">
                                <button>
                                    Get Started
                                </button>
                            </Link>
                        </div>
                        <img src="No.png" width={300} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;
