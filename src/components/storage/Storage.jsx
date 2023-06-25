import React, { useEffect, useState } from "react";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../intro/Header";
import Memo from "../../memo/Memo";
import MemoList from "../../memo/MemoList";

export default function Storage() {
  const [cookies] = useCookies(["accessToken"]);

  const [selectedMemo, setSelectedMemo] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState();
  const [openList, setOpenList] = useState(true);
  const [memoArray, setMemoArray] = useState([]);
  const receiveMemo = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/allMemoTitle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setMemoArray(res.data.memoData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //memo API
  useEffect(() => {
    receiveMemo();
  }, []);

  const [draggedElementContent, setDraggedElementContent] = useState("");

  const handleDragStart = (event) => {
    setDraggedElementContent(event.target.outerHTML); // 드래그한 요소의 내용을 저장
    console.log(event.target.outerHTML);
  };

  return (
    <>
      <Header />
      <div className="flex ">
        <div className="flex-grow w-[70%]">
          {(
            <Scrap
              handleDragStart={handleDragStart}
              setDraggedElementContent={setDraggedElementContent}
            />
          )}
        </div>
        <div className="w-[30%] border overflow-auto viewsize">
        <div className="flex p-4 pb-0 space-x-2">
            <button
              className=" duration-200 text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-1.5"
              onClick={() => {
                document.querySelector(".viewsize").style.width = "70%";
              }}
            >
              50%
            </button>
            <button
              className="duration-200 text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-1.5"
              onClick={() => {
                document.querySelector(".viewsize").style.width = "30%";
              }}
            >
              30%
            </button>
          </div>
          <div className="flex-col border-gray-300 overflow-auto">
            {openList ? (
              <MemoList
                memoArray={memoArray}
                open={setOpenList}
                setSelectedMemo={setSelectedMemo}
                setSelectedTitle={setSelectedTitle}
              />
            ) : (
              <>
                <Memo
                  open={setOpenList}
                  receiveMemo={receiveMemo}
                  draggedElementContent={draggedElementContent}
                  selectedMemo={selectedMemo}
                  selectedTitle={selectedTitle}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
