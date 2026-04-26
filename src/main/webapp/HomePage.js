document.addEventListener("DOMContentLoaded", function () {

    let categoryImages = document.querySelectorAll(".category-img");

    categoryImages.forEach(function (img) {

        img.addEventListener("click", function () {

            let selected = this.dataset.genre;

            // redirects with query parameter
            window.location.href = "findabook.html?genre=" + encodeURIComponent(selected);

        });
    });
});