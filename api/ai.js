import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  const msg = req.query.msg || "Merhaba";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: msg }]
      })
    });

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content || "Hata oluştu";

    res.send(text);

  } catch (err) {
    res.status(500).send("Sunucu hatası");
  }
});

export default serverless(app);
