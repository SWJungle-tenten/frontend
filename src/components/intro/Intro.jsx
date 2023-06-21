import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Intro() {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies("accessToken");
  const go = useNavigate();

  useEffect(() => {
    if (cookies.accessToken) {
      axios
        .get(`${process.env.REACT_APP_SERVER_ADDR}/api/auth`, {
          headers: {
            "x-auth-token": cookies.accessToken,
          },
        })
        .then((res) => {
          console.log(res);
          go("/main");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const modalToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      {/* <div className="grid p-10 space-y-3 justify-items-center bg-red-400"> */}
      {/* <header className="z-[99]  bg-white dark:bg-gray-800 w-full  shadow fixed top-0">
        <div className="max-w-6xl text-xl mx-auto px-2 sm:px-6 lg:px-8">
          <span className="text-blue-500">G</span>
          <span className="text-red-500">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-black">ing Helper</span>
        </div>
      </header> */}
      <section className="relative bg-cover object-fill w-full bg-center">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 gap-0 items-center lg:grid-cols-6 xl:grid-cols-5">
            <article className="flex flex-col p-20 pl-10 pb-10 items-center lg:items-start lg:col-span-4 xl:col-span-3 mt-24 false">
              <h1 className="font-semibold text-center md:text-left mb-4 md:whitespace-nowrap text-6xl md:text-7xl -ml-2 drop-shadow-lg">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-black">ing Helper</span>
              </h1>
              <h2 className="mb-4 leading-tight text-center md:text-left text-xl sm:text-2xl">
                검색을 간편하게!
              </h2>
              <div className="w-full flex gap-4 flex-row items-center justify-center lg:justify-start ">
                <button
                  onClick={modalToggle}
                  className="inline-flex justify-items-center px-5 py-2 text-base hover:bg-red-400 hover:text-white leading-6 rounded-lg text-red-500 bg-transparent focus:outline-none focus:ring border-2 border-red-400 transition duration-150 ease-in-out md:text-lg md:px-6"
                >
                  시작하기 →
                </button>
              </div>
            </article>
            {/* <h1 className="drop-shadow-lg text-5xl font-semibold text-gray-800 dark:text-white sm:text-5xl md:text-6xl relative text-center pt-24 "> */}
          </div>
        </div>
      </section>
      <div className="bg-red-400 w-full h-40 transform -skew-y-[4deg]"></div>
      <div className="absolute top-[30rem] bg-red-400 w-full pt-[10rem] pb-[21rem]">
        <div className="gap-4 p-10 space-y-10 xl:grid xl:grid-cols-3">
          <div className="flex flex-col justify-center ">
            <img
              src="https://img.icons8.com/ios/100/000000/search--v1.png"
              alt="like"
              className="w-30 h-30 mx-auto"
            />
            <p></p>
            <p></p>
          </div>
          <div className="flex flex-col justify-center "></div>
          <div className="flex flex-col justify-center "></div>
        </div>
      </div>

      <LoginModal openToggle={modalToggle} open={open} />
    </div>

    // <div>
    //   {/* <div className="grid p-10 space-y-3 justify-items-center bg-red-400"> */}
    //   <div className="relative flex mb-32 md:mb-40 flex-col items-center justify-center">
    //     <h1 className="drop-shadow-lg text-5xl font-semibold text-gray-800 dark:text-white sm:text-5xl md:text-6xl relative text-center pt-24 ">
    //       Googling Helper
    //       <br></br>
    //     </h1>
    //     <div className="relative">
    //       <button
    //         onClick={modalToggle}
    //         className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 duration-200 rounded-2xl"
    //       >
    //         시작하기
    //       </button>
    //     </div>
    //   </div>
    //   <div className="sc-dc6b043c-0 eMcNtq bg-red-400 w-full py-24 shadow-inner"></div>
    //   <LoginModal openToggle={modalToggle} open={open} />
    // </div>

    // <div>

    //     <div className="grid p-10 space-y-3 justify-items-center bg-red-400">
    //       <h1 className="mb-4 text-3xl font-semibold text-white">
    //         TENTEN Search
    //       </h1>
    //       <button
    //         onClick={modalToggle}
    //         className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 duration-200 rounded-2xl"
    //       >
    //         시작하기
    //       </button>
    //     </div>
    //     <div className="sc-dc6b043c-0 eMcNtq bg-gray-700 dark:bg-gray-900 w-full py-24 shadow-inner">

    //     </div>

    //   <LoginModal openToggle={modalToggle} open={open} />
    // </div>
  );
}
