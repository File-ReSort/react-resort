import { Button, Container, Flex, Loader, Tabs, Textarea, TextInput } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

export default function AddFiles() {
    const [visible, setVisible] = useState('none');
    return (
        <Flex justify='center' py={60} style={{ backgroundColor: '#8f9db8' }}>
            <Container size="md" style={{
                backgroundColor: '#fff',
                border: '1px solid #000',
                padding: '40px'
            }}>
                <Tabs
                    defaultValue="first"
                >
                    <Tabs.List>
                        <Tabs.Tab value="first">Plain Text</Tabs.Tab>
                        <Tabs.Tab value="second">File Upload</Tabs.Tab>
                    </Tabs.List>
                </Tabs>
                
                <Container py={30}>
                    <TextInput
                        placeholder="Enter document title here"
                        label="Title"
                    />

                    <Textarea
                        py={10}
                        placeholder="Enter document text here"
                        label="Document Text"
                        autosize
                        minRows={8}
                        style={{
                            minWidth: 600
                        }}
                    />
                </Container>

                <Flex justify='right' py={20}>
                    <Loader color="lime.3" variant="bars" style={{display: visible}} px={20}/>
                    <Link href="/upload/doc-editor">
                        <Button color="blue.4" size="md">
                            Continue
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </Flex>
    );
}