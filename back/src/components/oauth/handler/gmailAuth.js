// src/components/oauth/handler.js
const fs = require('fs')
const path = require('path')
const { generateEmailContent } = require('../../ai/handler/generateAiMail')
const TOKEN_PATH = path.join(__dirname, '../.././../../token.json')
const { oAuthClient } = require('../../../utils/auth') 
const { log } = require('console')
console.log("vannakak", TOKEN_PATH);
const loginHandler = (request, h) => {
  const authUrl = oAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'profile',
      'email',
    ],
  })
  console.log("teh auy", authUrl);
  return h.redirect(authUrl)
}

const callbackHandler = async (request, h) => {
  const code = request.query.code
  if (!code) return h.response('No code provided').code(400)

  try {
    const { tokens } = await oAuthClient.getToken(code)
    oAuthClient.setCredentials(tokens)
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens))
    return h.redirect('/emails')
    } catch (err) {
    console.error('Token exchange error:', err)
    return h.response('❌ Authentication failed').code(500)
  }
}


const testEmailGeneartion = async (prompt, email) => {

const response = await generateEmailContent(prompt, email)
console.log("The response was the", response);


}


module.exports = {
  loginHandler,
  callbackHandler,
}
