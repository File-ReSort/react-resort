
export function getSlateJSON(spacy) {
    const out = spacy["annotations"];

    const blocks = out.map(item => {
        const block = {
            type: 'paragraph',
            children: []
        };
        const text = item[0];
        const entities = item[1]["entities"];
        const len = entities.length;

        if (len == 0) {
            block.children.push({
                text: text
            });

            return block;
        }

        let start = 0, end = 0;

        entities.forEach(entity => {
            start = entity[0];
            const between = text.slice(end, start);
            block.children.push({ text: between });

            end = entity[1];
            const btnText = text.slice(start, end);
            block.children.push({
                type: 'button',
                children: [{ text: btnText }]
            });
        })

        return block;
    });

    return blocks;
}