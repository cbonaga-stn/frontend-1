// src/shared/components/FormElements/ImageUpload.js
import React, { useRef, useState } from "react";
import Button from "../../UI/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [previewUrl, setPreviewUrl] = useState();
  const [file, setFile] = useState();  // Added to keep track of the selected file
  const [isValid, setIsValid] = useState(false);   // Added to keep track of validity

  useEffect(() => {   // Added to generate preview when file changes
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event) => {  // Modified to handle file selection and preview
  let userFile;
  let fileIsValid = isValid;

  if (event.target.files && event.target.files.length === 1) {   // Check if a file is selected
    userFile = event.target.files[0];
    setFile(userFile);
    setIsValid(true);
    fileIsValid = true;
  } else {
    setIsValid(false);
    fileIsValid = false;
  }

  props.onInput(props.id, userFile, fileIsValid);
};

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">    
          {previewUrl && <img src={previewUrl} alt="Uploaded File Preview" />} 
          {!previewUrl && <p>Please choose an image.</p>}
          {!isValid && props.errorText && <p className="error-text">{props.errorText}</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Choose an Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;