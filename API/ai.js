export default async function handler(req, res) {
  const msg = req.query.msg || "merhaba";

  // OpenAI API çağrısı
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: msg }
      ]
    })
  });

  const data = await response.json();

  const answer = data?.choices?.[0]?.message?.content || "Hata oluştu.";

  res.status(200).send(answer);
}
