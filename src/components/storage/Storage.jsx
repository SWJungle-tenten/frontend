import React, { useEffect, useState } from "react";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../intro/Header";
import Memo from "../../memo/Memo";
import { useNavigate } from "react-router-dom";

export default function Storage() {
  const [userScrapData, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const go = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/checkStorage",
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



  return (
    <>
      <Header/>
      <div className="flex">
        <div className="flex-grow w-[70%]">
          {!isLoading && userScrapData && (
            <Scrap userScrapData={userScrapData} userName={userName} />
          )}
        </div>
        <div className="w-[30%] border overflow-auto">
          <div className="flex-col border-gray-300 shadow-lg overflow-auto">
            <div>
              Title
            </div>
            <Memo />
          </div>
          <button
            onClick={() => {
              go("/main");
            }}
          >
            dasdsadas
          </button>
        </div>
      </div>
    </>
  );
}
