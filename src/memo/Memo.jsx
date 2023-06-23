import React, { useEffect, useRef } from "react";
// import Editor from "@toast-ui/react-editor";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

export default function Memo({ selectedMemo, open, memoArray, receiveMemo }) {
  const [cookies] = useCookies("accessToken");
  // const {contents} = prop;
  const editorRef = useRef();
  const titleRef = useRef();

  const checkTime = () => {
    const date = new Date();
    console.log(date);

    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);

    console.log(formattedDate);
  };
  const goList = () => {
    receiveMemo();
    open(true);
  };

  // 메모 삭제
  // userToken, memoTitle = selectedMemo
  const deleteMemo = () => {
    Swal.fire({
      title: "메모를 삭제하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios
          .delete(
            `${process.env.REACT_APP_SERVER_ADDR}/api/deleteMemo`,
            
            {
              data: { memoTitle: selectedMemo },
              headers: {
                Authorization: `Bearer ${cookies.accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "삭제 완료!",
              text: "삭제되었습니다.",
            });
            goList();
          })
          .catch((error) => {
            console.log(error);
            alert("삭제 오류!");
          });

        
      }
    });
  };

  // 메모 저장
  const saveContent = () => {
    // const data = editorRef.current?.getInstance().getMarkdown();
    const data = editorRef.current?.getInstance().getHTML();

    if (!titleRef.current) {
      alert("제목을 입력하세요");
      return;
    }
    // 제목이 같으면 업데이트 처리 해야 함
    if (memoArray.includes(titleRef.current)) {
      alert("다른 제목을 입력하세요.");
      return;
    }
    if (data) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_ADDR}/api/saveMemo`,
          {
            memoTitle: titleRef.current,
            memoContents: data,
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          // 알림 필요없을 듯 아니 필요할듯 목록으로 안나가도 될 듯?
          alert("메모 저장 완료!");
          goList();

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // 제목이 있으면 메모 내용 불러오기
  useEffect(() => {
    if (selectedMemo) {
      receiveContent();
    }
  }, [selectedMemo]);

  // 메모 받아와서 셋팅
  const receiveContent = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ADDR}/api/memoContents`,
        {
          memoTitle: selectedMemo,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        // console.log(res.data.memoContent);
        // console.log(selectedMemo);
        titleRef.current = selectedMemo;
        const contentsHTML = res.data.memoContent;
        editorRef.current?.getInstance().setHTML(contentsHTML);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // editorRef.current?.getInstance().setHTML(contentsHTML);
  // editor.setMarkdown('# HELLO WORLD');
  // editorRef = ''
  const changeTitle = (event) => {
    titleRef.current = event.target.value;
  };

  // 제목 불러오기
  // titleRef.current="" 여기에 값을 넣으면 될 듯?
  // 내용 불러오기
  // initialValue에 html형태로 넘기면 됨
  return (
    <div className="p-4">
      <div>
        <div className="pb-2">
          <input
            className="w-[100%] border rounded h-10 pl-6"
            defaultValue={selectedMemo}
            onChange={changeTitle}
            placeholder="Title"
          />
        </div>

        <Editor
          initialValue=" "
          // initialValue="<p>내용을 입력하세요!<p>dddd"
          // placeholder="내용을 입력하세요!!"
          ref={editorRef}
          previewStyle="vertical"
          height="790px"
          initialEditType="wysiwyg"
          language="ko-KR"
          useCommandShortcut={true}
          hideModeSwitch={true}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task"],
            ["image", "code"],
          ]}
        />
        <div className="flex justify-between pt-2">
          <div className="">
            <button
              className="w-full duration-200 text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-semibold rounded-lg text-sm px-5 py-1.5"
              onClick={()=>open(true)}
            >
              목록
            </button>
          </div>
          {/* <button
            onClick={() => {
              console.log(selectedMemo);
            }}
          >
            제목세팅값
          </button>
          <button
            onClick={() => {
              console.log(titleRef.current);
            }}
          >
            Ref.current
          </button>
          <button onClick={receiveMemo}>제목</button> */}
          <div className="space-x-2 flex">
            {selectedMemo && (
              <button
                className="w-full duration-200 text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-5 py-1.5"
                onClick={deleteMemo}
              >
                삭제
              </button>
            )}
            <button
              className="w-full duration-200 text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-1.5"
              onClick={saveContent}
            >
              저장
            </button>
          </div>
        </div>
        {/* <button onClick={checkTime}>what time is it now?</button> */}
      </div>
    </div>
  );
}
