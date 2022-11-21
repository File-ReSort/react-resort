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
                    const txt = child.children[0].text;
    
                    return (
                        <tr key={i}>
                            <td><Checkbox onClick={ changeTags } /></td>
                            <td></td>
                            <td>{txt}</td>
                        </tr>
                    );
                }
            })
        ));
    }

    function changeTags() {
        let tags = localStorage.getItem('content');
        console.log(tags);
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