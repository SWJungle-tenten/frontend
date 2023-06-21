import axios from "axios";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function SignUp(prop) {
  const { handleLogin } = prop;
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const emailHandler = (event) => {
    email.current = event.target.value;
  };
  const passwordHandler = (event) => {
    password.current = event.target.value;
  };
  const nameHandler = (event) => {
    name.current = event.target.value;

  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (name.current === ''){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "이름을 입력하세요.",
      });
      return
    }
    else if (email.current === '' ){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "이메일을 입력하세요.",
      });
      return
    }
    else if (password.current === ''){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "비밀번호를 입력하세요.",
      });
      return
    }
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/register`,
        { name: name.current, email: email.current, password: password.current },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        handleLogin();
        Swal.fire({
          icon: "success",
          title: "회원가입 완료!",
        });

      })
      .catch((error) => {
        if (error.response.status === 400) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "이미 존재하는 Email 입니다.",
          });
        }
        console.log("Error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "회원가입 실패!",
          confirmButtonColor: "#0ea5e9",
        });
      });
      
  };
  return (
    <div className="p-6  pb-0">
      <form className="space-y-1" onSubmit={submitHandler}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5  "
            placeholder="name"
            onChange={nameHandler}
          />
        </div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5  "
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
          회원가입
        </button>
        <p className="pt-2 text-sm font-light text-gray-600  ">
          이미 계정이 있으신가요? {""}
          <button
            onClick={handleLogin}
            className="font-medium text-red-600 hover:underline "
          >
            로그인으로 이동
          </button>
        </p>
      </form>
    </div>
  );
}
