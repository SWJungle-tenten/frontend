import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header() {
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  const go = useNavigate();
  const logout = async () => {
    if (cookies.accessToken) {
      await axios
        .get(`${process.env.REACT_APP_SERVER_ADDR}/api/logout`, {
          headers: {
            "x-auth-token": cookies.accessToken,
          },
        })
        .then((res) => {
          // console.log(res);
          removeCookie("accessToken");
          console.log("로그아웃 완료.");
          go("/");
        })
        .catch((error) => {
          // console.log(error);
          removeCookie("accessToken");
          go("/");
        });
    } else {
      go("/");
    }
  };
  // useEffect(() => {
  //   if (!cookies.accessToken) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "로그인이 필요합니다.",
  //     });

  //     go("/");
  //   }
  // });
  return (
    <div className="shadow ">
      <div className="flex items-center text-3xl p-3 sm:px-6 lg:px-8 justify-between">
        <div>
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-black">ing Helper</span>          
        </div>
        {/* <div className="absolute right-0 top-0 px-6 pt-2"> */}
        <div className="">
          <button
            onClick={logout}
            className="bg- border-2 border-red-300 text-red-300 hover:bg-red-400 hover:border-red-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2 duration-200 "
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
