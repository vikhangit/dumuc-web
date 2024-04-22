"use client";
import React, { useState } from "react";
import Scroll from "react-scroll";
import slugify from "slugify";

const TableOfContent = ({ headers, onShowScroll }) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    headers?.length !== 0 && (
      <div id="tab-content">
        <div className="mt-4 font-semibold text-sm">
          {" "}
          Nội dung [
          {isHidden == false ? (
            <a onClick={() => setIsHidden(true)}>Ẩn</a>
          ) : (
            <a onClick={() => setIsHidden(false)}>Hiện</a>
          )}
          ]
        </div>
        {isHidden == false && (
          <div className="border border-dashed border-black border-opacity-60 p-4 mt-2 mb-4 mx-8">
            <div>
              {headers?.map((item, index) => {
                const slug = slugify(item.data?.text);
                if (item.data?.level === 2) {
                  return (
                    <div key={index}>
                      <Scroll.Link
                        className="text-sm text-slate-900 font-medium mb-1 cursor-pointer hover:underline"
                        to={`${slug}_${item.data?.level}`}
                        spy={true}
                        smooth={true}
                        offset={-90}
                        onClick={onShowScroll}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: item.data?.text }}
                        />
                      </Scroll.Link>
                    </div>
                  );
                } else if (item.data?.level === 3) {
                  return (
                    <div key={index}>
                      <Scroll.Link
                        className="flex item-center text-sm text-slate-900 ml-4 mb-1"
                        to={`${slug}_${item.data?.level}`}
                        spy={true}
                        smooth={true}
                        offset={-90}
                      >
                        <svg
                          class="w-3 h-3 mr-1 mt-1 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 8 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                          />
                        </svg>{" "}
                        <div
                          dangerouslySetInnerHTML={{ __html: item.data?.text }}
                        />
                      </Scroll.Link>
                    </div>
                  );
                }
              })}
              <Scroll.Link
                className="text-sm text-slate-900 font-medium mb-1"
                to="comments"
                spy={true}
                smooth={true}
                offset={-90}
              >
                Bình luận
              </Scroll.Link>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default TableOfContent;
