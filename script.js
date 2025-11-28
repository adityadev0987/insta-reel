// --------------------- DATA ---------------------
const reels = [
    {
        username: "aditya_malhotra",
        name: "Aditya Malhotra",
        profile: "https://i.pinimg.com/736x/c1/9f/77/c19f7770d9bccb3825c68e9cb7ed5b5c.jpg",
        isLiked: true,
        isFollow: true,
        isMuted: true,   // default TRUE
        likeCount: Math.floor(Math.random() * 50000),
        commentCount: Math.floor(Math.random() * 500),
        shareCount: Math.floor(Math.random() * 10000),
        caption: "Life hits different when you follow your passion.",
        video: "./reels/video1.mp4"
    },
    {
        username: "riya_sharma_07",
        name: "Riya Sharma",
        profile: "https://i.pinimg.com/736x/8c/13/69/8c136989cacfdc4f8584fa725acbb17c.jpg",
        isLiked: false,
        isFollow: false,
        isMuted: true,
        likeCount: Math.floor(Math.random() * 50000),
        commentCount: Math.floor(Math.random() * 500),
        shareCount: Math.floor(Math.random() * 10000),
        caption: "Small moments, big memories.",
        video: "./reels/video2.mp4"
    },
    {
        username: "tanya_singh_official",
        name: "Tanya Singh",
        profile: "https://i.pinimg.com/736x/bb/83/29/bb832982c41487756de6dba20f57b990.jpg",
        isLiked: false,
        isFollow: true,
        isMuted: true,
        likeCount: Math.floor(Math.random() * 50000),
        commentCount: Math.floor(Math.random() * 500),
        shareCount: Math.floor(Math.random() * 10000),
        caption: "Consistency always wins.",
        video: "./reels/video3.mp4"
    },
    {
        username: "khushi_kapoor_21",
        name: "Khushi Kapoor",
        profile: "https://i.pinimg.com/736x/b1/c3/f7/b1c3f71aedb511581243dc027ffe18f7.jpg",
        isLiked: true,
        isFollow: false,
        isMuted: true,
        likeCount: Math.floor(Math.random() * 50000),
        commentCount: Math.floor(Math.random() * 500),
        shareCount: Math.floor(Math.random() * 10000),
        caption: "Be real, be you.",
        video: "./reels/video4.mp4"
    },
    {
        username: "vivek_pandey_90",
        name: "Vivek Pandey",
        profile: "https://i.pinimg.com/1200x/5a/2e/be/5a2ebe10601e68d0cbb09dac3bdf7cfb.jpg",
        isLiked: true,
        isFollow: true,
        isMuted: true,
        likeCount: Math.floor(Math.random() * 50000),
        commentCount: Math.floor(Math.random() * 500),
        shareCount: Math.floor(Math.random() * 10000),
        caption: "Work hard. Stay humble.",
        video: "./reels/video3.mp4"
    }
];

const main = document.querySelector("main");

// --------------------- OBSERVER STATE ---------------------
let reelObserver = null;
let activeReelIndex = null;

// --------------------- RENDER ---------------------
function playReel() {
    let sum = "";

    reels.forEach((elem, idx) => {
        const heartClass = elem.isLiked ? "ri-heart-3-fill" : "ri-heart-3-line";
        const soundClass = elem.isMuted ? "ri-volume-mute-fill" : "ri-volume-up-fill";
        const mutedAttr = elem.isMuted ? "muted" : "";

        sum += `
        <section class="reel-main">
            <video class="video" src="${elem.video}" autoplay loop ${mutedAttr} id="video-${idx}"></video>

            <div class="mute" id="${idx}v">
                <i class="${soundClass}"></i>
            </div>

            <div class="dheart">
                <i class="ri-heart-3-fill"></i>
            </div>

            <div class="profile">
                <div class="left">
                    <img src="${elem.profile}" class="photo">
                    <h4>${elem.username}</h4>
                    <button id="${idx}f" class="button">
                        ${elem.isFollow ? "Unfollow" : "Follow"}
                    </button>
                </div>
                <p>${elem.caption}</p>
            </div>

            <div class="side">
                <div class="side-part">
                    <i class="${heartClass}" id="${idx}"></i>
                    <h5>${elem.likeCount}</h5>
                </div>
                <div class="side-part">
                    <i class="ri-chat-3-line" id="${idx}c"></i>
                    <h5>${elem.commentCount}</h5>
                </div>
                <div class="side-part">
                    <i class="ri-send-plane-line" id="${idx}s"></i>
                    <h5>${elem.shareCount}</h5>
                </div>
            </div>
        </section>`;
    });

    main.innerHTML = sum;
    initReelObserver();
}

playReel();

// --------------------- INTERSECTION OBSERVER ---------------------
function initReelObserver() {
    if (reelObserver) reelObserver.disconnect();

    reelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id; // "video-0"
            const idx = parseInt(id.split("-")[1]);

            if (entry.intersectionRatio >= 0.6) {
                if (activeReelIndex !== null && activeReelIndex !== idx) {
                    const old = document.querySelector(`#video-${activeReelIndex}`);
                    if (old) old.muted = true;
                }

                const vid = document.querySelector(`#video-${idx}`);
                activeReelIndex = idx;

                vid.play().catch(() => {});
                vid.muted = reels[idx].isMuted;
            } else {
                const vid = document.querySelector(`#video-${idx}`);
                if (vid) vid.muted = true;
            }
        });
    }, { threshold: [0.6] });

    document.querySelectorAll("video").forEach(v => reelObserver.observe(v));
}

// --------------------- CLICK HANDLER ---------------------
main.addEventListener("click", (e) => {
    const icon = e.target.closest("i");
    const btn = e.target.closest("button");
    let id = icon ? icon.id : e.target.id;

    // MUTE
    const muteBox = e.target.closest(".mute");
    if (muteBox && muteBox.id.endsWith("v")) {
        const idx = parseInt(muteBox.id);
        reels[idx].isMuted = !reels[idx].isMuted;

        const video = document.querySelector(`#video-${idx}`);
        if (video) video.muted = reels[idx].isMuted;

        playReel();
        return;
    }

    // FOLLOW
    if (btn && btn.id.endsWith("f")) {
        const idx = parseInt(btn.id);
        reels[idx].isFollow = !reels[idx].isFollow;
        playReel();
        return;
    }

    // COMMENT
    if (id && id.endsWith("c")) {
        const idx = parseInt(id);
        reels[idx].commentCount++;
        playReel();
        return;
    }

    // SHARE
    if (id && id.endsWith("s")) {
        const idx = parseInt(id);
        reels[idx].shareCount++;
        playReel();
        return;
    }

    // LIKE
    if (id && !isNaN(id)) {
        const idx = Number(id);
        reels[idx].isLiked = !reels[idx].isLiked;
        reels[idx].likeCount += reels[idx].isLiked ? 1 : -1;
        playReel();
        return;
    }
});

// --------------------- DOUBLE TAP HEART ---------------------
main.addEventListener("dblclick", (e) => {
    const sec = e.target.closest(".reel-main");
    if (!sec) return;

    const d = sec.querySelector(".dheart");
    if (!d) return;

    d.style.opacity = 1;
    d.style.transform = "translate(-50%, -50%) scale(1)";

    setTimeout(() => {
        d.style.opacity = 0;
        d.style.transform = "translate(-50%, -50%) scale(0)";
    }, 800);
});
