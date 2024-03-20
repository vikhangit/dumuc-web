"use client"
import React, { useState, useRef } from 'react'
import axios from 'axios';

import { Row, Col, Input, Button, AutoComplete, Select, Modal} from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { Spinner } from 'flowbite-react';
import Image from 'next/image';

const SearchForm = () => {
  const categories = [
    {
      value: 'Feed',
      keywords: 'feed',
    },
    {
      value: 'Forum',
      keywords: 'forum',
    },
    {
      value: 'SOS',
      keywords: 'sos',
    },
  ]

  const [keyword, setKeyword] = useState()
  const [category, setCategory] = useState()
  const [focusSearch, setFocusSearch] = useState(false)
  const [loadingRemove, setLoadingRemove] = useState(false)

  const typingTimeoutRef = useRef(null)
  const [options, setOptions] = useState([]);

  const [showSearchMobile, setShowSearchMobile] = useState(false)

  const convertViToEn = (str, toUpperCase = false) => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    return toUpperCase ? str.toUpperCase() : str;
  }

  const removeHTML = (str) => { 
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }

  const onSearchSuggestion = (searchText) => {
    setKeyword(searchText);
    //debounce
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      axios(`https://us-central1-appfunnel-361810.cloudfunctions.net/api/vieclamphothong/suggestion/${convertViToEn(searchText)}`, {
        method: 'GET',
      })
      .then(response => {
        setOptions(
          !searchText ? [] : response.data.map(item => {
            return {
              value: removeHTML(item),
              label: <div dangerouslySetInnerHTML={{ __html: item }}></div>
            }
          }),
        );
      })
      .catch(error => {
      });
    }, 300)
  };

  const onSelect = (data) => {
    setKeyword(data)
  };
  const submitSearch = (keyword, category) => {
    let url = `/search?`
    let isPrefix = false
    let recentSearch = JSON.parse(localStorage.getItem("RecentSearch")) || [];
    if (keyword) {
      url  = `${url}${isPrefix === false ? '': '&'}q=${keyword}`
      isPrefix = true
    }

    if (category) {
      url  = `${url}${isPrefix === false ? '': '&'}category=${category}`
      isPrefix = true
    }
    if(recentSearch && recentSearch.length > 0){
      const findIndex = recentSearch.findIndex(x => x === keyword)
      if(findIndex < 0){
        recentSearch.push(
          keyword
        )
      }
    }else{
      recentSearch.push(
        keyword
      )
    }
    localStorage.setItem("RecentSearch", JSON.stringify(recentSearch))
    window.location = url
  }

  const removeRecentSearch = () => {
    setLoadingRemove(true)
  localStorage.removeItem("RecentSearch")
  setTimeout(() => {
    setLoadingRemove(false);
  }, 2000);
  }

  const RenderRecentSearch = () => {
    let recentSearch = JSON.parse(localStorage.getItem("RecentSearch")) || []
    return <div className="absolute flex flex-col top-[calc(100%+5px)] left-0 w-full bg-white shadow shadow-gray-300 rounded-lg p-1">
      <button className='px-1 md:px-3 py-2 flex justify-between hover:bg-gray-200 rounded-lg font-semibold'>
        <div className="flex gap-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
Tìm kiếm gần đây</div>
<span className="text-indigo-600 hover:underline" onClick={removeRecentSearch}>{loadingRemove ? <Spinner /> : "Xóa" }</span>
      </button>
      {recentSearch.map((item, index) => <button key={index} className='px-3 py-2 text-left hover:bg-gray-200 rounded-lg font-semibold' onClick={() => submitSearch(item, category)}>{item}</button>)}
    </div>
  }


  return (
      <>
      <div onClick={() => setShowSearchMobile(true)} className="text-gray-500 md:hidden flex hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

      </div>
    <div class={`${
                    showSearchMobile
                      ? "absolute top-0 w-full h-full z-50 left-0 bg-white shadow-sm md:relative block flex items-center px-4"
                      : "relative hidden md:block"
                  }`}  id="search-bar">
      <div className='gap-2 flex items-center w-full'>
        {
          showSearchMobile &&
      <button
      className="md:hidden hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5"
                      onClick={() => setShowSearchMobile(!showSearchMobile)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                      </svg>

                      <span class="sr-only">back icon</span>
                    </button>
        }
      <div className="flex gap-x-2 w-full" >
      <div className="relative w-full h-full">
        <AutoComplete
            value={keyword}
            options={options}
            style={{
              width: '100%',
              height: '100%'
            }}
            onSelect={(data) => submitSearch(data, category)}
            onSearch={onSearchSuggestion}
            onFocus={() => setFocusSearch(true)}
          >
            <Input 
              prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            } 
              size={'large'}
              placeholder="Từ khoá"
              className="border-gray-400 border"
            />
        </AutoComplete>
            {
              focusSearch && !keyword && JSON.parse(localStorage.getItem("RecentSearch")) && <RenderRecentSearch />
            }
      </div>
      <div
          type="primary" 
          size={'large'} 
          block
          className='h-full bg-[#c80000] text-white px-4 rounded-lg block py-3'
          onClick={()=> submitSearch(keyword, category)}
        >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

      </div>
      </div>
      </div>
   
    </div>
      </>
  )
};

export default SearchForm;
