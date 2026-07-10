const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = fs.readFileSync(
  path.join(__dirname, "../prompts/futureforge-roadmap-prompt.md"),
  "utf8"
);

const generateCareerAdvice = async (userProfile) => {
  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 4000,

    system: systemPrompt,

    messages: [
      {
        role: "user",
        content: JSON.stringify(userProfile, null, 2),
      },
    ],
  });

 console.log(JSON.stringify(response, null, 2));
const text = response.content.find(item => item.type === "text").text;

const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(cleaned);
};

module.exports = {
  generateCareerAdvice,
};