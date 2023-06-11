const express=require('express');
require('dotenv').config()
const cors = require('cors');

const app=express();
const vision = require('@google-cloud/vision');

const port= process.env.PORT||8080;

app.use(cors())

const CONFIG = {
    credentials: {
        private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiqsneBPEna38p\n2YEX/QAnpk7lYO2+kdBqDpSsiA7jFW3tJm661yvCAZbRqXvcAH63AsoeQjs6jz98\nx78QBcH8iHRW8brJ1Q90+rSeyeIKVGE2VK65qiK6G7F+Mrj3puy7kXuW3n9XY7eO\ndQx361vVaOoXfHECGLqyXZ1/YHrzmcwqpu9ifFQ4Tc0AaVtvMpJnr238HT/hLwD1\nq4Nn2IqFAKNpZanTdSI85BGnJkopRpzpnQ6XVCMGomEp7bvElpoz2rwKbKFluuyA\n5Qfy7AyJwOdeXSn5MyQ/JsKdye399s03x6wcctJpWDP/wV+5QVcU2fLVs5qzr/AU\njk+yukqFAgMBAAECggEAEUBouV2vz7z0VxVkvg0Mg6f9LRGLFU90mZLjTKr/XTEM\nH/8X9kPUtbYibyj45Fu/FJy8n9npWywPESZECqh5qtUz9Xacl0Q75+2g00hY6zyI\ntNDlWPaEyVUfjWFGwakX6UqkH1uIiNWgBYE/acZxzl/al9QQTiceQcVw6y3pzETj\nl7r67n/RxxNO6AkYmlDzo1go51ajdTk7RHVFKr2LVku/MIyFf0GdNO7IrN3gOm6m\n/IIBaRMyeAxKrchnzV77lH3Gd/+7w61+SIfIAPbLi/dd6mFtSQ5FrVP/V2W3p21V\nLS1rXDjF7cggJGxAAiN2rhUZm9Kyv3krVv1GAvsL7wKBgQDRu/i32Glh2iR01Raq\nA1Fxi1TYoWjJVF6yPgHJhokSl67bX4m3+azUi+/vMOQAWHpUFkRdDYTEP2/o9vva\nOaKDYMSqwJ4UvLs6/mkzvgHcpijaIJXBPDDA2wTaEiKaPcOa6vqmUqP9viMpXWLO\nNQLSog+CMn2T70ON8q2B0Y44zwKBgQDGjNyQXDWFjUjkPyNzeTEvI//SDaatUvsN\nHOTfnS6cj+3bZrRd/09eCvibD/mUJkCaQUWB0dSw2VPGjlvFAZ2EgseUjAqhh1fo\nPbKiLhJL7Uiu8U2nvWmQbs6pfkNYWXU7c81juQtlLTjDrQSNyEFcMIBh6FoCMZ1S\nRTbTNfm0awKBgCxAwSXpX7Lp2C9elr2gnZqbj3d19yojxydMtgvTezCVGKvo6KIM\n6E6giCur4S/Be24qlJodtBnEWNSK6HEPIB8gV96/bZtqhwbXj1L/kF0CIjSEE5UG\nIjNPAyMQGIT66z7QvbpCTZ/IcprTvXlM7h+LWkJabOy92z8kKT/u+1c5AoGBAIh/\niJbaPZVeBzGbUoTtWWneJt5CskbQGHXwWkx84/GQZWaDWhaREgBGLJl1xxAZqCok\nG2PfXIhkMFr9vYtXy/GwcwLlr91SjZXE7MzgPYXjUCetDsT1y+AWvY76ldPkVFsW\nBqq7KWFaUH79sHbEqGJ3mZs1wMNnVo+bs9BKeCuXAoGBAI9U0mcRWR0OdM1YgosP\nNaXP1qOCZsFucnc4FWAVAe0lE0jtwzzup9xenE9MFD+sQ1ut3I0oGqegbk80p3Ls\njTKMoTO2eesF1UwckEQGsb7XWlxD8MsX+c02r/3/LHtUvEvoPisnflJf/kuS/Rdm\n22XpZs1sGZnc34WrRQy4xFQp\n-----END PRIVATE KEY-----\n",
        client_email: "susmit-mukherjee@spatial-climate-389015.iam.gserviceaccount.com"
    }
};

const client = new vision.ImageAnnotatorClient(CONFIG);



app.get('/',(req,res)=>  res.send({ "Status": "API Working" }))


app.post('/predict', async (req, res) => {
    const imageUrl = req.header('imgUrl');
  
    // Call detectText function with the URL and get the result
    const imgResult = await detectText(imageUrl);

  
    // Return the predicted text as a response
    res.json({ predictedText: imgResult });
  });

// //text detection
const detectText = async (file_path) => {

  let [result] = await client.textDetection(file_path);
  return result.fullTextAnnotation.text
};

// For predicting the image text
// detectText('https://images.squarespace-cdn.com/content/v1/5005cd4be4b046f04f5a1111/1402697534125-1RO053UCAJYF73GH16M2/image-asset.png');  

app.listen(port,()=>console.log("Started"))