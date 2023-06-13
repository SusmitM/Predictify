import "./Home.css";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useImageContext } from "../context/ImageContext";
import { Text, Button} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";



const fileTypes = ["JPEG", "PNG", "JPG"];

export const Home = () => {
  const {isAuthenticated}=useAuthContext();

  const { getPredictedText,setUploadedImg,setPredictedText } = useImageContext();

  const [file, setFile] = useState("");

  const navigate=useNavigate()


  const handleChange = (file) => {
    setFile(file);
  };

  const submitImage = () => {
    setUploadedImg("");
    setPredictedText("");

    // creating a formData to store and append in received image file
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "predictify");
    data.append("cloud_name", "djxqg0lar");

     //navigate to results page
     navigate("/result")

    //Sending the image to cloudinary
    fetch("https://api.cloudinary.com/v1_1/djxqg0lar/image/upload", {
      method: "post",
      body: data,
    }).then((res) => res.json())
    .then((imgData) => getPredictedText(imgData.secure_url));
  };

  return (
    <div className="homeContainer">
      <Text className="homeTitle " fontSize="3xl" fontWeight="bold">
        Hello 👋👋 , Drag & Drop Files Here <TriangleDownIcon />
      </Text>
      <div className="uploadContainer">
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      {file ? (
        <div className="home-imageDetails">
          <img src={URL.createObjectURL(file)} alt="Uploaded" />
          <hr />
          <p>File name: {file.name}</p>
        </div>
      ) : (
        <Text className="label" fontSize="xl" fontWeight="bold" color="red">
          No files uploaded yet
        </Text>
      )}
      <Button
      isDisabled={isAuthenticated && !file}
        className="predictBtn"
        colorScheme="green"
        onClick={()=> isAuthenticated ? submitImage(): navigate("/signin")}
      >
        {isAuthenticated ?"Predict" :"Login"}
      </Button>
    </div>
  );
};
