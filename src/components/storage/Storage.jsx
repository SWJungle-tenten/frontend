import React, { useEffect, useState } from "react";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  }, [cookies.accessToken]);

  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });

      go("/");
    }
  });

  return (
    <div className="flex">
      <div className="flex-grow">
        {!isLoading && userScrapData && (
          <Scrap userScrapData={userScrapData} userName={userName} />
        )}
      </div>
    </div>
  );
}
