const express = require("express");
const mongoose = require("mongoose");
const { spawn } = require("child_process");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

const app = express();
const vision = require("@google-cloud/vision");
app.use(cors());
let imgresult;
app.use(bodyParser.json());

const CONFIG = {
  credentials: {
    private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCWtNPF150rcZTx\nSidIsH7/rfjXEXHQIejgmInpFl9qJBgiec7/kg5iw0lPg37g3GKNhgHy7CsVJzfG\nD5Cxk6HH+A01YRVc16inMSRXhie/dgsQbQuFhtOjyorAkjzOlEEWE/tPJ5KNJON9\nmIWu/fzgrh13181l3TyiXU0hHyMu94vqO/ZWaAfrzwiIRrwtl5V2sI34aAfkko0s\nDrbKMYE4L7We5A8sO5CsZdhBgskhLbEFyOpPn8x7TqXO6bREN4DKsHd4WRN8uibw\n82yqzC2pPW89gb4c77ia5W27yX3+5MnMrutwjoa5rpkjk0vbwBXKrvMTscUD/S71\npRmPRAgzAgMBAAECggEAB+Ykb2s0rrE+WENFudaeYXJR55vfdkRAu3zjRZdJmvuX\nVD9ELTsPi/emYQeIX+rNM5PBiGT+gRZUIwpv0A7n3N5QeurCvuIC0fiOahP7A1sB\ni3PbtbzyXNRh32QK0d0NaEXV1zlAwisbzVpwL1LarUATBVQHTP6CjhQL1d+W7YAx\nevSq5apWaUfbz1cXDodX5SRst/wuyQKgHqxfcYuU4wf/pjMntakaq5u1zIAksCZs\n0veveDWBIdN0FZj6LbkeCI4p8wg8LEmWJBxeZsDLjC67qy1F7aDBJ65pMTHVyR6U\nATzXHZWt1W9QYsvFInw+R2iLX8VOxKFcT4FXpsCPUQKBgQDFsbio2hbDntxkSRq7\nJ4rqW0OdZ3o7ByHs50SoqF11EdiBOhsQat9mWAVJCMj17fqvYG4J7ze3D404anS6\n4ZPSmUkj6WvGXoCdX4ArRD6IKKTtgAl5dea7hW5NMiFYUHLa1By/vB8dMHj1Cvqk\nUXnm7qlwTcd0ioqugyyhCzE/KwKBgQDDJ29qOmsMIr7Wr8oe3OF8V7Gp9WYHgNjO\nFJuw1J3VjOXyklXuq9Xq7bmpz97s49HTQsrbnV8dcfjhzLcrtpvyohLZiwmuQyIt\nsvMH7ma4lTgBaVVOpX5ie4ZqIAzVpJSUSRJUqbf4ZUbLqWP4Fa+U6axRfMDpaIUj\nTGnG/FgXGQKBgQC+6b7TSTE8nphlPHfVDv3HDnWAd2KByISJnFkgqt795Er5mNx0\nAVFWK2CHRDWV0ckKPgxmCZ77aMhPF/c8VgWEFkWcqZlLyw1XbNeAcPoWUXHcbY44\nvpQguV1orSWofKA+FSLiQlClxp64vW6I6qnXStlUO7iHIheFKeYaa42WWwKBgCEU\nfTFPh7e96AVyNNu4a0xtfQMnQs1AzP9ZxO5bjAmX4Z6VqZVUcWVqOI+NWedj0rxx\n1PsXGPlfyWVVEzOIt7SQPou7or90R8XhUIrmoWjmemDa3wf+y4acE7PHjQVl6X2d\nSUsqnbGwUSjSpMx3uJSQa5JAiF7IRdEu8bs2KSR5AoGBAJbxU7tJ3OP2obc0rPCZ\nFGg3NX95nRWLpcs5o+fyW6SeL6xiv4KDkp8mSRKIvXqe023kdmZ+V6m32+5K1nMZ\neYNnGgO22JzLsclSiKmIW4f9f1t4lf/zfc1x5JYewJsMU49p6yHcULZ/Tqv5YpuL\np5aRyZf9QjdkzCpTJetX8dhZ\n-----END PRIVATE KEY-----\n",
    client_email: process.env.EMAIL,
  },
};

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("db connected");
}

const clientVision = new vision.ImageAnnotatorClient(CONFIG);

main().catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  predictedText: String,
  image: String,
});

const User = mongoose.model("User", userSchema);

// Get route for home
app.get("/", (req, res) =>
  res.send({
    Status: "Server Running...",
  })
);

//POST route for text-prediction
app.post("/predict", async (req, res) => {
  const imageUrl = req.body.imgUrl;

  // Call detectText function with the URL and get the result
  const imgResult = await detectText(imageUrl);



  // Return the post processed predicted text as a response
  res.json({
    predictedText: imgResult,
  });
});

app.post("/data", async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.predictedText = req.body.predictedText;
  user.image = req.body.image;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});
app.get("/data", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});

// //text detection
const detectText = async (file_path) => {
  let [result] = await clientVision.textDetection(file_path);
  return result.fullTextAnnotation.text;
};

// For predicting the image text
// detectText('https://images.squarespace-cdn.com/content/v1/5005cd4be4b046f04f5a1111/1402697534125-1RO053UCAJYF73GH16M2/image-asset.png');

app.listen(port, () => console.log("Started"));
