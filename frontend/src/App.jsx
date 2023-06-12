import './App.css'
import axios from "axios";

function App() {
  const url = 'https://predictify-backend.vercel.app/predict';
  const headers = {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQMeGkHXYMbo_CyhPeNodJXbCCoO3AM-HcQ&usqp=CAU",
  };
  axios
    .post(url, null, { headers })
    .then((response) => {

      console.log(response.data.predictedText);
      // Handle the result as needed
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle the error
    });
 

  return (
    <>
      <div>
      <h1>Predictify</h1>
       
      </div>
      
    </>
  )
}

export default App
