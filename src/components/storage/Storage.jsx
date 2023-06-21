import React, { useEffect, useState } from "react";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../intro/Header";

export default function Storage() {
  const [userScrapData, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/keyWordByDate",
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
        <div className="flex-grow">
          {console.log(isLoading)}
          {console.log(userScrapData)}
          {!isLoading && userScrapData && (
            <Scrap userScrapData={userScrapData} userName={userName} />
          )}
        </div>
      </div>
    </>
  );
}
