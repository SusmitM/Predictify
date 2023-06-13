import "./Results.css";
import { useImageContext } from "../context/ImageContext";
import { Textarea, Text, Button } from "@chakra-ui/react";
import { Circles } from "react-loader-spinner";
import { useState } from "react";
export const Result = () => {
  const { predictedText, uploadedImg } = useImageContext();

  const [speaking, setSpeaking] = useState(false);

  const msg = new SpeechSynthesisUtterance();

  const readText = () => {
    setSpeaking((prev) => !prev);
    msg.text = predictedText;
    window.speechSynthesis.speak(msg);
  };
  const stopReading = () => {
    setSpeaking((prev) => !prev);
    speechSynthesis.cancel();
  };
  return (
    <>
      {!predictedText.length > 0 && (
        <div className="loader">
          <Circles
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {predictedText.length > 0 && (
        <>
          <Text
            margin="auto"
            className="resultTitle"
            fontSize="4xl"
            fontWeight="bold"
            textDecoration="underline"
          >
            {" "}
            Results
          </Text>
          <div className="resultContainer">
            <div className="result-imgContainer">
              <img src={uploadedImg} />
            </div>
            <div className="result-textContainer">
              <Textarea
                className="result-textArea"
                placeholder="Here is a sample placeholder"
                size="m"
                resize="verticle"
                width="300px"
                height="500px"
              >
                {predictedText}
              </Textarea>
            </div>
          </div>
          <div className="buttonContainer">
          <Button
           
            colorScheme={speaking ? "red" : "green"}
            onClick={() => {
              speaking ? stopReading() : readText();
            }}
          >
            {speaking ? "Stop" : "Listen"}
          </Button>
          </div>
        </>
      )}
    </>
  );
};
