import "./History.css"
import Card from "../components/card/Card";
import { useAuthContext } from "../context/AuthContext";
import { useImageContext } from "../context/ImageContext"
import { Text} from "@chakra-ui/react";

export const History = () => {
  const {userData}=useImageContext();
  const{user}=useAuthContext();
  const currentUserData=userData.data.filter(data=>data.email===user.email);
  
  return (
   <>
    <Text
    margin="auto"
    className="resultTitle"
    fontSize="4xl"
    fontWeight="bold"
    textDecoration="underline"
  >
    {" "}
  History
  </Text>
  <div className="historyContainer">
   
  {currentUserData.length===0 && <div className="title">No Previous Predicts Found</div>}
  {currentUserData.length>0 && <div  className="listContainer">
    <ul>
            {currentUserData.map(data => 
             
              <div key={data._id}> <Card data={data}/></div>
              
             
            )}
          </ul>
    </div>}
  </div>
   </>
  )
}
