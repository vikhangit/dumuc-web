import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

function CustomEditor(props) {
  const editorConfiguration = {
    //  plugins: [ MediaEmbed],
    mediaEmbed: {
      previewsInData: true,
      extraProviders: [
        {
          name: "extraProvider",
          url: /^example\.com\/media\/(\w+)/,
          html: (match) =>
            `The HTML representing the media with ID=${match[1]}.`,
        },
      ],
    },
    placeholder: props.initialData === "" && props.placeholder,
  };
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={props.initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.setData(data);
      }}
    />
  );
}

export default CustomEditor;
