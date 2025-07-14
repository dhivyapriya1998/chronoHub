const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')
const {oAuthClient} = require('../../../utils/auth')
const { gmail } = require('googleapis/build/src/apis/gmail')

const TOKEN_PATH = path.join(__dirname, '../../../../token.json')
console.log("the token", TOKEN_PATH);

const emailList = async (request, h) => {
    if (!fs.existsSync(TOKEN_PATH)) {
      return h.response('🔐 Not authenticated. Go to /login').code(401)
    }
  
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH))
    oAuthClient.setCredentials(token)
  
    const gmail = google.gmail({ version: 'v1', auth: oAuthClient })
  
    try {
      const res = await gmail.users.messages.list({ userId: 'me' })
      const emails = []
  
      for (const msg of res.data.messages || []) {
        const id = msg.id
        const detail = await gmail.users.messages.get({ userId: 'me', id })

        console.log("the detail message is : ", detail);

  const payload = detail.data.payload;
  const body = getPlainTextBody(payload);
  
        const subject = detail.data.payload.headers.find((h) => h.name === 'Subject')?.value || '(no subject)'
        const from = detail.data.payload.headers.find((h) => h.name === 'From')?.value || '(unknown)'
  
        emails.push({ subject, from, body, id })
      }
      return h.response(emails).code(200)
    } catch (err) {
      console.error('Fetch email error:', err)
      return h.response('❌ Error fetching emails').code(500)
    }
  }
  function getPlainTextBody(payload) {
    if (payload.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain') {
          const buff = Buffer.from(part.body.data, 'base64');
          return buff.toString('utf-8');
        }
      }
    }
  
    // If not multipart, check main body
    if (payload.body?.data) {
      return Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }
  
    return '(No plain text body found)';
  }

  async function getEmailById( messageId ){

    const res = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full',
    })

    const message = res.data
    const headers = message.payload.headers
    return{
        subject: headers.find( h => h.name === 'Subject')?.value || '',
        from: headers.find(h => h.name === 'From')?.value || '',
        date: headers.find(h => h.name === 'Date')?.value || '',
        body: getPlainTextBody(message.payload)
    }

  }
  
  module.exports ={
    emailList,
    getEmailById
  }