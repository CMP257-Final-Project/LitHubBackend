//------------------------------------------------------ Backend Connected Version ---------------------------------------------------------
// Data will be fetched from backend - no hardcoded data

let currentUser = {
    id: null,
    name: "",
    email: "",
    memberSince: ""
};

let wishlistBooks = [];
let readBooks = [];

// ---------------------FETCH FUNCTIONS (NEW - Add these)---------------------

// Fetch user data from backend
async function fetchUserData() {
    try {
        let response = await fetch('/LitHubBackend/get-user');
        if (response.ok) {
            let data = await response.json();
            currentUser.id
			 = data.userId;
            currentUser.name = data.name || data.username;
            currentUser.email = data.email;
            document.getElementById('userName').textContent = currentUser.name;
        } else {
            document.getElementById('userName').textContent = "Reader";
        }
    } catch (error) {
        console.error('Error loading user:', error);
        document.getElementById('userName').textContent = "Reader";
    }
}

// Fetch stats from backend
async function fetchStats() {
    try {
        let response = await fetch('/LitHubBackend/dashboard-data');
        if (response.ok) {
            let data = await response.json();
            document.getElementById('wishlistCount').textContent = data.wishlistCount || 0;
            document.getElementById('readCount').textContent = data.readCount || 0;
            document.getElementById('totalPages').textContent = data.totalPages || 0;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Fetch wishlist from backend
async function fetchWishlist() {
    try {
        let response = await fetch('/LitHubBackend/get-wishlist');
        if (response.ok) {
            wishlistBooks = await response.json();
            displayWishlist();
            updateStats();
        }
    } catch (error) {
        console.error('Error loading wishlist:', error);
        wishlistBooks = [];
        displayWishlist();
    }
}

// Fetch read books from backend
async function fetchReadBooks() {
    try {
        let response = await fetch('/LitHubBackend/get-read-books');
        if (response.ok) {
            readBooks = await response.json();
            displayReadBooks();
            updateStats();
        }
    } catch (error) {
        console.error('Error loading read books:', error);
        readBooks = [];
        displayReadBooks();
    }
}

// ---------------------DISPLAY FUNCTIONS (Keep your existing code, just remove hardcoded data)---------------------

// Displays user name - REMOVE the old line that sets it, keep only if element exists
// (Your existing code at line ~30: document.getElementById('userName').textContent = currentUser.name; 
//  Will be replaced by fetchUserData)

// Update stats (MODIFIED to use dynamic data instead of hardcoded)
function updateStats() {
    document.getElementById('wishlistCount').textContent = wishlistBooks.length;
    document.getElementById('readCount').textContent = readBooks.length;

    let totalPagesRead = 0;
    for (const book of readBooks) {
        totalPagesRead = totalPagesRead + (book.pages || 0);
    }
    document.getElementById('totalPages').textContent = totalPagesRead;
}

// Shows stars (KEEP AS IS)
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Display wishlist books (MODIFIED - works with dynamic data)
function displayWishlist() {
    const wish = document.getElementById('wishlistGrid');

    if (wishlistBooks.length === 0) {
        wish.innerHTML = `
                    <div class="empty-grid">
                        <h3>Your wishlist is empty</h3>
                        <p>Start adding books from the <a href="findabook.html">Find a Book page</a>!</p>
                    </div>
                `;
        return;
    }

    let html = '';
    for (const book of wishlistBooks) {
        html += `
                    <div class="book-card" data-book-id="${book.id}">
                        <img src="${book.cover}" alt="${book.title}" class="book-cover">
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">by ${book.author}</p>
                            <p class="book-date">Added: ${book.savedDate}</p>
                            <div class="book-actions">
                                <button class="btn-read" onclick="markAsRead('${book.id}')">
                                    <i class="fas fa-check"></i> Mark as Read
                                </button>
                                <button class="btn-remove" onclick="removeFromWishlist('${book.id}')">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
    };

    wish.innerHTML = html;
}

// Display read books (MODIFIED - works with dynamic data)
function displayReadBooks() {
    const read = document.getElementById('readGrid');

    if (readBooks.length === 0) {
        read.innerHTML = `
                    <div class="empty-grid">
                        <h3>No books marked as read yet</h3>
                        <p>Mark books as read from your wishlist!</p>
                    </div>
                `;
        return;
    }

	let html = '';
	for (const book of readBooks) {
	    html += "
	                <div class="book-card" data-book-id="${book.id}">
	                    <img src="${book.cover}" alt="${book.title}" class="book-cover">
	                    <div class="book-info">
	                        <h3 class="book-title">${book.title}</h3>
	                        <p class="book-author">by ${book.author}</p>
	                        <div class="book-rating">${getStarRating(book.rating)}</div>
	                        <p class="book-date">Read: ${book.dateRead}</p>
	                        <div class="book-actions">
	                            <button class="btn-rate" onclick="rateBook('${book.id}')">
	                                <i class="fas fa-star"></i> Rate
	                            </button>
	                            <button class="btn-remove" onclick="removeFromRead('${book.id}')">
	                                <i class="fas fa-trash"></i> Remove
	                            </button>
	                        </div>
	                    </div>
	                </div>
	            ";
	}

    read.innerHTML = html;
}


// -------------------------------ACTION FUNCTIONS (MODIFIED - call backend APIs)---------------------

// Mark a book as read
async function markAsRead(bookId) {
    try {
        let response = await fetch('/LitHubBackend/mark-as-read', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'bookCode=' + bookId
        });
        
        if (response.ok) {
            await fetchWishlist();
            await fetchReadBooks();
            await fetchStats();
            showToast("Book moved to Already Read!");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to mark as read');
    }
}

// Remove from wishlist
async function removeFromWishlist(bookId) {
    try {
        let response = await fetch('/LitHubBackend/remove-from-wishlist?bookCode=' + bookId, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await fetchWishlist();
            await fetchStats();
            showToast("Removed from wishlist");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to remove');
    }
}

// Remove from read list
async function removeFromRead(bookId) {
    try {
        let response = await fetch('/LitHubBackend/remove-from-read?bookCode=' + bookId, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await fetchReadBooks();
            await fetchStats();
            showToast("Removed from reading list");
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to remove');
    }
}

// Rate the book (MODIFIED - sends to backend)
async function rateBook(bookId) {
    const book = readBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const rating = prompt("Rate "+ book.title +"(1 to 5 stars):");

    if (rating && rating >= 1 && rating <= 5) {
        try {
            let response = await fetch('/LitHubBackend/rate-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'bookCode=' + bookId + '&rating=' + rating
            });
            
            if (response.ok) {
                await fetchReadBooks();
                showToast("Rated"+book.title+" " +rating+ " stars!");
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to save rating');
        }
    } else if (rating) {
        showToast('Please enter a rating between 1 and 5');
    }
}


// ------------------------EXPORT FUNCTIONS (KEEP YOUR EXISTING CODE - no changes needed)---------------------

// Export as TXT
function exportAsTXT() {
    let content = "LIT HUB READING LISTS\n";
    content += "=====================\n\n";
	content += "User: " + currentUser.name + " (" + currentUser.email + ")\n";
	content += "Generated on " + new Date().toLocaleString() + "\n\n";
	content += "Stats: " + wishlistBooks.length + " in wishlist, " + readBooks.length + " read, " + readBooks.reduce((t, b) => t + (b.pages || 0), 0) + " pages total\n-----\n\n";
    content += "WISHLIST\n";
    content += "--------\n";
    if (wishlistBooks.length === 0) {
        content += "Empty\n";
    } else {
        for (let i = 0; i < wishlistBooks.length; i++) {
            const book = wishlistBooks[i];
            content += (i + 1) + ". " + book.title + " by " + book.author + " (Added: " + book.savedDate + ")\n";
        }
    }

    content += "\nALREADY READ\n";
    content += "------------\n";
    if (readBooks.length === 0) {
        content += "Empty\n";
    } else {
        for (let i = 0; i < readBooks.length; i++) {
            const book = readBooks[i];
            const rating = book.rating ? book.rating + "⭐" : 'Not rated';
				content += (i + 1) + ". " + book.title + " by " + book.author + " (Added: " + book.savedDate + ")\n";      
			  }
    }
	
}
    downloadFile(content, 'My_LitHub_Lists.txt', 'text/plain');
    showToast('Exported as TXT!');


// Export as CSV
function exportAsCSV() {
    let content = "TYPE,TITLE,AUTHOR,DATE ADDED/READ,RATING,NO. OF PAGES\n\n";

    for (let i = 0; i < wishlistBooks.length; i++) {
        const book = wishlistBooks[i];
		content += "Wishlist,\"" + book.title + "\",\"" + book.author + "\"," + book.savedDate + ",," + (book.pages || '') + "\n";}
    content += "\n";
    for (let i = 0; i < readBooks.length; i++) {
        const book = readBooks[i];
        content += "Already Read,\"" + book.title + "\",\"" + book.author + "\"," + book.dateRead + "," + (book.rating || '') + "," + (book.pages || '') + "\n";
    }

    downloadFile(content, "My_LitHub_Lists.csv", "text/csv");
    showToast('Exported as CSV!');
}

// Helper: Download file (KEEP AS IS)
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}


// ------------------------UI FUNCTIONS (KEEP YOUR EXISTING CODE)---------------------

//Switching between tabs
function switchTab(tab) {
    const wishlistTab = document.getElementById('wishlistTab');
    const readTab = document.getElementById('readTab');
    const tabs = document.querySelectorAll('.tab-btn');

    if (tab === 'wishlist') {
        wishlistTab.style.display = 'block';
        readTab.style.display = 'none';
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        wishlistTab.style.display = 'none';
        readTab.style.display = 'block';
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

// Toast notification (KEEP AS IS)
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}


// Logout (MODIFIED - call backend logout)
async function logout(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        await fetch('/LitHubBackend/logout', { method: 'POST' });
        showToast('Logged out successfully! Redirecting to Home page...');
        setTimeout(() => {
            window.location.href = 'HomePage.html';
        }, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});


//Initializing the dashboard (MODIFIED - fetch data from backend)
async function initialize() {
    await fetchUserData();
    await fetchStats();
    await fetchWishlist();
    await fetchReadBooks();
}

initialize();