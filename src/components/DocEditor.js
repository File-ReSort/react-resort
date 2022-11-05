import { RoughNotation } from "react-rough-notation";
import { RN } from './RN';
import { RNG } from './RNG';
import './styles/DocEditor.css';

const types = [
    {
      animationDuration: 1500,
      backgroundColor: "#fff8f1",
      brackets: ["left", "right"],
      color: "#f57f17",
      multiline: true,
      title: "Multiple lines",
      value: "highlight",
      copy: (props) => (
        <>
          <p>Ability to annotate inline content that can span multiple lines</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan
            nisi hendrerit augue molestie tempus. Phasellus purus quam, aliquet
            nec commodo quis, pharetra ut orci.{" "}
            <RoughNotation {...props}>
              Donec laoreet ligula nisl, placerat molestie mauris luctus id. Fusce
              dapibus non libero nec lobortis. Nullam iaculis nisl ac eros
              consequat, sit amet placerat massa vulputate. Maecenas euismod
              volutpat ultrices. Pellentesque felis ex, ullamcorper in felis
              finibus, feugiat dignissim augue.
            </RoughNotation>{" "}
            Integer malesuada non eros consectetur interdum. Mauris mollis non
            urna in porta.
          </p>
        </>
      ),
    },
  ];

export default function DocEditor() {
    return (
        <div className="DocEditor">
            <div className="Text-container">
                {types.map((type, index) => (
                    <RN key={index} type={type} />
                ))}
            </div>
            <div className="Doc-options">
                <div>
                    <h3>Rules</h3>
                </div>
                <div className="Tags-container">
                    <h3>Entities</h3>
                    <div>
                        <table>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}