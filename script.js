const API = "https://pastefy.app/GZKMoi3U/raw";

async function loadStats() {

    try {

        const res = await fetch(API);
        const data = await res.json();

        document.getElementById("servers").innerText =
            data.servers || "0";

        document.getElementById("users").innerText =
            data.users || "0";

        document.getElementById("online").innerText =
            data.status || "ONLINE";

    } catch (err) {

        document.getElementById("online").innerText =
            "OFFLINE";

        console.log(err);
    }
}

loadStats();

setInterval(loadStats, 10000);