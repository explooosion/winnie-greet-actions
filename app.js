require('dotenv').config()
const fs = require('fs')
const TradOrSimp = require('traditional-or-simplified')

const { getRandomImage } = require('./utils')

//require octokit rest.js 
//more info at https://github.com/octokit/rest.js
const octokit = require('@octokit/rest')()

//set octokit auth to action's ACCESS_TOKEN env variable
octokit.authenticate({
  type: 'app',
  token: process.env.ACCESS_TOKEN
})

//set eventOwner and eventRepo based on action's env variables
const eventOwnerAndRepo = process.env.GITHUB_REPOSITORY
const slicePos1 = eventOwnerAndRepo.indexOf('/');
const eventOwner = eventOwnerAndRepo.slice(0, slicePos1);
const eventRepo = eventOwnerAndRepo.slice(slicePos1 + 1, eventOwnerAndRepo.length);

async function commentOnNewIssue() {

  //read contents of action's event.json
  const eventData = await fs.readFileSync('..' + process.env.GITHUB_EVENT_PATH, 'utf8')
  console.log('event data', eventData)
  const eventJSON = JSON.parse(eventData)

  //set eventAction and eventIssueNumber
  eventAction = eventJSON.action
  eventIssueNumber = eventJSON.issue.number
  eventIssueTitle = eventJSON.issue.title

  console.log('event action: ' + eventAction)

  //if a new issue was opened 
  if (eventAction === 'opened' && TradOrSimp.isSimplified(eventIssueTitle)) {
    console.log('creating welcome comment on issue')

    //add a comment to the new issue
    await octokit.issues.createComment({
      owner: eventOwner,
      repo: eventRepo,
      number: eventIssueNumber,
      body: `![img](${getRandomImage()})`,
    }).then(({ data, headers, status }) => {
      // handle data
      console.log('break 1')
    })
  }

}

//run the function
commentOnNewIssue()

module.exports.commentOnNewIssue = commentOnNewIssue