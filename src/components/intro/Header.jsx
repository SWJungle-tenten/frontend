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
        .get(`https://sangunlee.shop/api/logout`, {
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
    <div className="shadow z-10 mb-0.5">
      <div className="flex items-center text-3xl p-3 sm:px-6 lg:px-8 justify-between">
        <div className="logo">
          <span className="text-google-blue">G</span>
          <span className="text-google-red">o</span>
          <span className="text-google-yellow">o</span>
          <span className="text-google-blue">g</span>
          <span className="text-google-green">l</span>
          <span className="text-black">ing Helper</span>
        </div>
        <div className="">
          <button onClick={logout} className="btn-white">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
