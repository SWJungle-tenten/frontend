import axios from "axios";
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export default function SignIn(prop) {
  const go = useNavigate();

  const { handleLogin } = prop;
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  const [showPassword, setShowPassword] = useState(false);

  const email = useRef("");
  const password= useRef("");

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleCookie = (data) => {
    const expireDate = new Date();
    // 동적으로 바꾸기
    expireDate.setMinutes(expireDate.getMinutes() + 60);
    setCookie("accessToken", data, {
      path: "/",
      expires: expireDate,
      secure: true,
      sameSite: "none",
    });
  };
  const emailHandler = (event) => {
    email.current = event.target.value;
  };
  
  const passwordHandler = (event) => {
    password.current = event.target.value;

  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(email.current);
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/login`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            email: email.current,
            password: password.current,
          },
        }
      )
      .then((res) => {
        // console.log("success");
        // console.log(response.data.token);
        handleCookie(res.data.token);
        go("/main");
      })
      .catch((error) => {
        console.log("Error");
        // console.log(error);
        if(error.message === "Network Error"){
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "네트워크 에러!",
          }); 
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      });
  };

  const alertHandle = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "이메일 또는 비밀번호가 일치하지 않습니다.?",
    });
  }
  return (
    <div className="p-6 pb-0">
      <form className="space-y-1" onSubmit={submitHandler}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5  "
            placeholder="name@gmail.com"
            onChange={emailHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5  "
            onChange={passwordHandler}
          />
        </div>
        <div className="pt-1">
          <label className="">
            <input
              className=""
              type="checkbox"
              checked={showPassword}
              onChange={handleCheckboxChange}
            />
            <span className="pl-2">비밀번호 보기</span>
          </label>
        </div>
        <div className="flex items-center justify-between"></div>
        <button
          type="submit"
          className="w-full duration-200 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-2.5 "
        >
          로그인
        </button>
        {/* <button onClick={a}>dsds</button> */}
        <p className="pt-2 text-sm font-light text-gray-600  ">
          계정이 없으신가요? {""}
          <button
            onClick={handleLogin}
            className="font-medium text-red-600 hover:underline "
          >
            회원가입
          </button>
        </p>
      </form>
      <div className="flex justify-between pt-2">
        <button
          className="border border-black text-black "
          onClick={() => {
            removeCookie("accessToken");
          }}
        >
          토큰제거
        </button>
        <button
          className="border border-black text-black "
          onClick={() => {
            console.log(cookies.accessToken);
          }}
        >
          토큰찍어
        </button>
        <button
          className="border border-black text-black "
          onClick={() => go("/main")}
        >
          go to main
        </button>
        <button onClick={alertHandle}>button</button>

      </div>
    </div>
  );
}