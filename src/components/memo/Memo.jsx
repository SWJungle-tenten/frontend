import React, { useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

export default function Memo({
  open,
  receiveMemo,
  draggedElementContent,
  setDraggedElementContent,
  selectedMemo,
  selectedTitle,

}) {
  const [cookies] = useCookies("accessToken");
  const editorRef = useRef();
  const titleRef = useRef();

  const goList = () => {
    receiveMemo();
    open(true);
  };

  // 메모 삭제
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
          .delete(`https://sangunlee.shop/api/deleteMemo`, {
            data: { time: selectedMemo },
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          })
          .then((res) => {
            // console.log(res);
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
    const data = editorRef.current?.getInstance().getHTML();

    const date = new Date();

    const time = selectedMemo ? selectedMemo : date.getTime();

    if (!titleRef.current) {
      alert("제목을 입력하세요");
      return;
    }
    if (data) {
      axios
        .post(
          `https://sangunlee.shop/api/saveMemo`,
          {
            time: time,
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
          Swal.fire({
            icon: "success",
            title: "저장 완료!",
            text: "메모를 저장했습니다.",
          });
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
    else{
    editorRef.current?.getInstance().setHTML(" ");
    }
  }, [selectedMemo]);
  
  // 메모 받아와서 셋팅
  const receiveContent = async () => {
    await axios
      .post(
        `https://sangunlee.shop/api/memoContents`,
        {
          time: selectedMemo,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        titleRef.current = selectedTitle;
        const contentsHTML = res.data.memoContent;
        editorRef.current?.getInstance().setHTML(contentsHTML);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeTitle = (event) => {
    titleRef.current = event.target.value;
  };

  // 제목 불러오기
  // titleRef.current="" 여기에 값을 넣으면 될 듯?
  // 내용 불러오기
  // initialValue에 html형태로 넘기면 됨

  // Drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    const data = editorRef.current?.getInstance().getHTML();
    editorRef.current?.getInstance().setHTML(data + draggedElementContent);
    setDraggedElementContent("");
  };

  const toPdf = async (name) => {
    document
      .querySelector(".ProseMirror.toastui-editor-contents")
      ?.setAttribute("style", "height: auto !important; ");
      //-------------------
      // const convertToBase64 = (url) => {
      //   return new Promise((resolve, reject) => {
      //     fetch(url)
      //       .then((response) => response.blob())
      //       .then((blob) => {
      //         const reader = new FileReader();
      //         reader.onloadend = () => {
      //           const base64String = reader.result;
      //           resolve(base64String);
      //           setBase64Image(base64String);
      //         };
      //         reader.onerror = reject;
      //         reader.readAsDataURL(blob);
      //       })
      //       .catch((error) => reject(error));
      //   });
      // };
    
      // const editorContents = document.querySelector(".ProseMirror.toastui-editor-contents");
      // const imgTags = editorContents.querySelectorAll("img");
    
      // // const base64ImagesPromises = Array.from(imgTags).map((img) => {
      // //   const imageUrl = img.src;
      // //   return convertToBase64(imageUrl);
      // // });
      // const base64ImagesPromises = Array.from(imgTags).map((img) => {
      //   const imageUrl = img.src;
      //   // console.log(img);
      //   if (imageUrl.startsWith("data:image")) {
      //     // 이미지가 base64로 변환된 경우, 원래의 S3 URL로 변경
      //     return Promise.resolve(imageUrl);
      //   } else {
      //     // 이미지가 S3 URL인 경우, base64로 변환
      //     return convertToBase64(imageUrl);
      //   }
      // });
    
      // const base64Images = await Promise.all(base64ImagesPromises);
    
      // imgTags.forEach((img, index) => {
      //   if (img.classList.contains("ProseMirror-separator")) {
      //     img.remove();
      //   }
      //   // console.log(img);
      //   img.dataset.originalSrc = img.src; // 원래의 S3 URL을 저장해둡니다.
      //   img.src = base64Images[index];
      
      // });

    html2canvas(
      document.querySelector(".ProseMirror.toastui-editor-contents"),
      {
        // ignoreElements: (element) => {
        //   // class가 "ProseMirror-separator"인 img 요소는 캡처에서 제외
        //   if (element.tagName === "IMG" && element.classList.contains("ProseMirror-separator")) {
        //     return true;
        //   }
        //   return false;
        // },
        logging: true,
        letterRendering: 1, 
        allowTaint : true, 
        useCORS: true ,
        // 테두리
        // backgroundColor: "transparent",
      }
    ).then((canvas) => {
      let imgData = canvas.toDataURL("image/png");

      let imgWidth = 180;
      let pageHeight = imgWidth * 1.414;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let margin = 20;

      const doc = new jsPDF("p", "mm", "a4");
      let position = 0;

      doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 40) {
        position = heightLeft - imgHeight - 40;
        doc.addPage();
        doc.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(`${name}.pdf`);
    });
    // // s3로 다시 바꾸기!
    // imgTags.forEach((img, index) => {
    //   // console.log(img.dataset.originalSrc);
    //   img.src = img.dataset.originalSrc;
    // });


    document
      .querySelector(".ProseMirror.toastui-editor-contents")
      ?.setAttribute("style", "height: 100% !important;");
  };

  return (
    <div className="p-4 overflow-auto">
      {/* <button onClick={()=> console.log(editorRef.current?.getInstance().getHTML())}>dddd</button> */}
      <div className="overflow-auto">
        <div className="pb-2">
          <input
            className="w-[100%] border rounded h-10 pl-6"
            defaultValue={selectedTitle}
            onChange={changeTitle}
            placeholder="Title"
          />
        </div>
        <div
          className="droppable overflow-auto"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Editor
            initialValue=" "
            // initialValue="<p>내용을 입력하세요!<p>dddd"
            // placeholder="내용을 입력하세요!!"
            ref={editorRef}
            previewStyle="vertical"
            height="540px"
            initialEditType="wysiwyg"
            language="ko-KR"
            // useCommandShortcut={true}
            hideModeSwitch={true}
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task"],
              ["code"],
            ]}
          />
        </div>
        <div className="flex justify-between py-2">
          <div className="flex space-x-2">
            <button className="btn-blue" onClick={() => open(true)}>
              목록
            </button>
            <button
              className="btn-yellow hidden sm:block"
              onClick={() => {
                toPdf(titleRef.current);
              }}
            >
              PDF
            </button>
          </div>
          <div className="space-x-2 flex">
            {selectedMemo && (
              <button className="btn-red" onClick={deleteMemo}>
                삭제
              </button>
            )}
            <button className="btn-green" onClick={saveContent}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
