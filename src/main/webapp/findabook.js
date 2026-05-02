// SWIPER (Hero Slider)
if (document.querySelector('.bookSwiper')) {
    let bookSwiper = new Swiper('.bookSwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
        }
    });
}


//
// GLOBAL DATA
//
let allBooks = [];




document.addEventListener("DOMContentLoaded", function () {
    loadBooks();
    loadClubs();
    setupFilterSidebar();
});


// -----------------------------
// FETCH BOOKS FROM BACKEND
// -----------------------------
function loadBooks() {
    fetch('/LitHubBackend/FindBookServlet')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            return response.json();
        })
        .then(data => {
            console.log("Books from backend:", data);
            allBooks = data;
            populateSliders(data);
        })
        .catch(error => console.error('Error loading books:', error));
}


// -----------------------------
// POPULATE SLIDERS
// -----------------------------
function populateSliders(books) {
    const tnTrack = document.getElementById('tnTrack');
    const mvTrack = document.getElementById('mvTrack');
    const mvTrackDiscover = document.getElementById('mvTrackDiscover');


    if (tnTrack) tnTrack.innerHTML = '';
    if (mvTrack) mvTrack.innerHTML = '';
    if (mvTrackDiscover) mvTrackDiscover.innerHTML = '';


    books.forEach(book => {


        if (tnTrack && book.section === "trending") { // CHECK IF THIS IS HOW ITS NAMED IN DATABASE
            tnTrack.appendChild(createBookCard(book));
        }


        if (mvTrack && book.section === "mostviewed") {
            mvTrack.appendChild(createBookCard(book));
        }


    });
}






// -----------------------------
// CREATE BOOK CARD
// -----------------------------
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';


    const coverImage = book.cover_Url || book.cover_url || 'Img/tn1.jpg';


    card.innerHTML = `
        <img src="${coverImage}" alt="${book.title}">
        <div class="tn-button">
            <button class="btn-readmore"
                onclick="window.location.href='BookReadMore.html?book=${book.id}'">
                Read More
            </button>
            <button class="btn-save">
                <i class="far fa-bookmark"></i> Save
            </button>
        </div>
    `;


    return card;
}


function loadClubs() {
    fetch('/LitHubBackend/FindClubServlet')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch clubs');
            }
            return response.json();
        })
        .then(clubs => {
            console.log("Clubs from backend:", clubs);
            // Now loop through "clubs" and append to your mvTrackDiscover container
            populateClubs(clubs);
        })
        .catch(error => console.error('Error loading clubs:', error));
}




function populateClubs(clubs) {
    const mvTrackDiscover = document.getElementById('mvTrackDiscover');


    if (mvTrackDiscover) {
        mvTrackDiscover.innerHTML = ''; // Clear previous items


        if (clubs.length > 0) {
            clubs.forEach(club => {
                mvTrackDiscover.appendChild(createClubCard(club));
            });
        } else {
            mvTrackDiscover.innerHTML = `<p style="text-align: center; width: 100%; color: #7d7164;">No clubs found.</p>`;
        }
    }
}


function createClubCard(club) {
    const card = document.createElement('div');
    card.className = 'dbook-card';


    const image = club.coverUrl || club.cover_url || 'Img/db1.png';


    card.innerHTML = `
        <img src="${image}" alt="${club.name}">
        <div class="tn-button">
            <button class="btn-readmore"
                onclick="window.location.href='clubreadmore.html?club=${club.id}'">
                Read More
            </button>
            <button class="btn-save">
                <i class="far fa-bookmark"></i> Save
            </button>
        </div>
    `;


    return card;
}




// -----------------------------
// FILTER SIDEBAR SETUP
// -----------------------------
function setupFilterSidebar() {
    let filterSidebar = document.getElementById('filterSidebar');
    if (!filterSidebar) return;


    let filterOverlay = document.getElementById('filterOverlay');
    let filterToggleBtn = document.getElementById('filterToggleBtn');
    let filterCloseBtn = document.getElementById('filterCloseBtn');
    let filterApplyBtn = document.getElementById('filterApplyBtn');


    function openSidebar() {
        filterSidebar.classList.add('open');
        filterOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }


    function closeSidebar() {
        filterSidebar.classList.remove('open');
        filterOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }


    function toggleSidebar() {
        filterSidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    }


    if (filterToggleBtn) filterToggleBtn.addEventListener('click', toggleSidebar);
    if (filterCloseBtn) filterCloseBtn.addEventListener('click', closeSidebar);
    if (filterOverlay) filterOverlay.addEventListener('click', closeSidebar);


    // ESC key close
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeSidebar();
    });


    // Apply filter
    if (filterApplyBtn) {
        filterApplyBtn.addEventListener('click', applyFiltersAndDisplay);
    }


    applyGenreFromURL();
    setupGroupToggles();
}


// -----------------------------
// APPLY GENRE FROM URL
// -----------------------------
function applyGenreFromURL() {
    let params = new URLSearchParams(window.location.search);
    let genreFromURL = params.get("genre");


    if (genreFromURL) {
        let checkbox = document.querySelector(
            `input[data-filter="genre"][value="${genreFromURL}"]`
        );


        if (checkbox) {
            checkbox.checked = true;
            applyFiltersAndDisplay();
        }
    }
}


// -----------------------------
// FILTER GROUP TOGGLES
// -----------------------------
function setupGroupToggles() {
    let buttons = document.querySelectorAll('.filter-group-toggle');


    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            let target = document.getElementById(this.dataset.target);


            if (!target) return;


            target.classList.toggle('open');
            this.classList.toggle('collapsed');
        });
    });
}


// -----------------------------
// FILTER LOGIC
// -----------------------------
function getSelectedFilters() {
    let selected = {
        genre: [],
        rating: [],
        published_date: []
    };


    document.querySelectorAll('.filter-checkbox input[type="checkbox"]')
        .forEach(cb => {
            if (cb.checked) {
                selected[cb.dataset.filter].push(cb.value);
            }
        });


    return selected;
}


function filterBooks(filters) {
    return allBooks.filter(book => {
        let matches = true;


        // GENRE
        if (filters.genre.length > 0) {
            let bookGenres = Array.isArray(book.genre)
                ? book.genre
                : (book.genre || "").split(",");


            matches = filters.genre.some(g => bookGenres.includes(g));
        }


        // RATING
        if (matches && filters.rating.length > 0) {
            matches = filters.rating.some(r =>
                book.avg_rating >= parseFloat(r)
            );
        }


        // YEAR
        if (matches && filters.published_date.length > 0) {
            matches = filters.published_date.some(y => {
                if (y === 'older') return book.published_date < 2022;
                return book.published_date == y;
            });
        }


        return matches;
    });
}


// -----------------------------
// APPLY FILTERS
// -----------------------------
function applyFiltersAndDisplay() {
    let filters = getSelectedFilters();
    let filteredBooks = filterBooks(filters);


    console.log("Filtered:", filteredBooks);


    populateSliders(filteredBooks);
}


// -----------------------------
// TOAST NOTIFICATION
// -----------------------------
function showToast(message) {
    let oldToast = document.querySelector('.toast-notification');
    if (oldToast) oldToast.remove();


    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;


    document.body.appendChild(toast);


    setTimeout(() => toast.remove(), 3000);
}


// -----------------------------
// WISHLIST BUTTON
// -----------------------------
document.addEventListener('click', function (event) {
    let saveButton = event.target.closest('.btn-save');


    if (!saveButton) return;


    let icon = saveButton.querySelector('i');


    if (saveButton.classList.contains('saved')) {
        saveButton.classList.remove('saved');
        if (icon) {
            icon.classList.replace('fas', 'far');
        }
        showToast("Removed from wishlist!");
    } else {
        saveButton.classList.add('saved');
        if (icon) {
            icon.classList.replace('far', 'fas');
        }
        showToast("Saved to wishlist!");
    }
});
