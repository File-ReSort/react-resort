import Link from "next/link";
import { useState } from "react";

export default function AddFiles() {
    const [visible, setVisible] = useState('none');
    return (
        <div style={{
            display: 'flex'
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '40px 60px'
            }}>
                <nav
                    defaultValue="first"
                >
                    <p>Try a Sample Document</p>
                    <p>File Upload</p>
                </nav>

                <div>
                    <input
                        placeholder="Enter document title here"
                        label="Title"
                    />

                    <table style={{ minWidth: '500px' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Size</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>example.txt</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{
                    display: 'flex',
                    justify: 'right'
                }}>
                    <Link href="/upload/2">
                        <button>
                            Continue
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}