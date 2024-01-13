const axios = require("axios")
const google = require("googleapis")
const gmailpostmastertools =
  google.gmailpostmastertools_v1beta1.Gmailpostmastertools

const webhookUrl = "YOUR_SLACK_WEBHOOK_URL"
const sendToSlack = async (message) =>
  axios.post(webhookUrl, { text: message, mrkdwn: true })

const auth = new google.Auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/postmaster.readonly"],
  // keyFile: "./postmastertools-credentials.json",
})
const domain = "YOUR_DOMAIN"

exports.reportPostmasterTools = async (_req, res) => {
  const dt = new Date()
  dt.setDate(dt.getDate() - 3)
  const reportDate = dt.toISOString().slice(0, 10).replaceAll("-", "")

  try {
    const tools = new gmailpostmastertools({ auth })
    const response = await tools.domains.trafficStats.get({
      name: `domains/${domain}/trafficStats/${reportDate}`,
    })
    delete response.data.ipReputations
    console.log(JSON.stringify(response.data, null, "  "))

    const message = "```" + JSON.stringify(response.data, null, "  ") + "```"
    await sendToSlack(message)
  } catch (error) {
    console.log("Error:", error)
    await sendToSlack("```" + `Error has occurred. ${error}` + "```")
  }

  res.send("OK")
}
