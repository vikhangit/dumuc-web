"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';

import { uploadImage } from "apis/other";
import {
  createUserRanking,
} from "@apis/users";
import {
  getCategories,
  createPostByUser,
  updatePostByUser,
  getPost,
  getLabels,
} from "@apis/posts";

import {UnderlineInlineTool} from 'editorjs-inline-tool';

import Header from "@components/Header";
import BannerRight from "@components/BannerRight";

import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import TabbarBottom from "@components/TabbarBottom";

const PostWritePage = ({ searchParams }) => {
  const postId = searchParams?.id;

  
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef();
  const [categories, setCategories] = useState([]);
  
  const [title, setTitle] = useState();
  const [titleError, setTitleError] = useState("");
  
  const [description, setDescription] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [label, setLabel] = useState("")
  
  const [category, setCategory] = useState();
  const [categoryError, setCategoryError] = useState("");
  
  const [isLongform, setIsLongform] = useState(false);
  const [editor, setEditor] = useState();
  const [editorError, setEditorError] = useState();

  const [labelList, setLabelList] = useState([])
  
  const initializeEditor = async (accessToken, data) => {
    const EditorJS = (await require("@editorjs/editorjs")).default;
    const Header = await require("@editorjs/header");
    const Embed = await require("@editorjs/embed");
    const InlineCode = await require("@editorjs/inline-code");
    const ImageTool = await require("@editorjs/image");
    const ImageLink = await require('editorjs-inline-image');;
    const Quote = await require("@editorjs/quote");
    const Paragraph = await require("@editorjs/paragraph");
    const TextAlignmentTool =
      await require("editorjs-text-alignment-blocktune");
    const Delimiter = await require("@editorjs/delimiter");
    const TextVariantTune = await require("@editorjs/text-variant-tune");
    const Marker = await require("@editorjs/marker");
    const Strikethrough = await require("@sotaproject/strikethrough");
    if(!ref.current){
      const editor = new EditorJS({
        holder: "editorjs-container",
        tools: {
          textAlignment: {
            class: TextAlignmentTool,
            config: {
              default: "left",
              blocks: {
                header: "left",
                list: "left",
              },
            },
          },
          header: {
            class: Header,
            Toolbar: true,
            toolbox: [
              {
                icon:"<p style='font-size: 14px; font-weight:700'>H<span style='font-size: 9px; font-weight:800'>1</span></p>",
                title: 'Tiêu đề 1 (32px)',
                data: {
                  level: 1,
                },
              },
              {
                icon:"<p style='font-size: 14px; font-weight:700'>H<span style='font-size: 9px; font-weight:800'>2</span></p>",
                title: 'Tiêu đề 2 (24px)',
                data: {
                  level: 2,
                },
              },
              {
                icon:"<p style='font-size: 14px; font-weight:700'>H<span style='font-size: 9px; font-weight:800'>3</span></p>",
                title: 'Tiêu đề 3 (18.72px)',
                data: {
                  level: 3,
                },
              }
            ]
            ,
            tunes: ["textAlignment", "textVariant"],
            config: {
              placeholder: 'Nhập tiêu đề',
              levels: [2, 3, 4, 5, 6],
              defaultLevel: 3,
            },
          },
          underline: UnderlineInlineTool,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  return uploadImage(file, user?.accessToken).then((data) => {
                    return {
                      success: 1,
                      file: {
                        url: data?.url,
                      },
                    };
                  });
                },
                uploadByUrl(url) {
                  const fileName = "myFile.jpg";
                  return axios
                    .get(url, { responseType: "blob" })
                    .then(async (response) => {
                      const contentType = response.headers.get("content-type");
                      const blob = await response.data;
                      const file = new File([blob], fileName, {
                        contentType,
                        type: contentType,
                      });
                      // access file here
                      return uploadImage(file, user?.accessToken).then((data) => {
                        return {
                          success: 1,
                          file: {
                            url: data?.url,
                          },
                        };
                      });
                    })
                    .catch((err) => console.log("err", err));
                },
              },
            },
          },
           imageInline: {
            class: ImageLink,
            inlineToolbar: true,
            toolbox:{
              icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16"> <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/> <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/> </svg>',
            },
            config: {
              embed: {
                display: true,
              },
            
            }
           },
          // code: {
          //   class: Code,
          //   inlineToolbar: true,
          //   tunes: ["textAlignment"],
          // },
          inlineCode: {
            class: InlineCode,
            inlineToolbar: true,
            tunes: ["textAlignment"],
          },
          embed: Embed,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ["textAlignment", "textVariant"],
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Caption",
            },
          },
          delimiter: {
            class: Delimiter,
            inlineToolbar: true,
            tunes: ["textAlignment"],
          },
          textVariant: TextVariantTune,
          Marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
          strikethrough: Strikethrough,
        },
        i18n: {
          /**
         * @type {I18nDictionary}
          */
         messages: {
           ui: {
              // Translations of internal UI components of the editor.js core
              "blockTunes": {
                "toggler": {
                  "Click to tune": "Bấm để điều chỉnh",
                  "or drag to move": "hoặc kéo để di chuyển"
                },
              },
              "inlineToolbar": {
                "converter": {
                  "Convert to": "Chuyển đổi sang"
                }
              },
              "toolbar": {
                "toolbox": {
                  "Add": "Thêm mới"
                }
              }
            },
            toolNames: {
              // Section for translation Tool Names: both block and inline tools
              "Text": "Đoạn văn",
              "Heading": "Tiêu đề",
              "Quote": "Trích dẫn",
              "Delimiter": "Phân cách",
              "Link": "Đường đẫn",
              "Marker": "Đánh dấu",
              "Bold": "In đậm",
              "Italic": "In đậm",
              "InlineCode": "Code",
              "InlineImage": "Đường dẫn ảnh",
              "Image": "Hình ảnh",
              "Strikethrough": "Gạch ngang",
              "Underline": "Gách dưới",
              "ChangeCase": "Thay đổi kiểu chữ",
              
            },
            tools: {
              "warning": { // <-- 'Warning' tool will accept this dictionary section
                "Title": "Название",
                "Message": "Сообщение",
              },
              "link": {
                "Add a link": "Thêm một đường dẫn"
              },
              "stub": {
                'The block can not be displayed correctly.': 'Блок не может быть отображен'
              }
            },
            blockTunes: {
              // Section allows to translate Block Tunes
              "delete": {
                "Delete": "Xóa"
              },
              "moveUp": {
                "Move up": "Di chuyển lên"
              },
              "moveDown": {
                "Move down": "Di chuyển xuống"
              }, 
            },
          }
        },
        tunes: ["textAlignment", "textVariant"],
        data: {
          blocks: data,
        },
        
      });
      ref.current = editor
    }
  };

  //tags
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    getLabels().then(list => setLabelList(list));
  }, []);
  useEffect(() => {
    getPost({
      postId,
    }).then((data) => {
        setTitle(data?.title);
        setTags(data?.tags);
        setCategory(data?.category);
        setIsLongform(data?.isLongform);
        setEditor(data?.body?.blocks);
        setLabel(data?.label?.labelId)
    })
  }, [postId])

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags?.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        {tagElem}
      </span>
    );
  };

  const tagChild = tags?.map(forMap);
  const tagPlusStyle = {
    borderStyle: 'dashed',
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
    getCategories().then((result) =>
      setCategories(result.filter(x => x.type === 'posts'))
    );
  }, []);
  useEffect(() => {
    if(window !== undefined){
      if (user) {
        if (postId) {
          if (editor) {
            const init = async () => {
              await initializeEditor(user?.accessToken, editor);
            };
            if (isMounted) {
              init();
            }
          }
        } else {
          //create
          const init = async () => {
            await initializeEditor(user?.accessToken, undefined);
          };
          if (isMounted) {
            init();
  
            return () => {
              if (ref.current) {
                ref.current?.destroy();
              }
            };
          }
        }
      }
    }
  }, [isMounted, user, editor]);

  const save = () => {
    setLoading(true);
    if (title === undefined || title === "") {
      setTitleError("Vui lòng nhập tiêu đề!");
      setLoading(false);
      return;
    }

    // if (description === undefined || description === '') {
    //   setTitleError('Vui lòng nhập mô tả ngắn!');
    //   setLoading(false);
    //   return;
    // }

    if (category === undefined || category === '') {
      setTitleError('Vui lòng chọn danh mục!');
      setLoading(false);
      return;
    }

    if (ref.current) {
      ref.current.save().then((outputData) => {;
        if (outputData?.blocks.length === 0) {
          setEditorError("Vui lòng nhập nội dung!");
          setLoading(false);
          return;
        }
        const cat = categories.find((item) => item.categoryId === category);
        let categoryParent;
        if (cat?.categoryParentId) {
          //menu 2 level
          categoryParent = cat?.categoryParentId;
        } else {
          //menu 1 level
          categoryParent = cat?.categoryId;
        }

        //post data
        let item = {
          body: outputData,
          title,
          // description,
          category,
          categoryParent,
          isLongform,
          postId,
          label: label != "" && label?.length > 0 ? labelList?.find(item => item.labelId === label) : {}
        };

        if (tags?.length > 0) {
          item.tags = tags;
        }

        if (postId) {
          // update
          updatePostByUser(item, user?.accessToken)
            .then((result) => {
              message.success(result.message);
              router.push(`/forum/topic/${categoryParent}/${category}`);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
        } else {
          // create
          createPostByUser(item, user?.accessToken)
            .then((result) => {
              message.success(result.message);
              //ranking
              createUserRanking(
                {
                  rankingType: 'post_creat',
                  rankingValue: 1,
                  rankingDocId: result?.postId,
                },
                user?.accessToken
              ).then(() => {
                 router.push(`/forum/topic/${categoryParent}/${category}`);
                setLoading(false);
              });
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
        }
      });
    }
  };
  // useEffect(() => {
  //    document
  //      .querySelectorAll(".image-gallery__image-picture")
  //      .forEach(function (item) {
  //        item.setAttribute("src", item.src.replace("amp;", ""));
  //      });
  // });
  return (
    <main className="w-full">
      <Header isBack={true} />
      <div className="w-full px-4 py-6" style={{ marginTop: 1 }}>
        <h2 className="text-[#c80000] font-bold text-center mb-2">
          Đăng bài viết vào Forum
        </h2>

        <div class="mb-6">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tiêu đề bài viết
          </label>
          <input
            type="text"
            id="default-input"
            class={
              title === ""
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value === "") {
                setTitleError("Vui lòng nhập tiêu đề!");
              } else {
                setTitleError("");
              }
            }}
            value={title}
          />
          {titleError !== "" && (
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {titleError}
            </p>
          )}
        </div>
        {/* <div class="mb-6 w-full">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mô tả ngắn
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
            placeholder=""
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value === "") {
                setDescriptionError("Vui lòng nhập mô tả chi tiết!");
              } else {
                setDescriptionError("");
              }
            }}
            value={description}
          />
          {descriptionError !== "" && (
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {descriptionError}
            </p>
          )}
        </div> */}
        <div class="mb-6 w-full">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Chủ đề
          </label>
          <select
            id="label"
            name="label"
            className={
              "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            }
            defaultValue={label}
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
          >
            <option key={""} value={""}>
              {"--Chọn chủ đề--"}
            </option>
            {labelList
              .map((item, index) => {
              return  <option key={index} value={item?.labelId}>
                            {item?.name}
                </option>
              })}
          </select>
        </div>

        <div class="mb-6 w-full">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Đăng vào
          </label>
          <select
            id="location"
            name="location"
            className={
              category === ""
                ? "mt-1 block w-full pl-3 pr-10 py-2 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            }
            defaultValue={category}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (e.target.value === "") {
                setCategoryError("Vui lòng chọn danh mục!");
              } else {
                setCategoryError("");
              }
            }}
          >
            <option key={""} value={""}>
              {"--Chọn danh mục--"}
            </option>
            {categories
              .filter((x) => x.categoryParentId === "")
              .map((item) => {
                return (
                  <optgroup key={item.categoryId} label={item.name}>
                    {categories
                      .filter((y) => y.categoryParentId === item.categoryId)
                      .map((sub) => {
                        return (
                          <option key={sub.categoryId} value={sub.categoryId}>
                            {sub.name}
                          </option>
                        );
                      })}
                  </optgroup>
                );
              })}
          </select>
          {categoryError !== "" && (
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {categoryError}
            </p>
          )}
        </div>

        <div
          style={{
            marginBottom: 16,
          }}
        >
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags
          </label>

          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: "from",
              duration: 100,
            }}
            onEnd={(e) => {
              if (e.type === "appear" || e.type === "enter") {
                e.target.style = "display: inline-block";
              }
            }}
            leave={{
              opacity: 0,
              width: 0,
              scale: 0,
              duration: 200,
            }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{
              width: "50%",
              borderRadius: 10,
            }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag onClick={showInput} style={tagPlusStyle}>
            <PlusOutlined /> New Tag
          </Tag>
        )}

        <div className="flex justify-between mt-8">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nội dung
          </label>
          <div class="flex items-center mr-2 mb-2">
            <input
              onChange={(e) => setIsLongform(e.target.checked)}
              checked={isLongform}
              id="checked-checkbox"
              type="checkbox"
              value={isLongform}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              for="checked-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tạo mục lục
            </label>
          </div>
        </div>

        <div
          id="editorjs-container"
          className="bg-gray-50 border border-gray-300 rounded-lg text-base fomt-nornal"
        />
        {editorError !== "" && (
          <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
            {editorError}
          </p>
        )}
        <div className="w-full mt-6">
          {loading ? (
            <button
              disabled
              type="button"
              className="text-white w-full bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Đang đăng...
            </button>
          ) : (
            <button
              onClick={save}
              type="button"
              class="text-white w-full bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Đăng tin
            </button>
          )}
          {/* <button onClick={save} type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Đã lưu</button> */}
        </div>
      </div>
      <div className="mb-24"></div>
      <TabbarBottom active='forum' />
      <BannerRight isAppInstall={true} />
    </main>
  );
};

export default PostWritePage;
