import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Posts from "./Posts";
import Detail from "./Detail";
import ScrapKeywordList from "./ScrapKeywordList";
import ScrapDateList from "./ScrapDateList";
import axios from "axios";
import KeywordPosts from './KeywordPosts';


export default function Scrap({ userName, userScrapData }) {
  const [scrapData, setScrapData] = useState(userScrapData);
  const [currentPath, setCurrentPath] = useState(true);
  const [currentKeyword, setCurrentKeyword] = useState({});
  const [currentTitle, setCurrentTitle] = useState(null);
  const [showKeywords, setShowKeywords] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [showDateDelete, setShowDateDelete] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null); 

  const handleDeleteKeywordResponse = (data) => {
    if (data.message === "success") {
      const deletedKeyword = data.keyword;

      const updatedScrapData = scrapData.filter((item) => {
        if (item.keywords.keyword === deletedKeyword) {
          item.keywords.titles = item.keywords.titles.filter(
            (title) => title.keyword !== deletedKeyword
          );
        }
        return item.keywords.titles.length > 0;
      });

      setScrapData(updatedScrapData);
    } else if (data.message === "error") {
      alert("키워드 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteUserScrapResponse = (data) => {
    if (data.message === "success") {
      const deletedTitle = data.title;

      const updatedScrapData = scrapData.map((item) => {
        if (item.keywords.titles.some((title) => title === deletedTitle)) {
          item.keywords.titles = item.keywords.titles.filter(
            (title) => title !== deletedTitle
          );
        }
        return item;
      });
      console.log("updatedScrapData", updatedScrapData);

      setScrapData(updatedScrapData);
    } else if (data.message === "error") {
      alert("스크랩 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const deleteKeyword = (keyWord, userToken, date) => {
    const updatedScrapData = scrapData.filter((item) => {
      return item.keywords.keyword !== keyWord;
    });

    setScrapData(updatedScrapData);

    axios
      .delete("http://localhost:8080/api/deleteKeyWord", {
        data: {
          keyWord,
          userToken,
          date,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        console.log("datakeyword", data);

        if (data.message !== "success") {
          handleDeleteKeywordResponse(data);
        }
      })
      .catch((error) => {
        console.error(`HTTP error! status: ${error}`);
      });
  };

  const deleteTitle = (title, userToken, date, url) => {
    const updatedScrapData = scrapData.map((item) => {
      if (item.keywords.titles.includes(title)) {
        item.keywords.titles = item.keywords.titles.filter(
          (titleItem) => titleItem !== title
        );
      }
      return item;
    });

    setScrapData(updatedScrapData);

    axios
      .delete("http://localhost:8080/api/deleteUserScrap", {
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
        console.log("datatitle", data);

        if (data.message !== "success") {
          handleDeleteUserScrapResponse(data);
        }
      })
      .catch((error) => {
        console.error(`HTTP error! status: ${error}`);
      });
  };

  const handleTitleClick = (title) => {
    if (title === currentTitle) {
      setCurrentTitle(null);
      setCurrentPath(null);
      setCurrentDate(null);
    } else {
      setCurrentPath(`/storage/${currentKeyword}/${title}`);
      setCurrentTitle(title);
    }
  };

  const handleToggleDateClick = (date) => {
    if (currentDate === date) {
      setCurrentDate(null);
      setCurrentKeyword(null);
      setCurrentTitle(null);
      setCurrentPath(null);
    } else {
      setCurrentDate(date);
    }
  };
  const handleToggleKeywordClick = (keyword) => {
    if (currentKeyword) {
      setCurrentKeyword({
        ...currentKeyword,
        [keyword]: !currentKeyword[keyword],
      });
      setSelectedKeyword(keyword);
    } else {
      setCurrentKeyword({
        [keyword]: true,
      });
      setSelectedKeyword(keyword);
    }
    setCurrentTitle(null);
  };

  return (
    <div className="h-screen flex overflow-auto ">
      <div className="px-4 w-2/5 border-2 border-gray-400 bg-gray-100 overflow-auto">
        <div className="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl"/>
        <div className="py-3 flex justify-between items-center">
          <div className="text-5xl font-bold">{userName}</div>
          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white"
              onClick={() => setShowKeywords(!showKeywords)}
            >
              {showKeywords ? "날짜별로 보기" : "검색어별로 보기"}
            </button>
          </div>
        </div>
        {showKeywords &&
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
          ))}
        {!showKeywords &&
          scrapData &&
          scrapData.map((item, index) => (
            <ScrapDateList
              item={item}
              index={index}
              scrapData={scrapData}
              handleToggleDateClick={handleToggleDateClick}
              setShowDateDelete={setShowDateDelete}
              showDateDelete={showDateDelete}
              handleTitleClick={handleTitleClick}
              cookies={cookies}
              deleteTitle={deleteTitle}
            />
          ))}
      </div>
      {scrapData && (currentPath || currentDate || selectedKeyword) && (
        <div className="flex-1 ">
          {currentTitle ? (
            <Detail title={currentTitle} userScrapData={scrapData} />
          ) : selectedKeyword ? (
            <KeywordPosts keyword={selectedKeyword} userScrapData={scrapData} />
          ) : (
            <Posts date={currentDate} userScrapData={scrapData} />
          )}
        </div>
      )}
    </div>
  );
}
