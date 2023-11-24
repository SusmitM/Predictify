import "./History.css"
import Card from "../components/card/Card";
import { useAuthContext } from "../context/AuthContext";

import axios from "axios";
import { Text} from "@chakra-ui/react";
import { useState,useEffect } from "react";


export const History = () => {
 
  const [currentUserData,setCurrentUserData]=useState([]);

  
  const{user}=useAuthContext();
 

  useEffect(()=>{
    const dbData = async()=>{
      try{
        const allUserData= await axios.get(`https://predictify-backend.onrender.com/data`);

        const dataToShow=allUserData.data.filter(data=>data.email===user.email);

        setCurrentUserData(dataToShow);

      }
      catch(e){
        console.error(e)
      }
    
    }
    dbData()
    
  },[])

  
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
