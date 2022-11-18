import { Checkbox, Table } from "@mantine/core";
import React from "react";

export default function Tags({obj}) {
    let i = -1;
    const Rows = () => {
        return(
            obj.map(block =>
            block.children?.map(child => {
                if (child.children) {
                    i++;
                    console.log(child.children[0].text);
                    const txt = child.children[0].text;
    
                    return (
                        <tr key={i}>
                            <td></td>
                            <td></td>
                            <td>{txt}</td>
                        </tr>
                    );
                }
            })
        ));
    }
    
    return (
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
    )
}