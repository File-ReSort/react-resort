import { Button, Checkbox, Container, Flex, Select } from '@mantine/core';
import React, { useState } from 'react';
import { AddLinkButton, Element, RemoveLinkButton, Text, ToggleEditableButtonButton } from '../lib/inlines';
import { withHistory } from 'slate-history';
import { Toolbar } from '../lib/slate-components';
import { createEditor } from 'slate';
import { Editable, withReact } from 'slate-react';
import * as SlateReact from 'slate-react';

export default function RuleEditor() {
    const [editor] = useState(() => withInlines(withHistory(withReact(createEditor()))));

    // credit: Slate
    function onKeyDown(event) {
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
            const { nativeEvent } = event
            if (isKeyHotkey('left', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset', reverse: true })
                return
            }
            if (isKeyHotkey('right', nativeEvent)) {
                event.preventDefault()
                Transforms.move(editor, { unit: 'offset' })
                return
            }
        }
    }
    //end Slate

    return(
        <Flex justify="center">

        </Flex>
    );
}

const data = [
    {
      "type": "paragraph",
      "children": [
        {
          "text": "§1. "
        },
        {
          "type": "button",
          "tag": "ORGANIZATION",
          "value": "52b8abe5-806a-4915-ba74-f774e4e4d2a1",
          "children": [
            {
              "text": "Office of the Comptroller of the Currency"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "text": "(a) "
        },
        {
          "type": "button",
          "tag": "ORGANIZATION",
          "value": "c105faf1-bd91-4850-bc83-9add66e2f500",
          "children": [
            {
              "text": "Office of the Comptroller of the Currency"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "text": "There is established in the "
        },
        {
          "type": "button",
          "tag": "ORGANIZATION",
          "value": "699a8640-97e5-48d6-8136-147042b12d0b",
          "children": [
            {
              "text": "Department of the Treasury"
            }
          ]
        },
        {
          "text": " a bureau to be known as the \""
        },
        {
          "type": "button",
          "tag": "ORGANIZATION",
          "value": "4a50910a-2515-4ebd-b7a6-5a549fa236ec",
          "children": [
            {
              "text": "Office of the Comptroller of the Currency"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "text": "(b) "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "b9825869-b350-403c-bc91-ac0f16e92f84",
          "children": [
            {
              "text": "Comptroller of the Currency"
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "text": "(1) In general\r"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "text": "\r"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "text": "The "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "7f903c1d-9e28-493f-adbe-697a2ece93d5",
          "children": [
            {
              "text": "chief officer"
            }
          ]
        },
        {
          "text": " of the "
        },
        {
          "type": "button",
          "tag": "ORGANIZATION",
          "value": "cbf4d6f5-ac31-4ad8-92fe-7fd4f8271049",
          "children": [
            {
              "text": "Office of the Comptroller of the Currency"
            }
          ]
        },
        {
          "text": " shall be known as the "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "ae2fe987-6bad-440f-8931-07b94d89d1aa",
          "children": [
            {
              "text": "Comptroller of the Currency."
            }
          ]
        },
        {
          "text": " The "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "ab56faf5-7d60-46f2-95f3-e955d30ce6f6",
          "children": [
            {
              "text": "Comptroller of the Currency"
            }
          ]
        },
        {
          "text": " shall perform the duties of the "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "3f2e422e-d639-4e83-952f-368c0c50d328",
          "children": [
            {
              "text": "Comptroller of the Currency"
            }
          ]
        },
        {
          "text": " under the general direction of the "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "60fe6af9-cf1b-440b-a064-63fb487797e9",
          "children": [
            {
              "text": "Secretary of the Treasury."
            }
          ]
        },
        {
          "text": " The "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "a1e9df93-55fb-43e2-ab23-f278661aa1c7",
          "children": [
            {
              "text": "Secretary of the Treasury"
            }
          ]
        },
        {
          "text": " may not delay or prevent the issuance of any rule or the promulgation of any regulation by the "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "a0ad16c5-3318-424e-8bd5-340e7c62290e",
          "children": [
            {
              "text": "Comptroller of the Currency"
            }
          ]
        },
        {
          "text": ", and may not intervene in any matter or proceeding before the "
        },
        {
          "type": "button",
          "tag": "PERSON",
          "value": "e5fb9319-e5bb-48e4-9e0f-be447ed5dd7a",
          "children": [
            {
              "text": "Comptroller of the Currency"
            }
          ]
        }
      ]
    }
  ]