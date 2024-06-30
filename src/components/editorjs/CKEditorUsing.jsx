"use client"; // only in App Router

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
} from "ckeditor5";
import { SlashCommand } from "ckeditor5-premium-features";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

function CKEditorUsing() {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: ["undo", "redo", "|", "bold", "italic"],
        },
        plugins: [
          Bold,
          Essentials,
          Italic,
          Mention,
          Paragraph,
          SlashCommand,
          Undo,
        ],
        licenseKey:
          "K1c5RnZMWStMWS95MFdLOTA5dm1yTnQ4TG1CeXNRSGUrOTZPK05IRDF0RGZLMHNyQVVRMjFNUWNUMlVGZ3c9PS1NakF5TkRBM016QT0=",
        mention: {
          // Mention configuration
        },
        initialData: "<p>Hello from CKEditor 5 in React!</p>",
      }}
    />
  );
}

export default CKEditorUsing;
