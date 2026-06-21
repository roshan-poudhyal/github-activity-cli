const https = require("https");

function fetchActivity(username, page = 1) {
    const url = `https://api.github.com/users/${username}/events?page=${page}&per_page=30`;

    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                "User-Agent": "node.js"
            }
        }, (res) => {

            let data = "";

            res.on("data", chunk => {
                data += chunk;
            });

            res.on("end", () => {
                try {
                    const events = JSON.parse(data);
                    resolve(events);
                } catch (err) {
                    reject(err);
                }
            });

        }).on("error", err => {
            reject(err);
        });
    });
}

module.exports = { fetchActivity };