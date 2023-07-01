import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function CollectionText({handleDragStart}) {
  const [cookies] = useCookies(["accessToken"]);
    const [collectText,setCollectText] = useState([]);

  useEffect(() => {
    if (cookies.accessToken) {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDR}/api/textCollect`,
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {

        console.log(res);
        console.log(res.data);
        console.log(res.data.dataToSend);
        
        // if (res.data.dataToSend.length === 0){
        //     setCollectText(null);
        //     return;
        // }
        setCollectText(res.data.dataTosend);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return <div>Text</div>;
}
