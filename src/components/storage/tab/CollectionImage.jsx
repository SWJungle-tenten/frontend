import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ImageSpreader from "../ImageSpreader";

export default function CollectionImage({ handleDragStart }) {
  const [cookies] = useCookies(["accessToken"]);
  const [collectImage, setCollectImage] = useState([]);

  useEffect(() => {
    if (cookies.accessToken) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_ADDR}/api/imgCollect`,

          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        )
        .then((res) => {
          if (res.data.length === 0) {
            setCollectImage(null);
            return;
          }
          setCollectImage(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className="pl-16 py-10 pr-2 overflow-auto overflow-x-hidden space-y-6">
      <div className="text-3xl font-bold">스크랩한 이미지</div>
      {!collectImage ? (
        <div className="text-3xl text-center p-6">스크랩한 이미지가 없어요</div>
      ) : collectImage.length > 0 ? (
        <div className="flex flex-row flex-wrap w-full gap-[19px] pb-">
          <ImageSpreader images={collectImage} handleDragStart={handleDragStart} />
        </div>
      ) : (
        <div className="text-3xl text-center p-6">로딩중</div>
      )}
    </div>
  );
}
