document.addEventListener("DOMContentLoaded", function () {

    const topBtn = document.getElementById("topBtn");
    if (topBtn) {
        topBtn.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }

    const button = document.getElementById("submit");
    const rate = document.getElementById("rating");
    const box = document.getElementById("blog");
    const box2 = document.getElementById("name");
    const counter = document.getElementById("count");

    if (!button) return;

    button.onclick = function (e) {
        e.preventDefault();
        alert("Blog Submitted! Submit another one!");

        box.value = "";
        box.style.boxShadow = "none";
        box2.value = "";
        box2.style.boxShadow = "none";
        rate.value = 0;
        stars.textContent = "";
        stars.classList.remove("five-star-glow");
        count.textContent = 0;
    };

    document.querySelectorAll(".submit").forEach(function (submitBtn) {
        submitBtn.onmouseover = function () {
            submitBtn.style.background = "#3E2C23";
        }
        submitBtn.onmouseout = function () {
            submitBtn.style.background = "";
        }
    });

    box.addEventListener("focus", function () {
        box.style.boxShadow = "0 0 10px #3E2C23";
    });
    box.addEventListener("blur", function () {
        box.style.boxShadow = "none";
    });

    box2.addEventListener("focus", function () {
        box2.style.boxShadow = "0 0 10px #3E2C23";
    });
    box2.addEventListener("blur", function () {
        box2.style.boxShadow = "none";
    });

    const stars = document.getElementById("stars");

    const count = document.getElementById("count");

    box.addEventListener("input", function () {
        count.textContent = box.value.length;
    });

    rate.addEventListener("input", function () {
        let rating = rate.value;
        stars.textContent = "★".repeat(rating) + "☆".repeat(5 - rating);

        if (rating == 5) {
            stars.classList.add("five-star-glow");
        }
        else {
            stars.classList.remove("five-star-glow");
        }
    });


    // User clicks About button
    function backToAbout() {
        window.location.href = 'HomePage.html#About';
    }


});