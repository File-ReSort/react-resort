import { Button, Container, Flex, Loader, Tabs, Table, TextInput, Space } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default function AddFiles() {
    const [visible, setVisible] = useState('none');
    return (
        <Flex justify='center' py={40} style={{ backgroundColor: '#c7d7eb' }}>
            <Container size="md" style={{
                backgroundColor: '#fff',
                padding: '40px 60px'
            }}>
                <Tabs
                    defaultValue="first"
                >
                    <Tabs.List>
                        <Tabs.Tab value="first">Try a Sample Document</Tabs.Tab>
                        <Tabs.Tab value="second">File Upload</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
                
                <Container py={30}>
                    <TextInput
                        placeholder="Enter document title here"
                        label="Title"
                    />
                    <Space h={20} />
                    <Table style={{ minWidth: '500px'}}>
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
                    </Table>
                </Container>

                <Flex justify='right' py={20}>
                    <Loader color="lime.3" variant="bars" style={{display: visible}} px={20}/>
                    <Link href="/upload/2">
                        <Button color="indigo.6" size="md">
                            Continue
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </Flex>
    );
}