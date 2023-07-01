import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import TextSpreader from "../TextSpreader";

export default function CollectionText({ handleDragStart }) {
  const [cookies] = useCookies(["accessToken"]);
  const [collectText, setCollectText] = useState([]);

  useEffect(() => {
    if (cookies.accessToken) {
      axios
        .get(`${process.env.REACT_APP_SERVER_ADDR}/api/textCollect`, {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then((res) => {
          setCollectText(res.data.dataTosend);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [cookies.accessToken]);

  return (
    <div className="pl-16 py-10 pr-2 overflow-auto overflow-x-hidden space-y-6">
      <div className="text-3xl font-bold">스크랩한 이미지</div>
      {!collectText ? (
        <div className="text-3xl text-center p-6">스크랩한 이미지가 없어요</div>
      ) : collectText.length > 0 ? (
        <div className="flex flex-row flex-wrap w-full gap-[19px] pb-">
          <TextSpreader texts={collectText} handleDragStart={handleDragStart} />
        </div>
      ) : (
        <div className="text-3xl text-center p-6">로딩중</div>
      )}
    </div>
  );
}
