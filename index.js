

const express = require('express');
const mongoose = require('mongoose');
const { spawn } = require('child_process');
const dotenv =require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');



const port = process.env.PORT || 8080;

const app = express();
const vision = require('@google-cloud/vision');
app.use(cors())
let imgresult;
app.use(bodyParser.json());

const CONFIG = {
  credentials: {
    private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeOi8FgtnGXPAK\n5mVGMR27iZRxleC1F0TmKCfSIPiZUAhyj5FWyBxhjLEoxHZVtOF4MdFnmc5rP87b\nmDVMRgRSVTi0L3y6nZHM5qqRuHZVfyzyu4pdpC7E8g8Ad+4GSvzHd787jKleKW5s\nNM4uEwUOcuzOSMCaetUFuYeZjA28+8ua7959e4r5OOsQUUkaUXj2L+nIl56mCPqE\n8pJY/4dpeJgfCx3yYm19/E/2n4A2jbNMRjk21oYCLRIayFtOF8Vx5uZRh6KYys4Q\nE5ly1ClSc+6kB9jtWdnl8RpWZxpz8Yu9Gz3MvjzeuVtOnQDbxuLcFQBUUjgOd6PC\n8BTXk+7LAgMBAAECggEALlI2RdTC0HGQzIAakev7GlXyoTYRbLJ9Nyv2TGvem3N0\npaUmFVPMCzrW+mpZgknL4BYlicDbT0aE1oC+ya+NwFS2nvlv+Gn8rxGwSazI58qt\na/o/TZ6tGncKsUZq5mi5i+OgllxdkPVsID1tRsvGpS476UAfMppXFq/z5J29v984\n7Kloz9WzLm/EVh4dYHiz07Zw13CBA70cw/LwTTxB7PhQEjEP2wIMqPWoKqBjLGHl\nvKK3Al3lcv7visG9fJH7FfySMSnrZtclN8t/r9Ptn32G5dnkMMGLrfiit7yOTdZH\nAg+vCodoIq4FY6/UikEX5x9vG4YxUMdTUH6KIMV8oQKBgQDWmnD2EDz4S/3NBkjz\ncoU9v4e9udJlg/fa6n8k6I0/FJv21/htehjFk/duwMFKhQ38K8HrB55mRQOylTtf\neHSCJQshOUSJzdI0cq15EgBj0CLQ8oP/JGMo6cX5ZffjNgQfyVB95JT0O8EwoQpz\n3Dm+FjfKi4pE55TkMoD7tZ4qKQKBgQC8v8cFVoBCuSWf7A7aTer4QKJLM7Z1rj9W\nS7Q+p/kIMDf2c/h7oWK39zl2is10GhgeQwQVVB0zPAyLgSg2szFsqgY5ovmfVYt6\nzncUPro9f2SJzqVQh5YOGXBetm2xswS1GC7BKIWwXUoy7YytQrmnbN/t02KBMG5J\n7yUdrbGX0wKBgFLq9X59o7EkW3oeVY2K0CSdnmsWI08KAHhbZqjyGbEn22My61AR\nfwTIOTBX1ddfNZobph+ToAZP4C/eLUSkHBA1E+nQYMUF+5Q8Qv6mj/QA9ZLaQVoR\nyyaBvPayCWeG9Wz6sdkSuuLrO6f4cTt2+fCSURg3dkNNX2AUi3W2JNiRAoGBAJHE\ndfpcXH+rJzCDiND1ffKtT+lODaqCoG2P16rP5JZ7Tqzp0UwBThEPP/SZq6PvhxLP\n5LZoGIj55iJS4/CioRfvkxEuGSQBV8/G5dXfv8tAuC9pROiVXcCTyuGKd9rVi1wk\nSe9o0R5sXaJJLOyd7G0tux6bsqZc9b/pjbuG6fF7AoGAQtD+1L98H1As+GPzfIDR\nZt9Kc+MBm6VtuSeA94Qvfas5J4b/y9vyKWw86J3FZBvTzY9qXuWa9b2Lk1Xph4RK\nRlRhUNcVQxnMkTtnEvywFb5cuvylhe+mbTpelP1Mo6RrBygXH2ZQ8q1A8F7olT1s\ns4ULVo31pFmfWKBNP4MQqh8=\n-----END PRIVATE KEY-----\n",
    client_email:process.env.EMAIL
  }
};

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  
  console.log('db connected')
}


const clientVision = new vision.ImageAnnotatorClient(CONFIG);

main().catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    predictedText: String,
    image:String,
});

const User = mongoose.model('User', userSchema);




// Get route for home
app.get('/', (req, res) => res.send({
  "Status": "Server Running..."
}))

//POST route for text-prediction 
app.post('/predict', async (req, res) => {
  const imageUrl = req.body.imgUrl;

  // Call detectText function with the URL and get the result
  const imgResult = await detectText(imageUrl);

  // Sending the received result from Google Vision for Post-Processing
  const pythonProcess = spawn('python', ['processText.py', imgResult]);

  // Collect the output from the Python script
  pythonProcess.stdout.on('data', (data) => {
    imgresult += data.toString();
  });

  // Return the post processed predicted text as a response
  res.json({
    predictedText: imgResult
  });
});


app.post('/data', async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.predictedText = req.body.predictedText;
  user.image=req.body.image;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
})
app.get('/data',async (req,res)=>{
  const docs = await User.find({});
  res.json(docs)
})

// //text detection
const detectText = async (file_path) => {
  let [result] = await clientVision.textDetection(file_path);
  return result.fullTextAnnotation.text
  
};

// For predicting the image text
// detectText('https://images.squarespace-cdn.com/content/v1/5005cd4be4b046f04f5a1111/1402697534125-1RO053UCAJYF73GH16M2/image-asset.png');  

app.listen(port, () => console.log("Started"))