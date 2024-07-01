"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import translations from "ckeditor5/translations/vi.js";

import "ckeditor5/ckeditor5.css";

function CustomEditor(props) {
  const editorConfiguration = {
    // plugins: [LinkImage, Link],
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: ["imageTextAlternative"],
    },
    language: "vi",
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
    htmlEmbed: {
      showPreviews: true,
      sanitizeHtml: (inputHtml) => {
        const outputHtml = sanitize(inputHtml);
        return {
          html: outputHtml,
          hasChanged: true,
        };
      },
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    placeholder: props.placeholder,
    translations: [translations],
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
