/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import { useAuthContext } from "./AuthContext";

const ImageContext = createContext();

// eslint-disable-next-line react/prop-types
export const ImageContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [uploadedImg, setUploadedImg] = useState("");
  const [predictedText, setPredictedText] = useState("");
  const [userData,setUserData]=useState([])

  //function to send predicted text and userData to server
  const sendData = async () => {
    const url = "https://predictify-backend.vercel.app/data";
    try {
      await axios.post(url, {
        name: user.name,
        email: user.email,
        predictedText: predictedText,
        image:uploadedImg,
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  //function to send the received img url to the backend
  const getPredictedText = async (receivedImageURL) => {
    setUploadedImg(receivedImageURL);

    const url = "https://predictify-backend.vercel.app/predict";

    try {
      const response = await axios.post(url, {
        imgUrl: receivedImageURL,
      });

      setPredictedText(response.data.predictedText);
    } catch (error) {
      console.error("Error predicting text:", error);
    }
  };
  useEffect(() => {
    if (predictedText !== "") {
      sendData(); // Call sendData function when predictedText is not empty
    }
  }, [predictedText]);


  useEffect(()=>{
    const dbData = async()=>{
      try{
        const data= await axios.get(`https://predictify-backend.vercel.app/data`);
      setUserData(data);
      }
      catch(e){
        console.error(e)
      }
    
    }
    dbData()
    
  },[predictedText])

  return (
    <>
      <ImageContext.Provider
        value={{
          getPredictedText,
          setUploadedImg,
          setPredictedText,
          predictedText,
          uploadedImg,
          userData
        }}
      >
        {children}
      </ImageContext.Provider>
    </>
  );
};

export const useImageContext = () => useContext(ImageContext);
