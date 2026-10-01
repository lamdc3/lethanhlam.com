(function () {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav-toggle");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            const open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
        nav.querySelectorAll(".nav-links a").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const phrases = [
        "Software Engineer",
        "Xây trải nghiệm web sống động",
        "Thiết kế có nhịp, mã có cấu trúc"
    ];
    const typed = document.getElementById("typed");
    if (typed) {
        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function tick() {
            const current = phrases[phraseIndex];
            typed.textContent = current.slice(0, charIndex);

            if (!deleting && charIndex < current.length) {
                charIndex += 1;
                setTimeout(tick, 56);
                return;
            }
            if (!deleting && charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1400);
                return;
            }
            if (deleting && charIndex > 0) {
                charIndex -= 1;
                setTimeout(tick, 28);
                return;
            }
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(tick, 280);
        }
        tick();
    }

    const form = document.getElementById("contact-form");
    const note = document.getElementById("form-note");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const data = new FormData(form);
            const name = String(data.get("name") || "").trim();
            const email = String(data.get("email") || "").trim();
            const message = String(data.get("message") || "").trim();
            const subject = encodeURIComponent("Liên hệ từ trang lethanhlam.com");
            const body = encodeURIComponent("Tên: " + name + "\nEmail: " + email + "\n\n" + message);
            window.location.href = "mailto:hello@lethanhlam.com?subject=" + subject + "&body=" + body;
            if (note) note.hidden = false;
        });
    }

    const canvas = document.getElementById("stars");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const stars = [];
    const COUNT = 90;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function spawn() {
        stars.length = 0;
        for (let i = 0; i < COUNT; i += 1) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.6 + 0.2,
                a: Math.random(),
                s: Math.random() * 0.02 + 0.004
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(function (star) {
            star.a += star.s;
            const alpha = 0.25 + Math.abs(Math.sin(star.a)) * 0.75;
            ctx.beginPath();
            ctx.fillStyle = "rgba(232, 240, 255," + alpha + ")";
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    resize();
    spawn();
    draw();
    window.addEventListener("resize", function () {
        resize();
        spawn();
    });
})();
