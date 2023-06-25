import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Posts from "./Posts";
import Detail from "./Detail";
import ScrapKeywordList from "./ScrapKeywordList";
import ScrapDateList from "./ScrapDateList";
import axios from "axios";
import KeywordPosts from "./KeywordPosts";
import Swal from "sweetalert2";

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

  useEffect(() => {
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
        console.log("response", response.data.dataToSend);
        setScrapData(response.data.dataToSend);
        setOriginalScrapData(response.data.dataToSend); 
        setUserName(response.data.username);
      } catch (error) {
        console.error(`HTTP error! status: ${error}`);
      }
      setIsLoading(false);
    };

    fetchDataStorage();
  }, []);

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
    Swal.fire({
      title: "검색어를 삭제하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        const updatedScrapData = scrapData.filter((item) => {
          return item.keywords.keyword !== keyWord;
        });

        setScrapData(updatedScrapData);

        axios
          .delete(`${process.env.REACT_APP_SERVER_ADDR}/api/deleteKeyWord`, {
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

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
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
          .delete(`${process.env.REACT_APP_SERVER_ADDR}/api/deleteUserScrap`, {
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

        Swal.fire({
          icon: "success",
          title: "삭제 완료!",
          text: "삭제되었습니다.",
        });
      }
    });
  };
  const fetchDataKeywords = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/checkKeyword`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );

      setScrapData(response.data.dataToSend); 
      console.log("response.data.dataToSend", response.data.dataToSend);
    } catch (error) {
      console.error(`HTTP error! status: ${error}`);
    }
  };

  const handleShowKeywordsClick = async () => {
    if (showKeywords) {
      setScrapData(originalScrapData); // 버튼을 다시 누르면 원래 데이터를 사용
    } else {
      await fetchDataKeywords(); // 버튼을 누르면 새로운 데이터를 받아옴
    }
    setShowKeywords(!showKeywords);
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
    <div className="h-[93vh] flex overflow-auto ">
      <div className="px-4 w-[30%] border-r-2 border-y-2 rounded-tr-xl rounded-br-xl border-gray-400 bg-gray-50 overflow-auto">
        {/* <div className="z-20 flex-col items-center flex-shrink-0 hidden w-16 py-4 bg-white border-r-2 border-indigo-100 shadow-md sm:flex rounded-tr-3xl rounded-br-3xl"/> */}

        <div className="pt-3 flex justify-between items-center">
          <div className="text-5xl font-bold">{userName}</div>
          <div>
            {isLoading ? null : (
              <button
                className="w-full duration-200 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5"
                onClick={handleShowKeywordsClick}
              >
                {showKeywords ? "날짜별로 보기" : "검색어별로 보기"}
              </button>
            )}
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
      {scrapData && (currentPath || currentDate || selectedKeyword) && (
        <div className="flex-1 overflow-auto">
          {currentTitle ? (
            <Detail
              title={currentTitle}
              userScrapData={scrapData}
              handleDragStart={handleDragStart}
              setDraggedElementContent={setDraggedElementContent}
            />
          ) : selectedKeyword ? (
            <KeywordPosts
              keyword={selectedKeyword}
              userScrapData={scrapData}
              handleDragStart={handleDragStart}
              setDraggedElementContent={setDraggedElementContent}
            />
          ) : (
            <Posts
              date={currentDate}
              userScrapData={scrapData}
              handleDragStart={handleDragStart}
              setDraggedElementContent={setDraggedElementContent}
            />
          )}
        </div>
      )}
    </div>
  );
}
