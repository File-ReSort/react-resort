import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../styles/Upload.module.css'
import { useRouter } from 'next/router';
import ShowFile from '../../../components/ShowFile';


export default function documents() {
    return (
        <div>
            <Head>
                <title>File ReSort</title>
                <link rel="icon" href="../favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div className={styles.AppTop}>
                    <Link href={"/"} style={{display: "flex"}}>
                        <img src="../logo.png" alt="logo" width="58" height="54" />
                    <div>
                        <h1 id={styles.header}>File ReSort</h1>
                        <span id={styles.caption}>View document</span>
                    </div>
                    </Link>
                </div>

                <div className={styles.Content}>
                    <ShowFile />
                </div>
            </div>
        </div>

    );
}