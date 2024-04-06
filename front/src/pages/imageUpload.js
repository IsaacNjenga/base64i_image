import React, { useEffect, useState } from "react";

function ImageUpload() {
  const [image, setImage] = useState("");
  const [allImage, setAllImage] = useState([]);

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  const uploadImage = () => {
    fetch("http://localhost:3001/upload-image", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    // .catch((error) => console.error("Error uploading image:", error));
  };

  const getImage = () => {
    fetch("http://localhost:3001/get-image", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImage(data.data);
      });
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      <label>Upload here</label>
      <br />
      <input accept="image/*" type="file" onChange={convertToBase64} />
      <br />
      {image === "" || image === null ? (
        ""
      ) : (
        <img width={100} height={100} src={image} alt="kapic here" />
      )}
      <button onClick={uploadImage}>Upload</button>
<p>From Mongo</p>
      {allImage.map((data) => {
        return (
          <img width={100} height={100} src={data.image} alt="kapic here" />
        );
      })}
    </div>
  );
}

export default ImageUpload;
