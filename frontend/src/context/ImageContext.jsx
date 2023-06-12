/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import axios from "axios";

const ImageContext = createContext();

// eslint-disable-next-line react/prop-types
export const ImageContextProvider = ({ children }) => {
  const [uploadedImg, setUploadedImg] = useState("");
  const [predictedText, setPredictedText] = useState("");

  //function to send the received img url to the backend
  const getPredictedText = async (receivedImageURL) => {
    setUploadedImg(receivedImageURL);

    try {
      const url = "https://predictify-backend.vercel.app/predict";
      const headers = {
        imgUrl: receivedImageURL,
      };
      // making a post request to the backend
      const response = await axios.post(url, null, { headers });

      if(response.status===200){
        //storing the text received from backend
      setPredictedText(response.data.predictedText);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ImageContext.Provider value={{ getPredictedText,setUploadedImg,setPredictedText,predictedText,uploadedImg }}>
        {children}
      </ImageContext.Provider>
    </>
  );
};

export const useImageContext = () => useContext(ImageContext);
