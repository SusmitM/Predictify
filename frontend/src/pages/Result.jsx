import "./Results.css";
import { useImageContext } from "../context/ImageContext";
import { Textarea, Text} from "@chakra-ui/react";
export const Result = () => {
  const { predictedText, uploadedImg} = useImageContext();
  return (
    <>
      {!predictedText.length > 0 && <div>Loading...</div>}
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
                width="500px"
                height="500px"
              >
                {predictedText}
              </Textarea>
            </div>
          </div>
        </>
      )}
    </>
  );
};
