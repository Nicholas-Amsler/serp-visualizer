// api/rewrite.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { title, description } = req.body;
  const prompt = `Rewrite as SERP snippet. Title: "${title}". Desc: "${description}".`;
  const res = await fetch('/api/rewrite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    return res.status(500).json({ error: err });
  }

  const data = await openaiRes.json();
  res.status(200).json(data);
}
