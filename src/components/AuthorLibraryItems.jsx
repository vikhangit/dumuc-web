import React from "react";
import Author from "./Author";

const AuthorLibraryItems = ({ items, tiltle }) => {
  return (
    <div>
      {tiltle && (
        <h3 class="mb-2 text-base font-bold text-gray-900 flex">
          <svg
            class="w-5 h-5 text-gray-800 mr-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"
            />
          </svg>
          {tiltle}
        </h3>
      )}

      {items?.map((item, index) => {
        return (
          <div key={index} className="py-4">
            <Author author={item} />
          </div>
        );
      })}
    </div>
  );
};

export default AuthorLibraryItems;
