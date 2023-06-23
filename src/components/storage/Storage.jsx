import React, { useEffect, useState } from "react";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../intro/Header";
import Memo from "../../memo/Memo";
// import { useNavigate } from "react-router-dom";
import MemoList from "../../memo/MemoList";

export default function Storage() {
  const [userScrapData, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  // const go = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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

        setData(response.data.dataToSend);
        setUserName(response.data.username);
        setIsLoading(false);
      } catch (error) {
        console.error(`HTTP error! status: ${error}`);
      }
    };

    fetchData();
  }, []);

  const [selectedMemo, setSelectedMemo] = useState(null);
  const [openList, setOpenList] = useState(true);
  // const openHandle = () =>{
  //   setOpen(!open);
  // }
  const [memoArray, setMemoArray] = useState([]);
  const receiveMemo = async()=> {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/allMemoTitle`,
        {
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setMemoArray(res.data.memoTitles);
        // console.log(selectedMemo);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    //memo API
    useEffect(() => {    
      receiveMemo();  
    }, []);
  // userToken, memoTitle, memoContents
  return (
    <>
      <Header />
      <div className="flex ">
        <div className="flex-grow w-[70%]">
          {!isLoading && userScrapData && (
            <Scrap userScrapData={userScrapData} userName={userName} />
          )}
        </div>
        <div className="w-[30%] border overflow-auto">
          <div className="flex-col h-[93vh] border-gray-300 shadow-lg overflow-auto">
            {/* <Memo contents='<h1>asas</h1><h5>dfsdfs</h5>'/> */}
            {openList ? (
              <MemoList
                memoArray={memoArray}
                open={setOpenList}
                setSelectedMemo={setSelectedMemo}
              />
              ) : (<>
              <Memo selectedMemo={selectedMemo} open={setOpenList} receiveMemo={receiveMemo} memoArray={memoArray}/>
              </>
            )}

            {/* <Memo /> */}
          </div>
          {/* <button
            onClick={() => {
              go("/main");
            }}
          >
            메인으로 이동
          </button>
          <button
            onClick={receiveMemo}
          >
            메모장 보기
          </button> */}
        </div>
      </div>
    </>
  );
}
