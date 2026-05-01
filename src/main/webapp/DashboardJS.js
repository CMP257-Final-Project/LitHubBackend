/**
 * DashboardJS.js
 * All book data is loaded from the backend via fetch().
 * No hardcoded books remain here.
 */

// ── In-memory state (filled after API response) ────────────────────────────
var wishlistBooks = [];
var readBooks     = [];
var currentUser   = { username: "" };

// ── API base path ──────────────────────────────────────────────────────────
// Adjust the context root if yours differs (e.g. "/LitHub/api/...")
var API_BASE = "api";

// =============================================================================
//  INITIALISATION
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {

    // Wire up logout button
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    // Load everything from the server
    loadDashboard();
});

/**
 * Fetches GET /api/dashboard and populates the whole page.
 * Redirects to login if the server returns 401.
 */
function loadDashboard() {
    fetch(API_BASE + "/dashboard", {
        method: 'GET',
        credentials: 'same-origin'   // send the session cookie
    })
    .then(function(resp) {
        if (resp.status === 401) {
            // Not logged in — send back to login page
            //window.location.href = 'login.html';
            return;
        }

        if (!resp.ok) throw new Error("Server error " + resp.status);
        return resp.json();
    })
    .then(function(data) {
        if (!data) return;
        
        // Store in module-level variables so export functions can use them
        currentUser.username = data.username;
        wishlistBooks        = data.wishlist  || [];
        readBooks            = data.readBooks || [];

        // Render
        document.getElementById('userName').textContent = data.username;
        updateStats();
        displayWishlist();
        displayReadBooks();
    })
    .catch(function(err) {
        console.error('Failed to load dashboard:', err);
        showToast('Could not load your dashboard. Please refresh.');
    });
}

// =============================================================================
//  STATS
// =============================================================================

function updateStats() {
    document.getElementById('wishlistCount').textContent = wishlistBooks.length;
    document.getElementById('readCount').textContent     = readBooks.length;

    var totalPages = 0;
    for (var i = 0; i < readBooks.length; i++) {
        totalPages += (readBooks[i].pageCount || 0);
    }
    document.getElementById('totalPages').textContent = totalPages;
}

// =============================================================================
//  RENDER HELPERS
// =============================================================================

function getStarRating(rating) {
    var stars = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// =============================================================================
//  DISPLAY FUNCTIONS
// =============================================================================

function displayWishlist() {
    var container = document.getElementById('wishlistGrid');

    if (wishlistBooks.length === 0) {
        container.innerHTML = '<div class="empty-grid">' +
            '<i class="fas fa-heart"></i>' +
            '<h3>Your wishlist is empty</h3>' +
            '<p>Start adding books from the <a href="findabook.html">Find a Book</a> page!</p>' +
            '</div>';
        return;
    }

    var html = '';
    for (var i = 0; i < wishlistBooks.length; i++) {
        var book = wishlistBooks[i];
        html += '<div class="book-card" data-userbook-id="' + book.userBookId + '">' +
            '<img src="' + book.coverUrl + '" alt="' + book.title + '" class="book-cover"' +
            ' onerror="this.src=\'Img/placeholder.jpg\'">' +
            '<div class="book-info">' +
            '<h3 class="book-title">' + book.title + '</h3>' +
            '<p class="book-author">by ' + book.author + '</p>' +
            '<p class="book-date">Added: ' + (book.addedAt || '—') + '</p>' +
            '<div class="book-actions">' +
            '<button class="btn-read" onclick="markAsRead(' + book.userBookId + ', \'' + escapeHtml(book.title) + '\')">' +
            '<i class="fas fa-check"></i> Mark as Read</button>' +
            '<button class="btn-remove" onclick="removeFromWishlist(' + book.userBookId + ', \'' + escapeHtml(book.title) + '\')">' +
            '<i class="fas fa-trash"></i> Remove</button>' +
            '</div></div></div>';
    }
    container.innerHTML = html;
}

function displayReadBooks() {
    var container = document.getElementById('readGrid');

    if (readBooks.length === 0) {
        container.innerHTML = '<div class="empty-grid">' +
            '<i class="fas fa-check-circle"></i>' +
            '<h3>No books marked as read yet</h3>' +
            '<p>Mark books as read from your wishlist!</p>' +
            '</div>';
        return;
    }

    var html = '';
    for (var i = 0; i < readBooks.length; i++) {
        var book = readBooks[i];
        html += '<div class="book-card" data-userbook-id="' + book.userBookId + '">' +
            '<img src="' + book.coverUrl + '" alt="' + book.title + '" class="book-cover"' +
            ' onerror="this.src=\'Img/placeholder.jpg\'">' +
            '<div class="book-info">' +
            '<h3 class="book-title">' + book.title + '</h3>' +
            '<p class="book-author">by ' + book.author + '</p>' +
            '<div class="book-rating">' + getStarRating(book.rating) + '</div>' +
            '<p class="book-date">Read: ' + (book.readDate || '—') + '</p>' +
            '<div class="book-actions">' +
            '<button class="btn-rate" onclick="rateBook(' + book.userBookId + ', \'' + escapeHtml(book.title) + '\')">' +
            '<i class="fas fa-star"></i> Rate</button>' +
            '<button class="btn-remove" onclick="removeFromRead(' + book.userBookId + ', \'' + escapeHtml(book.title) + '\')">' +
            '<i class="fas fa-trash"></i> Remove</button>' +
            '</div></div></div>';
    }
    container.innerHTML = html;
}

// =============================================================================
//  ACTION FUNCTIONS  (each calls the backend, then refreshes local state)
// =============================================================================

/**
 * Sends an action to POST /api/book-action and returns the parsed JSON.
 * Throws on network error or non-OK HTTP status.
 */
function sendAction(payload, callback) {
    fetch(API_BASE + "/book-action", {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        if (!data.success) throw new Error(data.error || 'Action failed');
        if (callback) callback(null, data);
    })
    .catch(function(err) {
        if (callback) callback(err, null);
    });
}

// ── Mark wishlist book as read ──────────────────────────────────────────────
function markAsRead(userBookId, title) {
    sendAction({ action: 'markRead', userBookId: userBookId }, function(err, data) {
        if (err) {
            showToast('Error: ' + err.message);
            return;
        }

        // Move locally without another round-trip
        var idx = -1;
        for (var i = 0; i < wishlistBooks.length; i++) {
            if (wishlistBooks[i].userBookId === userBookId) {
                idx = i;
                break;
            }
        }
        
        if (idx !== -1) {
            // Create a copy of the book (no spread operator)
            var book = {};
            for (var key in wishlistBooks[idx]) {
                if (wishlistBooks[idx].hasOwnProperty(key)) {
                    book[key] = wishlistBooks[idx][key];
                }
            }
            book.status   = 'read';
			book.readDate = new Date().toISOString().split('T')[0];
			            book.rating = 0;
			            delete book.addedAt;
            
            // Insert at beginning
            readBooks.splice(0, 0, book);
            // Remove from wishlist
            wishlistBooks.splice(idx, 1);
        }

        displayWishlist();
        displayReadBooks();
        updateStats();
        showToast('"' + title + '" moved to Already Read!');
    });
}

// ── Remove from wishlist ────────────────────────────────────────────────────
function removeFromWishlist(userBookId, title) {
    sendAction({ action: 'removeWishlist', userBookId: userBookId }, function(err, data) {
        if (err) {
            showToast('Error: ' + err.message);
            return;
        }

        var newWishlist = [];
        for (var i = 0; i < wishlistBooks.length; i++) {
            if (wishlistBooks[i].userBookId !== userBookId) {
                newWishlist.push(wishlistBooks[i]);
            }
        }
        wishlistBooks = newWishlist;
        
        displayWishlist();
        updateStats();
        showToast('"' + title + '" removed from wishlist');
    });
}

// ── Remove from read list ───────────────────────────────────────────────────
function removeFromRead(userBookId, title) {
    sendAction({ action: 'removeRead', userBookId: userBookId }, function(err, data) {
        if (err) {
            showToast('Error: ' + err.message);
            return;
        }

        var newReadBooks = [];
        for (var i = 0; i < readBooks.length; i++) {
            if (readBooks[i].userBookId !== userBookId) {
                newReadBooks.push(readBooks[i]);
            }
        }
        readBooks = newReadBooks;
        
        displayReadBooks();
        updateStats();
        showToast('"' + title + '" removed from reading list');
    });
}

// ── Rate a book ─────────────────────────────────────────────────────────────
function rateBook(userBookId, title) {
    var input = prompt('Rate "' + title + '" (1 to 5 stars):');
    if (input === null) return;          // user cancelled

    var rating = parseInt(input, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
        showToast('Please enter a number between 1 and 5');
        return;
    }

    sendAction({ action: 'rate', userBookId: userBookId, rating: rating }, function(err, data) {
        if (err) {
            showToast('Error: ' + err.message);
            return;
        }

        // Update locally
        for (var i = 0; i < readBooks.length; i++) {
            if (readBooks[i].userBookId === userBookId) {
                readBooks[i].rating = rating;
                break;
            }
        }

        displayReadBooks();
        var starText = rating > 1 ? 's' : '';
        showToast('Rated "' + title + '" ' + rating + ' star' + starText + '!');
    });
}

// =============================================================================
//  EXPORT FUNCTIONS
// =============================================================================

function exportAsTXT() {
    var content  = "LIT HUB READING LISTS\n";
    content += "=====================\n\n";
    content += "User: " + currentUser.username + "\n";
    content += "Generated on: " + new Date().toLocaleString() + "\n\n";
    
    var totalPages = 0;
    for (var i = 0; i < readBooks.length; i++) {
        totalPages += (readBooks[i].pageCount || 0);
    }
    
    content += "Stats: " + wishlistBooks.length + " in wishlist, " + readBooks.length + " read, ";
    content += totalPages + " pages total\n-----\n\n";

    content += "WISHLIST\n--------\n";
    if (wishlistBooks.length === 0) {
        content += "Empty\n";
    } else {
        for (var i = 0; i < wishlistBooks.length; i++) {
            var b = wishlistBooks[i];
            content += (i + 1) + ". " + b.title + " by " + b.author + " (Added: " + (b.addedAt || '—') + ")\n";
        }
    }

    content += "\nALREADY READ\n------------\n";
    if (readBooks.length === 0) {
        content += "Empty\n";
    } else {
        for (var i = 0; i < readBooks.length; i++) {
            var b = readBooks[i];
            var stars = b.rating ? b.rating + "⭐" : 'Not rated';
            content += (i + 1) + ". " + b.title + " by " + b.author + " (Read: " + (b.readDate || '—') + ", Rating: " + stars + ")\n";
        }
    }

    downloadFile(content, 'My_LitHub_Lists.txt', 'text/plain');
    showToast('Exported as TXT!');
}

function exportAsCSV() {
    var content = "TYPE,TITLE,AUTHOR,DATE ADDED/READ,RATING,NO. OF PAGES\n\n";

    for (var i = 0; i < wishlistBooks.length; i++) {
        var b = wishlistBooks[i];
        content += 'Wishlist,"' + b.title + '","' + b.author + '",' + (b.addedAt || '') + ',,' + (b.pageCount || '') + '\n';
    }

    content += '\n';

    for (var i = 0; i < readBooks.length; i++) {
        var b = readBooks[i];
        content += 'Already Read,"' + b.title + '","' + b.author + '",' + (b.readDate || '') + ',' + (b.rating || '') + ',' + (b.pageCount || '') + '\n';
    }

    downloadFile(content, 'My_LitHub_Lists.csv', 'text/csv');
    showToast('Exported as CSV!');
}

function downloadFile(content, filename, mimeType) {
    var blob = new Blob([content], { type: mimeType });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// =============================================================================
//  UI HELPERS
// =============================================================================

function switchTab(tab) {
    var wishlistTab = document.getElementById('wishlistTab');
    var readTab     = document.getElementById('readTab');
    var btns = document.querySelectorAll('.tab-btn');
    var btnWish = btns[0];
    var btnRead = btns[1];

    if (tab === 'wishlist') {
        wishlistTab.style.display = 'block';
        readTab.style.display     = 'none';
        btnWish.classList.add('active');
        btnRead.classList.remove('active');
    } else {
        wishlistTab.style.display = 'none';
        readTab.style.display     = 'block';
        btnWish.classList.remove('active');
        btnRead.classList.add('active');
    }
}

function showToast(message) {
    var toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 3000);
}

function logout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        showToast('Logged out successfully! Redirecting to Home page...');
        setTimeout(function() { window.location.href = 'HomePage.html'; }, 1000);
    }
}

/** Prevent XSS when injecting user data into onclick="" attributes */
function escapeHtml(str) {
    return String(str)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '&quot;');
}