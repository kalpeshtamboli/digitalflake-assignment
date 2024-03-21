import React, { useEffect, useRef } from "react";
import axios from "axios";
import useFileUpload from "react-use-file-upload";

const FileUpload = ({getImageName}) => {
 

  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
    
  } = useFileUpload();
  const inputRef = useRef();

useEffect(()=> {
  getImageName(files)

},[files, getImageName])

  return (
    <div>
      {files.length > 0 ? (
        files.map((file, index) => {
          const path = URL.createObjectURL(file);

          return (
            <div key={index}>
              <img src={path} alt={file.name} className="h-40" />
            </div>
          );
        })
      ) : (
        <div
          className="border-2 border-dashed p-7"
          //   css={DropzoneCSS}
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, "a");
          }}
        >
          <p>Drag and drop files here</p>

          <button onClick={() => inputRef.current.click()}>
            Or select files to upload
          </button>

          {/* Hide the crappy looking default HTML input */}
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              setFiles(e, "a");
              inputRef.current.value = null;
            }}
          />
        </div>
      )}

      <div>
        <ul className="text-center">
          {fileNames.map((name) => (
            <li key={name}>
              <span className="text-center font-bold">{name}</span>

              <span onClick={() => removeFile(name)}>
                <i className="fa fa-times" />
              </span>
            </li>
          ))}
        </ul>
      </div>
      {files.length > 0 && (
        <ul>
          <li className="clear-all">
            <button
              onClick={() => clearAllFiles()}
              className="bg-red-600 rounded-md px-5 py-1 mt-2 text-center flex justify-center mx-auto"
            >
              Remove
            </button>
          </li>
        </ul>
      )}

      <div className="submit"></div>
    </div>
  );
};

export default FileUpload;
