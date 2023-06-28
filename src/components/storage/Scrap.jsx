import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Posts from "./Posts";
import Detail from "./Detail";
import ScrapKeywordList from "./ScrapKeywordList";
import ScrapDateList from "./ScrapDateList";
import axios from "axios";
import KeywordPosts from "./KeywordPosts";
import Swal from "sweetalert2";
import { yellow } from "@mui/material/colors";
import KeywordDetail from "./KeywordDetail";

export default function Scrap({ handleDragStart, setDraggedElementContent }) {
  const [scrapData, setScrapData] = useState(null);
  const [originalScrapData, setOriginalScrapData] = useState(null);
  const [currentPath, setCurrentPath] = useState(true);
  const [currentKeyword, setCurrentKeyword] = useState({});
  const [currentTitle, setCurrentTitle] = useState(null);
  const [showKeywords, setShowKeywords] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [userName, setUserName] = useState(null);
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
          setUserName(response.data.username);
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
  }, []);

  const handleDeleteKeywordResponse = (data) => {
    if (data.message === "success") {
      const deletedKeyword = data.keyword;

      const updatedScrapData = scrapData.filter((item) => {
        if (item.keywords.keyword === deletedKeyword) {
          item.keywords.titles = item.keywords.titles.filter(
            (title) => title !== deletedKeyword
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
        if (item.keywords.titles.includes(deletedTitle)) {
          item.keywords.titles = item.keywords.titles.filter(
            (titleItem) => titleItem !== deletedTitle
          );
        }
        return item;
      });

      const filteredScrapData = updatedScrapData.filter(
        (item) => item.keywords.titles.length > 0
      );

      setScrapData(filteredScrapData);
    } else if (data.message === "error") {
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
        const updatedScrapData = scrapData.filter(
          (item) => item.keyword !== keyword
        );

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
            item.keywords.titles = item.keywords.titles.filter(
              (titleItem) => titleItem !== title
            );
          }
          return item;
        });

        const filteredScrapData = updatedScrapData.filter(
          (item) => item.keywords.titles.length > 0
        );

        setScrapData(filteredScrapData);

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

        Swal.fire({
          icon: "success",
          title: "삭제 완료!",
          text: "삭제되었습니다.",
        });
      }
    });
  };

  const handleShowKeywordsClick = () => {
    if (showKeywords) {
      setSelectedKeyword(null);
      setCurrentKeyword({});
      setScrapData(originalScrapData);
    } else {
      setCurrentDate(null);
      setCurrentTitle(null);
      setScrapData(keywordData);
    }
    setShowKeywords(!showKeywords);
  };
  const handleTitleClick = (title) => {
    if (title === currentTitle) {
      setCurrentTitle(null);
      setCurrentDate(null);
    } else {
      setCurrentTitle(title);
    }
  };
  const handleToggleDateClick = (date) => {
    if (currentDate === date) {
      setCurrentDate(null);
      setCurrentTitle(null);
    } else {
      setCurrentDate(date);
      setCurrentTitle(null);
    }
  };

  const handleToggleKeywordClick = (keyword) => {
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
      <div className="px-4 w-[30%] border-r-2 border-gray-400 overflow-auto pb-5">
        <div className="pt-3 flex justify-between items-center">
          <div className="pl-3">
            <span className="text-xl font-semibold">{userName}</span>님
          </div>
          <div>
            {isLoading ? null : (
              <button
                className={`btn-${showKeywords ? "yellow" : "red"} px-5 py-2.5`}
                onClick={handleShowKeywordsClick}
              >
                {showKeywords ? "날짜별로 보기" : "검색어별로 보기"}
              </button>
            )}
          </div>
        </div>
        {showKeywords
          ? scrapData &&
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
          : scrapData &&
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
            ))}
      </div>
      {scrapData && (currentTitle || currentDate || selectedKeyword) && (
        <div className="flex-1 overflow-auto">
          {!showKeywords && currentTitle && !selectedKeyword ? (
            <Detail
              title={currentTitle}
              userScrapData={scrapData}
              handleDragStart={handleDragStart}
            />
          ) : !showKeywords && currentDate && !selectedKeyword ? (
            <Posts
              date={currentDate}
              userScrapData={scrapData}
              handleDragStart={handleDragStart}
            />
          ) : showKeywords && currentTitle ? (
            <KeywordDetail
              title={currentTitle}
              userScrapData={scrapData}
              handleDragStart={handleDragStart}
            />
          ) : showKeywords && !currentTitle && selectedKeyword ? (
            <KeywordPosts
              keyword={selectedKeyword}
              userScrapData={scrapData}
              handleDragStart={handleDragStart}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
