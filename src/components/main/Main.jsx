import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Main() {
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  const go = useNavigate();
  // console.log(cookies.accessToken);

  // 잠시 주석 처리
  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });
      // go("/");
    }
  }, []);


  // axios
  //   .get(`${process.env.REACT_APP_SERVER_ADDR}/api/auth`, {
  //     headers: {
  //       "x-auth-token": cookies.accessToken,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     // console.log(error.response.data.msg);
  //     removeCookie("accessToken");
  //     alert("로그인이 필요합니다.");
  //     go("/");
  //   });
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
          // alert("로그아웃 완료.");
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
  return (
    <>
      <div className="flex p-10 space-x-2 justify-between bg-red-200">
        <p className="text-3xl font-bold">My name is Main 😡</p>
        <button
          onClick={logout}
          className="bg-white text-red-400 hover:bg-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2 duration-200 "
        >
          로그아웃
        </button>
      </div>
      <div className="flex mt-2 pl-2 space-x-2 justify-center">
        <button
          className=" text-black bg-red-200 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5 duration-200 "
          onClick={() => go("/")}
        >
          go to intro
        </button>
        <button
          className="text-black bg-red-200 hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5 duration-200 "
          onClick={() => go("/storage")}
        >
          go to storage
        </button>
        <div>
          <button className="text-black focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5 bg-red-100 hover:bg-red-300 duration-200">
            Button
          </button>
        </div>
      </div>
    <div className="pl-3">
    </div>
    </>
  );
}
