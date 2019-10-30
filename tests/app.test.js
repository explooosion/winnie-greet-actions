
const app = require('../app')

jest.setTimeout(10000);

describe('commentOnNewIssue', () => {
    afterEach(() => {
        jest.resetAllMocks()
    });

    it('should add one comment when a new issue is created', async () => {

        let octokit = {
            issues: {
                createComment: jest.fn().mockResolvedValue({ something: 'something' })
            }
        }

        await app.commentOnNewIssue()
        await octokit.issues.createComment()

        expect(octokit.issues.createComment).toHaveBeenCalledTimes(1)
    })
})
