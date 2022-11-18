import { Checkbox, Table } from "@mantine/core";
import React from "react";

const Tags = ({obj}) => {
    const Rows = () => {
        let i = -1;
        return(
            obj.forEach(block =>
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
    
    return (
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
        </div>
    )
}
export default Tags;