import { Button, Checkbox, Table } from "@mantine/core";
import React from "react";

function Rows(blocks) {
    let i = -1;
    return(blocks.forEach(block =>
        block.children?.map(child => {
            if (child.children) {
                i++;
                console.log(child.children[0].text);
                const txt = JSON.stringify(child.children[0].text);

                return (
                    <tr key={i}>
                        <td></td>
                        <td></td>
                        <td>{txt}</td>
                    </tr>
                );
            } else {
                return (
                    <tr key={i}>
                        <td></td>
                        <td></td>
                        <td>no data</td>
                    </tr>
                )
            }
        })
    ));
}
class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: [{}]
        };
    }
    
    saveTags() {
        const str = localStorage.getItem('content');
        console.log(str);

        this.setState({
            obj: JSON.parse(str)
        })
    }

    render() {
        <div>
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
                <Rows />
            </tbody>
        </Table>
        <Button onClick={saveTags} variant="gradient" gradient={{ from: 'lime', to: 'cyan', deg: 105 }}>Save and Continue</Button>
        </div>
    };
}
export default Tags;