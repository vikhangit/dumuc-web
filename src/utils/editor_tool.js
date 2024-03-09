// import { uploadImage } from "@apis/other";
// import { Header } from "@editorjs/header";
// import { ImageTool } from "@editorjs/image";
// import { List } from "@editorjs/list";
// import { UnderlineInlineTool } from "editorjs-inline-tool";
// import { TextAlignmentTool } from "editorjs-text-alignment-tool";
// import {Code} from "@editorjs/code"
// import { InlineCode } from "@editorjs/inline-code";
// import { Table } from "@editorjs/table";
// import { Paragraph } from "@editorjs/paragraph";
// import { Quote } from "@editorjs/quote";
// import { Delimiter } from "@editorjs/delimiter";
// import { TextVariantTune } from "@editorjs/text-variant-tune";
// import { Marker } from "@editorjs/marker";
// import { ChangeCase } from "editorjs-change-case";
// import { Strikethrough } from "@sotaproject/strikethrough";
// import { Embed } from "@editorjs/embed";



// export const EDITOR_TOOLS = {
//           textAlignment: {
//             class: TextAlignmentTool,
//             config: {
//               default: "left",
//               blocks: {
//                 header: "left",
//                 list: "left",
//               },
//             },
//           },
//           header: {
//             class: Header,
//             inlineToolbar: true,
//             tunes: ["textAlignment", "textVariant"],
//             config: {
//               levels: [2, 3, 4, 5, 6],
//               defaultLevel: 3,
//             },
//           },
//           underline: UnderlineInlineTool,
//           // linkTool: {
//           //   class: LinkTool,
//           //   config: {
//           //     endpoint: '/api/link',
//           //   },
//           // },
//           image: {
//             class: ImageTool,
//             config: {
//               uploader: {
//                 uploadByFile(file) {
//                   return uploadImage(file, user?.).then((data) => {
//                     return {
//                       success: 1,
//                       file: {
//                         url: data?.url,
//                       },
//                     };
//                   });
//                 },
//                 uploadByUrl(url) {
//                   const fileName = "myFile.jpg";
//                   return axios
//                     .get(url, { responseType: "blob" })
//                     .then(async (response) => {
//                       const contentType = response.headers.get("content-type");
//                       const blob = await response.data;
//                       const file = new File([blob], fileName, {
//                         contentType,
//                         type: contentType,
//                       });
//                       // access file here
//                       return uploadImage(file, ).then((data) => {
//                         return {
//                           success: 1,
//                           file: {
//                             url: data?.url,
//                           },
//                         };
//                       });
//                     })
//                     .catch((err) => console.log("err", err));
//                 },
//               },
//             },
//           },
//           // gallery: {
//           //   class: ImageGallery,
//           //   inlineToolbar: true,
//           //   config: {
//           //     uploader: {
//           //       uploadByFile(file) {
//           //         console.log("file: ", file);
//           //         return uploadImage(file, ).then((data) => {
//           //           console.log("DAta:", data);
//           //           return {
//           //             success: 1,
//           //             file: {
//           //               url: data?.url.replace("amp;", ""),
//           //             },
//           //           };
//           //         });
//           //       },
//           //       uploadByUrl(url) {
//           //         const fileName = "myFile.jpg";
//           //         return axios
//           //           .get(url, { responseType: "blob" })
//           //           .then(async (response) => {
//           //             const contentType = response.headers.get("content-type");
//           //             const blob = await response.data;
//           //             const file = new File([blob], fileName, {
//           //               contentType,
//           //               type: contentType,
//           //             });
//           //             // access file here
//           //             return uploadImage(file, ).then((data) => {
//           //               return {
//           //                 success: 1,
//           //                 file: {
//           //                   url: data?.url,
//           //                 },
//           //               };
//           //             });
//           //           })
//           //           .catch((err) => console.log("err", err));
//           //       },
//           //     },
//           //   },
//           // },
//           list: {
//             class: List,
//             inlineToolbar: true,
//             tunes: ["textAlignment"],
//           },
//           code: {
//             class: Code,
//             inlineToolbar: true,
//             tunes: ["textAlignment"],
//           },
//           inlineCode: {
//             class: InlineCode,
//             inlineToolbar: true,
//             tunes: ["textAlignment"],
//           },
//           table: {
//             class: Table,
//             inlineToolbar: true,
//             tunes: ["textAlignment"],
//           },
//           embed: {
//             class: Embed,
//             inlineToolbar: true,
//             tunes: ["textAlignment"],
//           },
//           paragraph: {
//             class: Paragraph,
//             inlineToolbar: true,
//             tunes: ["textAlignment", "textVariant"],
//           },
//           quote: {
//             class: Quote,
//             inlineToolbar: true,
//             config: {
//               quotePlaceholder: "Enter a quote",
//               captionPlaceholder: "Quote's author",
//             },
//           },
//           delimiter: {
//             class: Delimiter,
//             inlineToolbar: true,
//             tunes: ["textAlignment"],
//           },
//           // fontSize: {
//           //   class: FontSize,
//           // },
//           textVariant: TextVariantTune,
//           Marker: {
//             class: Marker,
//             shortcut: "CMD+SHIFT+M",
//           },
//           changeCase: ChangeCase,
//           strikethrough: Strikethrough,
//         }