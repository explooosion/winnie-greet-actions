require('dotenv').config()

const fs = require('fs')
const TradOrSimp = require('traditional-or-simplified')
const octokit = require('@octokit/rest')()
const { getRandomImage, getEventPath } = require('./utils')

octokit.authenticate({
  type: 'app',
  token: process.env.ACCESS_TOKEN
})

const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY
const OWNER = GITHUB_REPOSITORY.split('/')[0];
const REPOSITORY = GITHUB_REPOSITORY.split('/')[1];

async function commentOnNewIssue() {

  // https://help.github.com/en/github/automating-your-workflow-with-github-actions/virtual-environments-for-github-actions#default-environment-variables
  const eventPayload = await JSON.parse(fs.readFileSync(getEventPath(), 'utf8'))
  console.log('event data', eventPayload)

  // set eventAction and eventIssueNumber
  eventAction = eventPayload.action
  eventIssueNumber = process.env.NODE_ENV === 'test' ? process.env.TEST_ISSUE_ID : eventPayload.issue.number
  eventIssueTitle = eventPayload.issue.title
  eventIssueBody = eventPayload.issue.body

  console.log('event action: ' + eventAction)

  //if a new issue was opened 
  if (
    eventAction === 'opened' &&
    TradOrSimp.isSimplified(eventIssueTitle) || TradOrSimp.isSimplified(eventIssueBody)
  ) {
    console.log('creating welcome comment on issue')

    //add a comment to the new issue
    await octokit.issues.createComment({
      owner: OWNER,
      repo: REPOSITORY,
      number: eventIssueNumber,
      body: `![img](${getRandomImage()})`,
    }).then(({ data, headers, status }) => {
      // handle data
      console.log('BOT has send message.')
    })
  }

}

//run the function
if (process.env.NODE_ENV !== 'test')
  commentOnNewIssue()

module.exports.commentOnNewIssue = commentOnNewIssue