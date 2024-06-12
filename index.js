import express from "express";

const app = express();

const port = 8082;
const FB_VERIFY_TOKEN = "krisna123*";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Success",
  });
});

app.post("/upload", (req, res) => {
  const data = req.body;

  res.json({
    message: "Success",
    data,
  });
});

app.get("/facebook/webhook", (req, res) => {
  console.log("FACEBOOK WEBHOOK VERIFICATION REQUEST");
  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == FB_VERIFY_TOKEN
  ) {
    console.log("return : ", req.query["hub.challenge"]);
    return res.send(req.query["hub.challenge"]);
  }
  console.log("return 400");
  return res.sendStatus(400);
});

app.post("/facebook/webhook", (req, res) => {
  console.log(`\u{1F7EA} Received FB webhook:`);
  const webhookData = req.body;
  console.log(`\u{1F7EA} Body:`);
  console.log(webhookData);

  return res.json({
    message: "Success",
    webhookData,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
