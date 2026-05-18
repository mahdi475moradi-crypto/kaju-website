const API = "https://pastefy.app/GZKMoi3U/raw";

function animateValue(element, start, end, duration = 1200) {

    let startTimestamp = null;

    const step = (timestamp) => {

        if (!startTimestamp) startTimestamp = timestamp;

        const progress = Math.min(
            (timestamp - startTimestamp) / duration,
            1
        );

        const value = Math.floor(
            progress * (end - start) + start
        );

        element.innerText = value.toLocaleString();

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

async function loadStats() {

    try {

        const res = await fetch(
            API + "?t=" + Date.now()
        );

        const data = await res.json();

        const servers = parseInt(data.servers) || 0;
        const users = parseInt(data.users) || 0;
        const ping = parseInt(data.ping) || 0;

        const serversEl =
            document.getElementById("servers");

        const usersEl =
            document.getElementById("users");

        const pingEl =
            document.getElementById("ping");

        const serversMain =
            document.getElementById("servers-main");

        const usersMain =
            document.getElementById("users-main");

        animateValue(
            serversEl,
            parseInt(serversEl.innerText.replace(/,/g, "")) || 0,
            servers
        );

        animateValue(
            usersEl,
            parseInt(usersEl.innerText.replace(/,/g, "")) || 0,
            users
        );

        animateValue(
            serversMain,
            parseInt(serversMain.innerText.replace(/,/g, "")) || 0,
            servers
        );

        animateValue(
            usersMain,
            parseInt(usersMain.innerText.replace(/,/g, "")) || 0,
            users
        );

        pingEl.innerText = ping + "ms";

        document.getElementById("uptime")
            .innerText = data.uptime;

        const status =
            document.getElementById("status");

        status.innerText = data.status;

        if(data.status === "ONLINE"){
            status.classList.add("online");
            status.classList.remove("offline");
        }else{
            status.classList.add("offline");
            status.classList.remove("online");
        }

        document.getElementById("hero-status")
            .innerText = data.website.hero_status;

        document.getElementById("ai-status")
            .innerText = data.website.ai_status;

    } catch (err) {

        console.log(err);

        const status =
            document.getElementById("status");

        status.innerText = "OFFLINE";
        status.classList.add("offline");
    }
}

loadStats();

setInterval(loadStats, 15000);

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".reveal"
).forEach((el) => observer.observe(el));

const glow = document.querySelector(
    ".cursor-glow"
);

window.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    document.querySelectorAll(
        ".command-card"
    ).forEach((card) => {

        card.style.display =
            card.innerText.toLowerCase().includes(value)
            ? "block"
            : "none";

    });

});
