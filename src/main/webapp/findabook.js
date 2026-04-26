


// Swiper is an external library. W

if (document.querySelector('.bookSwiper')) {
    let bookSwiper = new Swiper('.bookSwiper', {
        effect: 'coverflow',        // this one is to give the 3D flip effect
        grabCursor: true,           
        centeredSlides: true,       // keeps the active slide in the center
        slidesPerView: 3,           // shows 3 slides at a time
        loop: true,                 // loops back to first one

        autoplay: {
            delay: 2500,                    // moves to next slide every 2.5 seconds
            disableOnInteraction: false,    // keeps autoplaying even if user clicks
        },

        coverflowEffect: {
            rotate: 30,         // how much each side slide rotates
            stretch: 0,         // extra space between slides
            depth: 100,         // how far back the side slides appear
            modifier: 1,        // multiplier for the effect
            slideShadows: false // no shadow under slides
        }
    });
}



// TRENDING NOW SLIDER

let tnTrack = document.getElementById('tnTrack');
let tnPrevButton = document.getElementById('Prev1');
let tnNextButton = document.getElementById('Next1');
let tnOverflow = document.querySelector('.tn-overflow');

if (tnTrack && tnPrevButton && tnNextButton) {
    let tnCurrentIndex = 0;
    let tnVisibleCards = 5;
    let tnTotalCards = tnTrack.children.length;
    let tnMaxIndex = tnTotalCards - tnVisibleCards;

    // Moves the slider to the given index position
    function moveTnSlider(index) {
        // Width of one card + its gap
        let oneCardWidth = tnTrack.children[0].offsetWidth + 12;
        // Shift the track left by (index × card width)
        tnTrack.style.transform = 'translateX(-' + (index * oneCardWidth) + 'px)';
    }

    // nxt button clicked 
    function tnNextClicked() {
        if (tnCurrentIndex < tnMaxIndex) {
            tnCurrentIndex = tnCurrentIndex + 1;
            moveTnSlider(tnCurrentIndex);
        }
    }

    // prv button clicked
    function tnPrevClicked() {
        if (tnCurrentIndex > 0) {
            tnCurrentIndex = tnCurrentIndex - 1;
            moveTnSlider(tnCurrentIndex);
        }
    }

    tnNextButton.addEventListener('click', tnNextClicked);
    tnPrevButton.addEventListener('click', tnPrevClicked);


    // Mouse wheel — scroll horizontally instead of vertically
    if (tnOverflow) {
        tnOverflow.addEventListener('wheel', function (e) {
            e.preventDefault(); tnOverflow.scrollLeft += e.deltaX || e.deltaY;

        });
    }
}

// Discover books buttons

let mvTrackDiscover = document.getElementById('mvTrackDiscover');
let PrevDiscoverButton = document.getElementById('PrevDiscover');
let NextDiscoverButton = document.getElementById('NextDiscover');
let dbOverflow = document.getElementById('db-overflow');

if (mvTrackDiscover && PrevDiscoverButton && NextDiscoverButton && dbOverflow) {
    let dbCurrentIndex = 0;
    let dbTotalCards = mvTrackDiscover.children.length; // total cards = 4
    let containerWidth = dbOverflow.offsetWidth;
    let cardWidth = mvTrackDiscover.children[0].offsetWidth + 12;
    let dbVisibleCards = Math.floor(containerWidth / cardWidth); // there are onlt 4 cards
    let dbMaxIndex = Math.max(0, dbTotalCards - dbVisibleCards);

    window.addEventListener('resize', function () {
        containerWidth = document.getElementById('db-overflow').offsetWidth;
        cardWidth = mvTrackDiscover.children[0].offsetWidth + 12;

        dbVisibleCards = Math.floor(containerWidth / cardWidth);
        dbMaxIndex = Math.max(0, dbTotalCards - dbVisibleCards);
        dbCurrentIndex = Math.min(dbCurrentIndex, dbMaxIndex);
        moveDbSlider(dbCurrentIndex);
    });


    function moveDbSlider(index) {
        if (index > dbMaxIndex) index = dbMaxIndex;
        if (index < 0) index = 0;

        dbCurrentIndex = index;

        let cardWidth = mvTrackDiscover.children[0].offsetWidth + 12;
        mvTrackDiscover.style.transform =
            'translateX(-' + (index * cardWidth) + 'px)';
    }

    function dbNextClicked() {
        if (dbCurrentIndex < dbMaxIndex) {
            dbCurrentIndex = dbCurrentIndex + 1;
            moveDbSlider(dbCurrentIndex);
        }
    }

    function dbPrevClicked() {
        if (dbCurrentIndex > 0) {
            dbCurrentIndex = dbCurrentIndex - 1;
            moveDbSlider(dbCurrentIndex);
        }
    }

    NextDiscoverButton.addEventListener('click', dbNextClicked);
    PrevDiscoverButton.addEventListener('click', dbPrevClicked);

    if (dbOverflow) {
        dbOverflow.addEventListener('wheel', function (e) {
            e.preventDefault(); dbOverflow.scrollLeft += e.deltaX || e.deltaY;
        });
    }

}



// SECTION 3: MOST VIEWED SLIDER

let mvTrack = document.getElementById('mvTrack');
let mvPrevButton = document.getElementById('Prev');
let mvNextButton = document.getElementById('Next');
let mvOverflow = document.querySelector('.mv-overflow');

if (mvTrack && mvPrevButton && mvNextButton) {
    let mvCurrentIndex = 0;
    let mvVisibleCards = 5;
    let mvTotalCards = mvTrack.children.length;
    let mvMaxIndex = mvTotalCards - mvVisibleCards;

    function moveMvSlider(index) {
        let oneCardWidth = mvTrack.children[0].offsetWidth + 12;
        mvTrack.style.transform = 'translateX(-' + (index * oneCardWidth) + 'px)';
    }

    function mvNextClicked() {
        if (mvCurrentIndex < mvMaxIndex) {
            mvCurrentIndex = mvCurrentIndex + 1;
            moveMvSlider(mvCurrentIndex);
        }
    }

    function mvPrevClicked() {
        if (mvCurrentIndex > 0) {
            mvCurrentIndex = mvCurrentIndex - 1;
            moveMvSlider(mvCurrentIndex);
        }
    }

    mvNextButton.addEventListener('click', mvNextClicked);
    mvPrevButton.addEventListener('click', mvPrevClicked);

    if (mvOverflow) {
        mvOverflow.addEventListener('wheel', function (e) {
            e.preventDefault(); mvOverflow.scrollLeft += e.deltaX || e.deltaY;
        });
    }

}

// FILTER SIDEBAR
if (document.getElementById('filterSidebar')) {
    let filterSidebar = document.getElementById('filterSidebar');
    let filterOverlay = document.getElementById('filterOverlay');
    let filterToggleBtn = document.getElementById('filterToggleBtn');
    let filterCloseBtn = document.getElementById('filterCloseBtn');
    let filterResetBtn = document.getElementById('filterResetBtn');
    let filterClearBtn = document.getElementById('filterClearBtn');
    let filterApplyBtn = document.getElementById('filterApplyBtn');
    let activeTagsContainer = document.getElementById('filterActiveTags');
    let pageContent = document.getElementById('mainContent');

    // Open the sidebar
    function openSidebar() {
        filterSidebar.classList.add('open');
        filterOverlay.classList.add('active');
        filterToggleBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; 

        if (window.innerWidth > 768) {
            pageContent.classList.add('shifted');
        }
    }

    // Close the sidebar
    function closeSidebar() {
        filterSidebar.classList.remove('open');
        filterOverlay.classList.remove('active');
        filterToggleBtn.classList.remove('active');
        pageContent.classList.remove('shifted');
        document.body.style.overflow = ''; // restore scrolling
    }

    function toggleSidebar() {
        if (filterSidebar.classList.contains('open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    filterToggleBtn.addEventListener('click', toggleSidebar);
    filterCloseBtn.addEventListener('click', closeSidebar);
    filterOverlay.addEventListener('click', closeSidebar);

    document.addEventListener("DOMContentLoaded", function () {
        function applyGenreFromURL() {

            let params = new URLSearchParams(window.location.search);
            let genreFromURL = params.get("genre");

            if (genreFromURL) {

                // find matching checkbox
                let checkbox = document.querySelector(
                    'input[data-filter="genre"][value="' + genreFromURL + '"]'
                );

                if (checkbox) {
                    checkbox.checked = true;
                    applyFiltersAndDisplay();
                }
            }
        }
        applyGenreFromURL();

    });


    // Close sidebar when Escape key is pressed
    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    }
    document.addEventListener('keydown', handleEscapeKey);


    let groupToggleButtons = document.querySelectorAll('.filter-group-toggle');

    function setupGroupToggles() {
        for (let i = 0; i < groupToggleButtons.length; i++) {

            groupToggleButtons[i].addEventListener('click', function () {
                // This tells us which list div to open/close
                let targetId = this.dataset.target;
                let targetList = document.getElementById(targetId);

                if (targetList.classList.contains('open')) {
                    targetList.classList.remove('open');
                    this.classList.add('collapsed');    
                } else {
                    targetList.classList.add('open');
                    this.classList.remove('collapsed');
                }
            });

        }
    }

    setupGroupToggles();


    // BOOKS DATA

    let allBooks = [
        {
            title: "In Her Own League",
            img: "Img/tn1.jpg",
            genre: ["Romance"],
            rating: 4.4,
            year: 2026
        },
        {
            title: "Dear Debbie",
            img: "Img/tn2.jpg",
            genre: ["Thriller", "Fiction", "Mystery"],
            rating: 4.5,
            year: 2026
        },
        {
            title: "My Husband's Wife",
            img: "Img/tn3.jpg",
            genre: ["Fiction"],
            rating: 4.2,
            year: 2026
        },
        {
            title: "Now I Surrender",
            img: "Img/tn4.jpg",
            genre: ["Fiction"],
            rating: 4.2,
            year: 2026
        },
        {
            title: "Eleanore of Avignon",
            img: "Img/tn5.jpg",
            genre: ["Fiction"],
            rating: 4.3,
            year: 2026
        },
        {
            title: "Vigil",
            img: "Img/tn6.jpg",
            genre: ["Fiction", "Fantasy"],
            rating: 3.5,
            year: 2026
        },
        {
            title: "One & Only",
            img: "Img/tn7.jpg",
            genre: ["Romance", "Fantasy", "Fiction"],
            rating: 4.0,
            year: 2026
        },
        {
            title: "The House on Mango Street",
            img: "Img/tn8.jpg",
            genre: ["Fiction", "Self-Help"],
            rating: 3.6,
            year: 2026
        }
        ,
        {
            title: "The Silent Patient",
            img: "Img/cd1.jpg",
            genre: ["Fiction", "Mystery", "Thriller"],
            rating: 4.1,
            year: 2019
        }
        ,
        {
            title: "Can You Keep a Secret",
            img: "Img/cd2.jpg",
            genre: ["Fiction", "Romance"],
            rating: 3.8,
            year: 2003
        }
        ,
        {
            title: "Recursion",
            img: "Img/cd3.jpg",
            genre: ["Fiction", "Thriller", "Mystery"],
            rating: 4.1,
            year: 2019
        }
        ,
        {
            title: "The Song of Achilles",
            img: "Img/cd4.jpg",
            genre: ["Thriller", "Fiction", "Mystery"],
            rating: 4.3,
            year: 2011
        },
        {
            title: "Bluff",
            img: "Img/cd5.jpg",
            genre: ["Thriller", "Fiction", "Mystery"],
            rating: 4.2,
            year: 2018
        },


    ];



    function getSelectedFilters() {

        let selectedFilters = {
            genre: [],
            rating: [],
            year: []
        };

        let allCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');

        for (let i = 0; i < allCheckboxes.length; i++) {
            let checkbox = allCheckboxes[i];

            if (checkbox.checked === true) {
                let filterType = checkbox.dataset.filter; 
                let filterValue = checkbox.value;         

                selectedFilters[filterType].push(filterValue);
            }
        }

        return selectedFilters;
    }


    // FILTER THE BOOKS
    
    function filterBooks(selectedFilters) {

        let matchingBooks = [];

        for (let i = 0; i < allBooks.length; i++) {
            let book = allBooks[i];
            let keepThisBook = true;

            // At least one of the book's genres must be in the selected genres
            if (selectedFilters.genre.length > 0) {
                let bookMatchesGenre = false;

                for (let j = 0; j < selectedFilters.genre.length; j++) {
                    for (let k = 0; k < book.genre.length; k++) {
                        if (selectedFilters.genre[j] === book.genre[k]) {
                            bookMatchesGenre = true;
                            break;
                        }
                    }
                    if (bookMatchesGenre === true) {
                        break;
                    }
                }

                if (bookMatchesGenre === false) {
                    keepThisBook = false;
                }
            }

            // Book's rating must be >= the selected minimum rating
            if (selectedFilters.rating.length > 0) {
                let bookMatchesRating = false;

                for (let j = 0; j < selectedFilters.rating.length; j++) {
                    if (book.rating >= parseFloat(selectedFilters.rating[j])) {
                        bookMatchesRating = true;
                        break;
                    }
                }

                if (bookMatchesRating === false) {
                    keepThisBook = false;
                }
            }

            // ── YEAR CHECK ──
            if (selectedFilters.year.length > 0) {
                let bookMatchesYear = false;

                for (let j = 0; j < selectedFilters.year.length; j++) {
                    if (selectedFilters.year[j] === 'older') {
                        // "older" = before 2022
                        if (book.year < 2022) {
                            bookMatchesYear = true;
                            break;
                        }
                    } else {
                        if (book.year === parseInt(selectedFilters.year[j])) {
                            bookMatchesYear = true;
                            break;
                        }
                    }
                }

                if (bookMatchesYear === false) {
                    keepThisBook = false;
                }
            }

            // If book passed all checks, add to results
            if (keepThisBook === true) {
                matchingBooks.push(book);
            }
        }

        return matchingBooks;
    }


    // SSHOW FILTERED RESULTS

    let resultsSection = document.createElement('div');
    resultsSection.id = 'filterResults';
    resultsSection.style.display = 'none'; 
    document.querySelector('.filter-bar').after(resultsSection); 

    // Hide Trending, Most Viewed, Mood sections 
    function hideNormalContent() {
        pageContent.style.display = 'none';
    }

    // Show them again when user clicks Back
    function showNormalContent() {
        pageContent.style.display = 'block';
        resultsSection.style.display = 'none';
        resultsSection.innerHTML = ''; 
    }

    // Build and show the results grid
    function showFilteredResults(booksToShow, selectedFilters) {
        hideNormalContent();
        resultsSection.style.display = 'block';

        let allSelected = selectedFilters.genre
            .concat(selectedFilters.rating)
            .concat(selectedFilters.year);

        let tagText = 'All Books';
        if (allSelected.length > 0) {
            tagText = allSelected.join(', ');
        }

        resultsSection.innerHTML =
            '<div class="results-header">' +
            '<p class="results-count">Showing <strong>' + booksToShow.length + '</strong> results for: ' + tagText + '</p>' +
            '<button class="results-back-btn" id="resultsBackBtn">← Back to Browsing</button>' +
            '</div>' +
            '<div class="results-grid" id="resultsGrid"></div>';

        document.getElementById('resultsBackBtn').addEventListener('click', function () {
            showNormalContent();
            resetAllFilters();
        });

        let grid = document.getElementById('resultsGrid');

        // No results message
        if (booksToShow.length === 0) {
            grid.innerHTML = '<p class="no-results">No books match your filters. Try removing some!</p>';
            return;
        }

        // Build a card for each matching book
        for (let i = 0; i < booksToShow.length; i++) {
            let book = booksToShow[i];

            // Card wrapper
            let card = document.createElement('div');
            card.className = 'result-card';

            // Book cover image
            let image = document.createElement('img');
            image.src = book.img;
            image.alt = book.title;

            // Book title below the image
            let title = document.createElement('p');
            title.className = 'result-title';
            title.innerText = book.title;

            // Read More button
            let readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'btn-readmore';
            readMoreBtn.innerText = 'Read More';

            let saveBtn = document.createElement('button');
            saveBtn.className = 'btn-save';
            saveBtn.innerHTML = '<i class="far fa-bookmark"></i> Save';

            let btnWrapper = document.createElement('div');
            btnWrapper.className = 'tn-button';
            btnWrapper.appendChild(readMoreBtn);
            btnWrapper.appendChild(saveBtn);


            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(btnWrapper);
            grid.appendChild(card);
        }
    }


    // SHOW ACTIVE FILTER TAGS

    function showActiveTags(selectedFilters) {
        activeTagsContainer.innerHTML = ''; // clear old tags
        let totalTags = 0;

        let filterTypes = ['genre', 'rating', 'year'];

        for (let t = 0; t < filterTypes.length; t++) {
            let filterType = filterTypes[t];
            let values = selectedFilters[filterType];

            for (let v = 0; v < values.length; v++) {
                totalTags++;
                let tagValue = values[v];

                // Create tag span
                let tag = document.createElement('span');
                tag.className = 'filter-tag';
                tag.innerText = tagValue + ' ';

                // Create the  remove button inside the tag
                let removeBtn = document.createElement('button');
                removeBtn.innerText = '✕';
                removeBtn.title = 'Remove this filter';
                removeBtn.dataset.value = tagValue;
                removeBtn.dataset.filter = filterType;

                removeBtn.addEventListener('click', function () {
                    let checkboxToUncheck = document.querySelector(
                        'input[data-filter="' + this.dataset.filter + '"][value="' + this.dataset.value + '"]'
                    );
                    if (checkboxToUncheck !== null) {
                        checkboxToUncheck.checked = false;
                    }
                    applyFiltersAndDisplay();
                });

                tag.appendChild(removeBtn);
                activeTagsContainer.appendChild(tag);
            }
        }

        if (totalTags > 0) {
            filterClearBtn.style.display = 'block';
        } else {
            filterClearBtn.style.display = 'none';
        }
    }


    //  RESET ALL FILTERS

    function resetAllFilters() {
        let allCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]');

        // Uncheck every single checkbox
        for (let i = 0; i < allCheckboxes.length; i++) {
            allCheckboxes[i].checked = false;
        }

        // Clear the tags from the filter bar
        activeTagsContainer.innerHTML = '';
        filterClearBtn.style.display = 'none';

        // Restore normal page content
        showNormalContent();
    }

    filterResetBtn.addEventListener('click', resetAllFilters);
    filterClearBtn.addEventListener('click', resetAllFilters);


    // APPLY FILTERS 


    function applyFiltersAndDisplay() {
        let selectedFilters = getSelectedFilters();
        let filteredBooks = filterBooks(selectedFilters);
        showFilteredResults(filteredBooks, selectedFilters);
        showActiveTags(selectedFilters);
        closeSidebar();
    }

    filterApplyBtn.addEventListener('click', applyFiltersAndDisplay);
}

function showToast(message) {

    let oldToast = document.querySelector('.toast-notification');

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


document.addEventListener('click', function (event) {

    let saveButton = event.target.closest('.btn-save');


    if (saveButton) {
        let icon = saveButton.querySelector('i');



        if (saveButton.classList.contains('saved')) {
            saveButton.classList.remove('saved');
            if (icon) {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }

            showToast("Removed from wishlist!")

        }
        else {
            saveButton.classList.add('saved');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }

            showToast("Saved to wishlist!");

        }

    }

});


