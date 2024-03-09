export default function ColumnComponent({ api, data, onObjChange }) {
  return (
    <div id="root1" style={{ display: "flex" }}>
      <div
        id="left-div"
        style={{ border: "solid 1px red", height: "30px", width: "30vw" }}
      >
        <button
          onClick={() => {
            api.blocks.insert(
              "paragraph",
              { text: "custom 1" },
              undefined,
              undefined,
              true,
              undefined,
              document.getElementById("left-div")
            );
          }}
        >
          add block
        </button>
      </div>
      <div
        id="right-div"
        style={{ border: "solid 1px yellow", height: "30px", width: "30vw" }}
      >
        <button
          onClick={() => {
            api.blocks.insert(
              "paragraph",
              { text: "custom 2" },
              undefined,
              undefined,
              true,
              undefined,
              document.getElementById("right-div")
            );
          }}
        >
          add block
        </button>
      </div>
    </div>
  );
}
