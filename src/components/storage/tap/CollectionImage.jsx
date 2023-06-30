import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function CollectionImage({handleDragStart}) {
  const [cookies] = useCookies(["accessToken"]);
  const [collectImage,setCollectImage] = useState([]);

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
        // console.log(res);
        console.log(res.data);
        setCollectImage(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);
    return (
        <div className='pl-16 py-10 pr-2 overflow-auto overflow-x-hidden space-y-6'>
            <div className='text-3xl font-bold'>
                스크랩한 이미지 
            </div>
            {collectImage.length > 0 && (
        <div className="flex flex-row flex-wrap w-full gap-[19px] pb-">
          {collectImage.map((img, imgIndex) => (
            <div
              className="tooltip"
              data-tip="드래그해서 이미지를 메모에 추가해보세요"
              key={`img-${imgIndex}`}
            >
              <img
                className="cursor-grab border rounded-lg hover:brightness-50 active:cursor-grabbing"
                onDragStart={handleDragStart}
                src={img}
                crossOrigin="anonymous"
                alt={`Related-${imgIndex}`}
                key={`img-${imgIndex}`}
              />
            </div>
          ))}
        </div>
      )}
        </div>
    );
}