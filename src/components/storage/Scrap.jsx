import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Posts from "./Posts";
import Detail from "./Detail";
import ScrapKeywordList from "./ScrapKeywordList";
import ScrapDateList from "./ScrapDateList";
import axios from "axios";
import KeywordPosts from "./KeywordPosts";
import Swal from "sweetalert2";
import KeywordDetail from "./KeywordDetail";
import Search from "../search/Search";
import CollectionImage from "./tab/CollectionImage";
import CollectionText from "./tab/CollectionText";

export default function Scrap({
  handleDragStart,
  searchContents,
  setSearchContents,
  searchResultArray,
  searchRef,
  showKeywords,
  setShowKeywords,
  setSearchShowList,
}) {
  const DATE = "DATE";
  const KEYWORD = "KEYWORD";
  const TEXT = "TEXT";
  const IMAGE = "IMAGE";
  const [scrapData, setScrapData] = useState(null);
  const [originalScrapData, setOriginalScrapData] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState({});
  const [currentTitle, setCurrentTitle] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [keywordData, setKeywordData] = useState(null);

  useEffect(() => {
    if (cookies.accessToken) {
      const fetchDataStorage = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_ADDR}/api/checkStorage`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
              },
            }
          );
          setScrapData(response.data.dataToSend);
          setOriginalScrapData(response.data.dataToSend);
        } catch (error) {
          console.error(`HTTP error! status: ${error}`);
        }
        setIsLoading(false);
      };

      const fetchDataKeywords = async () => {
        try {
          setIsLoading(true);
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_ADDR}/api/checkKeyword`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
              },
            }
          );

          setKeywordData(response.data.dataToSend);
        } catch (error) {
          console.error(`HTTP error! status: ${error}`);
        }
        setIsLoading(false);
      };

      fetchDataStorage();
      fetchDataKeywords();
    }
  }, [cookies.accessToken]);

  const handleDeleteKeywordResponse = (data) => {
    if (data.message === "error") {
      alert("키워드 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };
  const handleDeleteUserScrapResponse = (data) => {
    if (data.message === "error") {
      alert("스크랩 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const deleteKeyword = (keyword, userToken, date) => {
    Swal.fire({
      title: "검색어를 삭제하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedScrapData = scrapData.filter((item) => item.keyword !== keyword);

        setScrapData(updatedScrapData);

        axios
          .delete(`${process.env.REACT_APP_SERVER_ADDR}/api/deleteKeyWord`, {
            data: {
              keyWord: keyword,
              userToken,
              date,
            },
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            const data = response.data;

            if (data.message !== "success") {
              handleDeleteKeywordResponse(data);
            }
          })
          .catch((error) => {
            console.error(`HTTP error! status: ${error}`);
          });

        Swal.fire({
          icon: "success",
          title: "삭제 완료!",
          text: "삭제되었습니다.",
        });
      }
    });
  };

  const deleteTitle = (title, userToken, date, url) => {
    Swal.fire({
      title: "스크랩을 삭제하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedScrapData = scrapData.map((item) => {
          if (item.keywords.titles.includes(title)) {
            item.keywords.urls = item.keywords.urls.filter((urlItem) => urlItem !== url);
            item.keywords.titles = item.keywords.titles.filter((titleItem) => titleItem !== title);
          }
          return item;
        });

        const filteredScrapData = updatedScrapData.filter((item) => item.keywords.titles.length > 0);
        setScrapData(filteredScrapData);
        if (cookies.accessToken) {
          axios
            .delete(`${process.env.REACT_APP_SERVER_ADDR}/api/deleteTitle`, {
              data: {
                title,
                userToken,
                date,
                url,
              },
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            })
            .then((response) => {
              const data = response.data;

              if (data.message !== "success") {
                handleDeleteUserScrapResponse(data);
              }
            })
            .catch((error) => {
              console.error(`HTTP error! status: ${error}`);
            });
        }
        Swal.fire({
          icon: "success",
          title: "삭제 완료!",
          text: "삭제되었습니다.",
        });
      }
    });
  };

  const handleShowKeywordsClick = (key) => {
    setSearchContents(false);
    if (key === DATE) {
      setSelectedKeyword(null);
      setCurrentKeyword({});
      setScrapData(originalScrapData);
      setSearchShowList(key);
    } else if (key === KEYWORD) {
      setCurrentDate(null);
      setCurrentTitle(null);
      setScrapData(keywordData);
      setSearchShowList(key);
    }
    setShowKeywords(key);
  };
  const handleTitleClick = (title) => {
    setSearchContents(false);
    if (title === currentTitle) {
      setCurrentTitle(null);
      setCurrentDate(null);
    } else {
      setCurrentTitle(title);
    }
  };
  const handleToggleDateClick = (date) => {
    setSearchContents(false);
    if (currentDate === date) {
      setCurrentDate(null);
      setCurrentTitle(null);
    } else {
      setCurrentDate(date);
      setCurrentTitle(null);
    }
  };

  const handleToggleKeywordClick = (keyword) => {
    setSearchContents(false);
    if (currentKeyword[keyword]) {
      setCurrentKeyword((prevState) => ({
        ...prevState,
        [keyword]: false,
      }));
      setSelectedKeyword(null);
    } else {
      setCurrentKeyword((prevState) => ({
        ...prevState,
        [keyword]: true,
      }));
      setSelectedKeyword(keyword);
    }
    setCurrentTitle(null);
    setCurrentDate(null);
  };

  return (
    <div className="h-[93vh] flex ">
      <div
        className="fixed 
      left-0
      top-[65%]"
      >
        <div className="flex -rotate-90 origin-top-left border-2 border rounded-b-lg ">
          <button
            onClick={() => {
              handleShowKeywordsClick(IMAGE);
            }}
            className={`px-2 py-1 rounded-es-md w-16 ${showKeywords === IMAGE ? "bg-green-300" : ""}`}
          >
            이미지
          </button>
          <button
            onClick={() => {
              handleShowKeywordsClick(TEXT);
            }}
            className={`px-2 py-1 w-16 border-x-2 border ${showKeywords === TEXT ? "bg-yellow-300" : ""}`}
          >
            텍스트
          </button>
          <button
            onClick={() => {
              handleShowKeywordsClick(KEYWORD);
            }}
            className={`px-2 py-1 w-16 border-r-2 border ${showKeywords === KEYWORD ? "bg-red-300" : ""}`}
          >
            검색어
          </button>
          <button
            onClick={() => {
              handleShowKeywordsClick(DATE);
            }}
            className={`px-2 py-1 rounded-ee-md w-16 ${showKeywords === DATE ? "bg-blue-300" : ""}`}
          >
            날짜
          </button>
        </div>
      </div>
      {showKeywords === TEXT ? (
        <CollectionText handleDragStart={handleDragStart} />
      ) : showKeywords === IMAGE ? (
        <CollectionImage handleDragStart={handleDragStart} />
      ) : (
        <>
          <div className="px-4 w-[30%] border-r-2 border-gray-400 overflow-auto pb-5">
            {isLoading ? (
              <div className="text-3xl font-bold pt-10 text-center">로딩중</div>
            ) : scrapData === undefined ? (
              <div className="text-2xl font-bold pt-10 text-center"> 스크랩한 데이터가 없어요 </div>
            ) : showKeywords === KEYWORD ? (
              scrapData &&
              scrapData.map((item, index) => (
                <ScrapKeywordList
                  key={index}
                  item={item}
                  handleToggleKeywordClick={handleToggleKeywordClick}
                  deleteKeyword={deleteKeyword}
                  cookies={cookies}
                  currentKeyword={currentKeyword}
                  handleTitleClick={handleTitleClick}
                  deleteTitle={deleteTitle}
                  showKeywords={showKeywords}
                />
              ))
            ) : (
              scrapData &&
              scrapData.map((item, index) => (
                <ScrapDateList
                  key={index}
                  item={item}
                  index={index}
                  scrapData={scrapData}
                  handleToggleDateClick={handleToggleDateClick}
                  handleTitleClick={handleTitleClick}
                  cookies={cookies}
                  deleteTitle={deleteTitle}
                />
              ))
            )}
          </div>
          {scrapData && (searchContents || currentTitle || currentDate || selectedKeyword) && (
            <div className="flex-1 overflow-auto">
              {searchContents ? (
                <Search searchResultArray={searchResultArray} handleDragStart={handleDragStart} searchRef={searchRef} />
              ) : showKeywords === DATE && currentTitle && !selectedKeyword ? (
                <Detail title={currentTitle} userScrapData={scrapData} handleDragStart={handleDragStart} />
              ) : showKeywords === DATE && currentDate && !selectedKeyword ? (
                <Posts date={currentDate} userScrapData={scrapData} handleDragStart={handleDragStart} />
              ) : showKeywords === KEYWORD && currentTitle ? (
                <KeywordDetail title={currentTitle} userScrapData={scrapData} handleDragStart={handleDragStart} />
              ) : showKeywords === KEYWORD && !currentTitle && selectedKeyword ? (
                <KeywordPosts keyword={selectedKeyword} userScrapData={scrapData} handleDragStart={handleDragStart} />
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
}
