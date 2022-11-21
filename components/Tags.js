import { Checkbox } from "@mantine/core";
import React from "react";

export default function Tags({obj, onChange}) {
    return (
        <Checkbox.Group onChange={onChange}>
            {obj.map(block =>
                block.children.map(child => {
                    if (child.children) {
                        const txt = child.children[0].text;
                        const currentVal = child.value;
                        console.log(JSON.stringify(currentVal));
        
                        return (
                            <Checkbox value={currentVal} label={txt} />
                        );
                    }
                })
            )}
        </Checkbox.Group>
    );
}