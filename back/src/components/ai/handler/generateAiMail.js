
const {GoogleGenerativeAI} = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)


/**
 * Generate a formal email reply based on original email and a user prompt.
 * 
 * @param {string} prompt - Instructions to the model (e.g., what kind of reply).
 * @param {string} email - The original email content you're replying to.
 * @returns {{ subject: string, body: string }}
 */
 const generateEmailContent = async (prompt, email) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const instruction = `
You're an AI email assistant.

📩 Original Email:
${email}

✍️ Instruction for Reply:
${prompt}

🧾 Now, write a formal email reply. Your response must be ONLY valid JSON with:
- "subject": string (short subject line)
- "body": string (the main email message)
`

  const result = await model.generateContent(instruction)
  const text = await result.response.text()

  try {
    // Remove any surrounding code block formatting like ```json
    const jsonClean = text.replace(/```(json)?/g, '').trim()
    const parsed = JSON.parse(jsonClean)

    if (!parsed.subject || !parsed.body) {
      throw new Error('Missing subject or body in AI response')
    }

    return parsed
  } catch (err) {
    console.error('❌ AI response could not be parsed as valid JSON:\n', err)
    throw new Error('Invalid AI response format.')
  }
}

module.exports = {
  generateEmailContent
}