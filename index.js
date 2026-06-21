const { fetchActivity } = require("./githubService");

const username = process.argv[2];
const page = process.argv[3] ? parseInt(process.argv[3]) : 1;

if (!username) {
    console.log("Usage: node index.js <username> <page>");
    process.exit(1);
}

async function main() {
    try {
        const events = await fetchActivity(username, page);

        if (!events || events.length === 0) {
            console.log("No activity found for this user/page");
            return;
        }

        console.log(`\nShowing page ${page} of ${username}'s activity:\n`);

        for (let event of events) {
            const type = event.type;
            const repo = event.repo?.name;

            if (type === "PushEvent") {
                console.log(`- Pushed commits to ${repo}`);
            } 
            else if (type === "IssuesEvent") {
                console.log(`- Opened an issue in ${repo}`);
            } 
            else if (type === "WatchEvent") {
                console.log(`- Starred ${repo}`);
            } 
            else if (type === "CreateEvent") {
                console.log(`- Created repository or branch in ${repo}`);
            } 
            else {
                console.log(`- ${type} in ${repo}`);
            }
        }

    } catch (err) {
        console.log("Error fetching GitHub activity");
    }
}

main();