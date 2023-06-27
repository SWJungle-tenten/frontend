import React, { useEffect, useState } from "react";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../intro/Header";
import Memo from "../../memo/Memo";
import MemoList from "../../memo/MemoList";

import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";

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
        setMemoArray(res.data.memoData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //memo API
  useEffect(() => {
    if (cookies.accessToken) {
      receiveMemo();
    }
  }, []);

  const [draggedElementContent, setDraggedElementContent] = useState("");

  const handleDragStart = (event) => {
    setDraggedElementContent(event.target.outerHTML); // 드래그한 요소의 내용을 저장
    // console.log(event.target.outerHTML);
  };

  const handleNewMemo = () => {
    setSelectedTitle("");
    setSelectedMemo("");
    setOpenList();
  };

  return (
    <>
      <Header />
      <div className="flex">
        <div className="flex-grow w-[70%]">
          {
            <Scrap
              handleDragStart={handleDragStart}
              setDraggedElementContent={setDraggedElementContent}
            />
          }
        </div>
        <div className="w-[30%] border-l overflow-auto viewsize relative">
          <div className="flex p-4 pb-0 space-x-2 absolute bottom-3 flex-row w-full justify-between">
            <div className="flex flex-row">
              <button
                className="btn-yellow px-1.5 mr-2"
                onClick={() => {
                  document.querySelector(".viewsize").style.width = "70%";
                }}
              >
                <ZoomOutMapIcon />
              </button>
              <button
                className="btn-green px-1.5"
                onClick={() => {
                  document.querySelector(".viewsize").style.width = "30%";
                }}
              >
                <ZoomInMapIcon />
              </button>
            </div>
            <button className="btn-blue w-fit" onClick={handleNewMemo}>
              새 메모 만들기
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
