import React, { useState } from "react";
import { Field } from "formik";
import "./FileUpload.css";

const FileUploadPreviewDefault = ({ name }) => name;

const FileUploadPreviewImage = ({ name, url }) => (
  <img className="preview__item__image" src={url} alt={name} title={name} />
);

const FileUploadPreviewVideo = ({ name, url }) => (
  <video className="preview__item__video" src={url} title={name} controls />
);

const FileUploadStatus = ({ progress, status }) => (
  <div
    className={`preview__item__state preview__item__state--${status}`}
    style={{ width: `${progress}%` }} />
);

const previewers = {
  image: FileUploadPreviewImage,
  video: FileUploadPreviewVideo,
};

const FileUploadPreview = ({ files = [], fileTypePreviews = {}, onRemoveFile }) => files.length ? (
  <div className="preview">
    {files.map(file => {
      const Previewer = fileTypePreviews[file.type] || FileUploadPreviewDefault;

      return (
        <div
          key={file.id}
          className={`preview__item preview__item--${file.type}`}
          onClick={() => onRemoveFile(file.id)}>
          <FileUploadStatus progress={file.progress} status={file.status} />
          <Previewer {...file} />
        </div>
      );
    })}
  </div>
) : null;

export function UploadBox(props) {
  let fileID = 0
  const [files, setFiles] = useState([])

  const getPreviewType = (mime, name) => {
    const mimeParts = mime.toLowerCase().split('/');
    let type = mimeParts[0];
    if (type === 'application') {
      type = mimeParts[1];
    }
    if (type.startsWith('x-') || type.includes('vnd')) {
      type = name.split('.').pop();
    }
    return type;
  };

  const updateFile = (id, data) => {
    const index = files.findIndex((f) => f.id === id);
    if (index === -1) {
      return;
    }
    setFiles([
      ...files.slice(0, index),
      Object.assign({}, files[index], data),
      ...files.slice(index + 1),
    ])
  }

  const uploadFile = (id, file) => {
    const formData = new FormData();
    const req = new XMLHttpRequest();

    formData.append('file', file);

    req.onabort = req.onerror = req.ontimeout = () => {
      alert(`An error occurred while uploading ${file.name}`);
      handleRemoveFile(id);
    };

    req.upload.onprogress = e => {
      console.log('progress event:', e);
      if (!e.lengthComputable) {
        return;
      }

      updateFile(id, {
        progress: Math.floor(e.loaded / e.total * 100),
      });
    };

    req.onload = (e) => {
      console.log('load event:', e);
      updateFile(id, {
        progress: 100,
        status: "complete",
      });
    };

    console.log('sending', formData);
    req.open('POST', 'https://mockbin.org/bin/aad81c07-f970-4f29-8acb-4d8b8c8a1d51', true);
    req.setRequestHeader('Content-Type', file.type);
    req.send(formData);
  }

  const handleRemoveFile = (id) => {
    const index = files.findIndex((f) => f.id === id);
    window.URL.revokeObjectURL(files[index].url);
    setFiles([
      ...files.slice(0, index),
      ...files.slice(index + 1),
    ])
  }

  const handleFile = (e) => {
    const newFiles = [...e.target.files].map(file => {
      const newFile = {
        id: ++fileID,
        type: getPreviewType(file.type, file.name),
        mime: file.type,
        name: file.name,
        size: file.size,
        url: window.URL.createObjectURL(file),
        progress: 0,
        status: "uploading",
        file,
      };
      uploadFile(fileID, file);
      return newFile;
    });
    setFiles([...files, ...newFiles])
  }

  return (
    <Field name={props.name}>
      {({ field, form, meta }) => {
        return (
          <>
            {props.placeholder && (<label>{props.placeholder}</label>)}
            <div className="form-group">
              <div className="upload-btn">
                <button className="btn">Upload File</button>
                <input className="upload-btn__input" name="file" type="file" onChange={handleFile} />
              </div>
              {meta?.error && (
                <div className="danger">{form.errors[props.name]}</div>
              )}
              <FileUploadPreview
                files={files}
                fileTypePreviews={previewers}
                onRemoveFile={handleRemoveFile} />
            </div>
          </>
        );
      }}
    </Field>
  );
}

