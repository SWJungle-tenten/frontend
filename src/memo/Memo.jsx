import React, { useEffect, useRef, useState } from "react";
// import Editor from "@toast-ui/react-editor";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Memo({ selectedMemo, open, memoArray, receiveMemo }) {
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  // const {contents} = prop;
  const editorRef = useRef();
  const titleRef = useRef();

  const goList = () => {
    receiveMemo();
    open(true);
  };

  const onChangeContent = () => {
    // const data = editorRef.current?.getInstance().getMarkdown();
    const data = editorRef.current?.getInstance().getHTML();

    // console.log(data);

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
          alert("memo create");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
    <div className="p-2">
      <div>
        <input
          className="w-[100%] border rounded h-10 pl-6"
          defaultValue={selectedMemo}
          onChange={changeTitle}
          placeholder="Title"
        />
        <Editor
          initialValue=" "
          // initialValue="<p>내용을 입력하세요!<p>dddd"
          // placeholder="내용을 입력하세요!!"
          ref={editorRef}
          previewStyle="vertical"
          height="800px"
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
        <div className="space-x-2">
          <button onClick={onChangeContent}>저장</button>

          <button onClick={() => goList()}>목록</button>
          <button
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
          <button onClick={receiveMemo}>제목</button>
          {selectedMemo && (<button >삭제</button>)}
        </div>
      </div>
    </div>
  );
}
{
  /* <Editor
  initialValue="hello react editor world!"
  previewStyle="vertical"
  height="600px"
  initialEditType="wysiwyg"
  useCommandShortcut={false}
  language="ko-KR"
  ref={editorRef}
  onChange={onChange}
  // plugins={[colorSyntax]}
/> */
}
// import React from "react";

// function Memo({ selectedMemo ,open}) {
//   return (
//     <div>
//       {selectedMemo && (
//         <div>
//           <h2>{selectedMemo.title}</h2>
//           <p>{selectedMemo.content}</p>
//         </div>
//       )}
//       <button onClick={open}>목록</button>

//     </div>
//   );
// }

// export default Memo;
