import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export default function Storage() {
  const [userScrapData, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState(null);
  const [groups, setGroups] = useState([]);
  const go = useNavigate();

  useEffect(() => {
    const socket = io("ws://localhost:8080");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("socket.id", socket.id);
      socket.emit("check storage request from client", {
        userToken: cookies.accessToken,
      });
      socket.on("check storage respond from server", (data) => {
        setData(data.dataToSend);
      });
      setIsLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });

      go("/");
    } else {
      const fetchUserNameAndGroups = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_ADDR}/api/giveUserName`,
            {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${cookies.accessToken}`
              }
            }
          );


          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setUserName(data.username);

          const responseGroups = await fetch(
            `${process.env.REACT_APP_SERVER_ADDR}/api/usersAllGroup`,
            {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${cookies.accessToken}`
              }
            }
          );

          if (responseGroups.ok) {
            const dataGroups = await responseGroups.json();
            setGroups(dataGroups);
          }
          setIsFetchLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchUserNameAndGroups();
    }
  }, [cookies.accessToken, go]);

  return (
    <div className="flex resize-y">
      <div className="flex border border-black p-3 flex-shrink-0">
        {!isFetchLoading && <Sidebar userName={userName} myGroups={groups} />}
      </div>
      <div className="flex-grow">
        {!isLoading && userScrapData && <Scrap userScrapData={userScrapData} socket={socket} />}
      </div>
    </div>
  );
}
