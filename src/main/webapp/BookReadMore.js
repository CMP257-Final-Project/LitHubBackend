//storing each club data in one nested object

let books = {
    "TN1": {
        title: "In Her Own League",
        author: "Liz Tomforde",
        image: "Img/tn1.jpg",
        genre: "Romance",
        pages: 384,
        publishedDate: "2024-03-15",
        rating: 4.8,
        summary: "As the first female team owner in Major League Baseball, Reese Remington has spent her life preparing to prove she belongs in a world that constantly questions her authority. With years of experience and a sharp, strategic mind, she knows she’s capable—but earning respect is a battle she has to fight every single day.\nEmmett Montgomery, the team’s former All-Star turned field manager, isn’t thrilled about taking orders from someone he barely trusts. Used to running things his own way, he clashes with Reese at every turn. But as they’re forced to work closely together, tension gives way to understanding—and an undeniable chemistry neither of them expected.\nAs their connection deepens, Reese is torn between protecting her career and following her heart. With the pressure of public scrutiny and the stakes higher than ever, she must decide if risking everything for love is worth the cost.",
        reviews: [
            { user: "Sarah J.", rating: 5, comment: "Absolutely inspiring! Couldn't put it down.", date: "2024-03-20" },
            { user: "Michael R.", rating: 4.5, comment: "Great character development and emotional depth.", date: "2024-03-18" },
            { user: "Emma W.", rating: 5, comment: "Loved every page! Highly recommend.", date: "2024-03-16" }
        ]

    },

    "TN2": {
        title: "Dear Debbie",
        author: "Freida McFadden",
        image: "Img/tn2.jpg",
        genre: "Thriller",
        pages: 320,
        publishedDate: "2023-05-10",
        rating: 4.2,
        summary: "A series of unsettling letters begins to unravel a story filled with secrets, obsession, and quiet manipulation. What starts as curiosity quickly turns into dread as the truth behind “Debbie” becomes more disturbing with each revelation.\nAs the past and present collide, hidden motives and buried memories surface, forcing the characters—and the reader—to question what is real and who can be trusted. The deeper the story goes, the more dangerous the truth becomes.",
        reviews: [
            { user: "Lina K.", rating: 4.5, comment: "Creepy and addictive. The twists kept coming!", date: "2024-02-11" },
            { user: "Omar S.", rating: 4, comment: "Short but intense. Loved the format.", date: "2024-02-09" },
            { user: "Hannah T.", rating: 4.2, comment: "Very suspenseful read with a strong ending.", date: "2024-02-07" }
        ]
    },
    "TN3": {
        title: "My Husband’s Wife",
        author: "Alice Feeney",
        image: "Img/tn3.jpg",
        genre: "Psychological Thriller",
        pages: 352,
        publishedDate: "2017-01-26",
        rating: 4.3,
        summary: "Lily thought she understood the man she married, but cracks begin to form as secrets from both of their pasts resurface. A seemingly perfect relationship slowly turns into a web of lies, suspicion, and psychological tension.\nAs the story unfolds across timelines, the truth becomes harder to grasp. With every twist, loyalties shift, and the line between victim and villain blurs, leaving a haunting sense that nothing is quite what it seems.",
        reviews: [
            { user: "Zara M.", rating: 4.5, comment: "Mind-bending and clever!", date: "2024-01-15" },
            { user: "Ali R.", rating: 4.2, comment: "Twists I didn’t see coming.", date: "2024-01-12" },
            { user: "Nina P.", rating: 4, comment: "Dark and gripping throughout.", date: "2024-01-10" }
        ]
    },
    "TN4": {
        title: "Now I Surrender",
        author: "Álvaro Enrigue",
        image: "Img/tn4.jpg",
        genre: "Historical Fiction",
        pages: 240,
        publishedDate: "2024-02-20",
        rating: 4.1,
        summary: "Blending history with imagination, this novel explores love and survival during a time of chaos and uncertainty. Through richly layered storytelling, it captures fleeting moments of humanity amidst conflict.\nThe narrative shifts between perspectives, revealing emotional depth and philosophical reflection. It is a quiet yet powerful meditation on resilience, memory, and the fragile nature of existence.",
        reviews: [
            { user: "Daniel F.", rating: 4.2, comment: "Beautifully written and unique.", date: "2024-03-01" },
            { user: "Sara L.", rating: 4, comment: "A slow but rewarding read.", date: "2024-02-27" },
            { user: "Yousef A.", rating: 4.1, comment: "Rich storytelling with depth.", date: "2024-02-25" }
        ]
    },
    "TN5": {
        title: "Eleanore of Avignon",
        author: "Elizabeth DeLozier",
        image: "Img/tn5.jpg",
        genre: "Historical Fiction",
        pages: 368,
        publishedDate: "2023-04-18",
        rating: 4.4,
        summary: "Amid the devastation of the Black Death, Eleanore uses her knowledge of healing to survive in a world ruled by fear and superstition. As society crumbles, she must navigate danger, suspicion, and loss.\nDetermined to protect those around her, she faces impossible choices that test her courage and identity. Her journey becomes one of strength, survival, and redefining her place in a broken world.",
        reviews: [
            { user: "Maya K.", rating: 4.6, comment: "Atmospheric and emotional.", date: "2024-01-20" },
            { user: "Owen J.", rating: 4.3, comment: "Loved the historical detail.", date: "2024-01-18" },
            { user: "Fatima R.", rating: 4.4, comment: "Strong heroine and gripping plot.", date: "2024-01-15" }
        ]
    },
    "TN6": {
        title: "Vigil",
        author: "George Saunders",
        image: "Img/tn6.jpg",
        genre: "Literary Fiction",
        pages: 224,
        publishedDate: "2023-10-10",
        rating: 4.0,
        summary: "This collection weaves together stories that explore grief, connection, and the strange absurdities of human life. Each narrative offers a glimpse into moments that feel both ordinary and deeply profound.\nThrough sharp wit and emotional insight, the stories challenge perception and invite reflection. They linger long after reading, capturing the quiet complexities of being human.",
        reviews: [
            { user: "Ethan B.", rating: 4.1, comment: "Strange but brilliant.", date: "2024-02-02" },
            { user: "Layla S.", rating: 4, comment: "Deep and reflective stories.", date: "2024-01-30" },
            { user: "Noah G.", rating: 3.9, comment: "Not for everyone, but powerful.", date: "2024-01-28" }
        ]
    },
    "TN7": {
        title: "One & Only",
        author: "Maurene Goo",
        image: "Img/tn7.jpg",
        genre: "Romance",
        pages: 304,
        publishedDate: "2023-06-06",
        rating: 4.3,
        summary: "When a sudden rise to fame changes everything, a young woman finds herself navigating love, identity, and expectations. The spotlight brings both opportunity and pressure she never anticipated.\nAs she balances relationships and self-discovery, she begins to question what truly matters. Along the way, she learns that being seen by the world is very different from understanding herself.",
        reviews: [
            { user: "Aisha N.", rating: 4.5, comment: "So cute and uplifting!", date: "2024-02-05" },
            { user: "Jason L.", rating: 4.2, comment: "Light and enjoyable read.", date: "2024-02-03" },
            { user: "Emily R.", rating: 4.3, comment: "Loved the characters!", date: "2024-02-01" }
        ]
    },
    "TN8": {
        title: "The House on Mango Street",
        author: "Sandra Cisneros",
        image: "Img/tn8.jpg",
        genre: "Coming-of-Age",
        pages: 110,
        publishedDate: "1984-01-01",
        rating: 4.6,
        summary: "Through a series of poetic vignettes, Esperanza shares her experiences growing up in a vibrant yet challenging neighborhood. Each moment reflects her hopes, struggles, and evolving sense of identity.\nAs she matures, her voice grows stronger, capturing both the beauty and hardship of her world. Her journey becomes one of self-expression, belonging, and the desire for something more.",
        reviews: [
            { user: "Maria C.", rating: 5, comment: "Beautiful and powerful.", date: "2024-01-10" },
            { user: "Ahmed K.", rating: 4.5, comment: "Short but impactful.", date: "2024-01-08" },
            { user: "Sofia L.", rating: 4.6, comment: "Loved the poetic style.", date: "2024-01-06" }
        ]
    },
    "M1": {
        title: "Beach Read",
        author: "Emily Henry",
        image: "Img/m1.jpg",
        genre: "Romance",
        pages: 361,
        publishedDate: "2020-05-19",
        rating: 4.7,
        summary: "Two writers struggling with creative blocks find themselves in neighboring beach houses, each challenged to write outside their comfort zones. What begins as a rivalry slowly shifts into something deeper.\nAs they share stories and confront personal struggles, their connection grows in unexpected ways. Blending humor and emotion, the story explores love, grief, and the courage to start again.",
        reviews: [
            { user: "Chloe D.", rating: 4.8, comment: "Funny, emotional, perfect.", date: "2024-02-14" },
            { user: "Ryan T.", rating: 4.6, comment: "Great chemistry between leads.", date: "2024-02-12" },
            { user: "Leah P.", rating: 4.7, comment: "Couldn’t stop smiling.", date: "2024-02-10" }
        ]
    },
    "M2": {
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        image: "Img/m2.jpg",
        genre: "Drama",
        pages: 400,
        publishedDate: "2017-06-13",
        rating: 4.9,
        summary: "A reclusive Hollywood legend finally decides to tell her story, revealing the truth behind her glamorous and complicated life. Through her seven marriages, she uncovers ambition, sacrifice, and hidden love.\nAs her past unfolds, deeper secrets emerge—ones that redefine everything people thought they knew about her. It is a story of identity, legacy, and the cost of living authentically.",
        reviews: [
            { user: "Isabella M.", rating: 5, comment: "Absolutely unforgettable.", date: "2024-02-20" },
            { user: "David H.", rating: 4.8, comment: "So emotional and real.", date: "2024-02-18" },
            { user: "Noor A.", rating: 4.9, comment: "One of my favorites ever.", date: "2024-02-16" }
        ]
    },
    "M3": {
        title: "The Friend Zone",
        author: "Abby Jimenez",
        image: "Img/m3.jpg",
        genre: "Romance",
        pages: 384,
        publishedDate: "2019-06-11",
        rating: 4.5,
        summary: "A chance encounter sparks a connection between two people whose lives seem perfectly aligned—except for one major complication. What begins as a lighthearted relationship grows more complicated over time.\nAs emotions deepen, difficult truths come to the surface, forcing them to confront what they truly want. It’s a heartfelt story about love, timing, and the realities that shape relationships.",
        reviews: [
            { user: "Megan S.", rating: 4.6, comment: "Funny yet emotional.", date: "2024-01-25" },
            { user: "Yusuf R.", rating: 4.4, comment: "More depth than expected.", date: "2024-01-23" },
            { user: "Huda K.", rating: 4.5, comment: "Loved the emotional moments.", date: "2024-01-21" }
        ]
    },
    "M4": {
        title: "The Alchemist",
        author: "Paulo Coelho",
        image: "Img/m4.jpg",
        genre: "Philosophical Fiction",
        pages: 208,
        publishedDate: "1988-01-01",
        rating: 4.7,
        summary: "Santiago, a young shepherd, sets out on a journey to discover a hidden treasure, guided by dreams and intuition. Along the way, he encounters people who shape his understanding of life and purpose.\nHis adventure becomes more than a physical journey—it transforms into a search for meaning. Through challenges and discovery, he learns to listen to his heart and follow his destiny.",
        reviews: [
            { user: "Omar Z.", rating: 4.8, comment: "Simple yet profound.", date: "2024-02-08" },
            { user: "Alya M.", rating: 4.6, comment: "Very inspiring story.", date: "2024-02-06" },
            { user: "Samir Q.", rating: 4.7, comment: "Makes you think deeply.", date: "2024-02-04" }
        ]
    },
    "M5": {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        image: "Img/m5.jpg",
        genre: "Dystopian",
        pages: 374,
        publishedDate: "2008-09-14",
        rating: 4.8,
        summary: "In a dystopian world, Katniss Everdeen volunteers to take her sister’s place in a deadly televised competition. Forced to fight for survival, she must rely on both skill and strategy.\nAs the games unfold, alliances form and trust becomes dangerous. Beyond survival, Katniss becomes a symbol of defiance in a system built on control and fear.",
        reviews: [
            { user: "Jake W.", rating: 5, comment: "Action-packed and addictive.", date: "2024-01-12" },
            { user: "Amna R.", rating: 4.8, comment: "Katniss is iconic.", date: "2024-01-10" },
            { user: "Leo P.", rating: 4.7, comment: "Still holds up amazingly.", date: "2024-01-08" }
        ]
    },
    "M6": {
        title: "Animal Farm",
        author: "George Orwell",
        image: "Img/m6.jpg",
        genre: "Satire",
        pages: 112,
        publishedDate: "1945-08-17",
        rating: 4.6,
        summary: "A group of farm animals overthrow their human owner in hopes of creating a fair and equal society. At first, their vision seems promising, filled with hope and unity.\nBut as power shifts, corruption begins to take hold, and the original ideals are slowly distorted. The story becomes a powerful reflection on leadership, control, and inequality.",
        reviews: [
            { user: "Nadia F.", rating: 4.7, comment: "Short but powerful.", date: "2024-01-05" },
            { user: "Adam K.", rating: 4.5, comment: "Very thought-provoking.", date: "2024-01-03" },
            { user: "Zain L.", rating: 4.6, comment: "A classic for a reason.", date: "2024-01-01" }
        ]
    },
    "M7": {
        title: "The Midnight Library",
        author: "Matt Haig",
        image: "Img/m7.jpg",
        genre: "Fantasy",
        pages: 304,
        publishedDate: "2020-08-13",
        rating: 4.6,
        summary: "Between life and death lies a library filled with infinite versions of the lives Nora could have lived. Each book offers her a chance to step into a different path.\nAs she explores these possibilities, she begins to understand the weight of choices and regrets. Ultimately, her journey reveals what makes life meaningful and worth living.",
        reviews: [
            { user: "Clara J.", rating: 4.7, comment: "Emotional and uplifting.", date: "2024-02-03" },
            { user: "Hassan M.", rating: 4.5, comment: "Great concept and message.", date: "2024-02-01" },
            { user: "Riya S.", rating: 4.6, comment: "Really made me reflect.", date: "2024-01-30" }
        ]
    },
    "M8": {
        title: "The Butterfly’s Burden",
        author: "Mahmoud Darwish",
        image: "Img/m8.jpg",
        genre: "Poetry",
        pages: 256,
        publishedDate: "2007-01-01",
        rating: 4.5,
        summary: "This collection of poetry reflects on themes of exile, identity, and the passage of time. Through delicate and powerful language, it captures the essence of longing and memory.\nEach piece offers a moment of reflection, blending personal and universal experiences. The poems resonate with emotion, leaving a lasting impression of beauty and resilience.",
        reviews: [
            { user: "Layth A.", rating: 4.6, comment: "Absolutely beautiful writing.", date: "2024-01-20" },
            { user: "Sara H.", rating: 4.4, comment: "Deep and emotional poetry.", date: "2024-01-18" },
            { user: "Khalid N.", rating: 4.5, comment: "Powerful and moving.", date: "2024-01-16" }
        ]
    }
};

//html reads the url
let params = new URLSearchParams(window.location.search);
let bookKey = params.get("book"); //will get booktok, fantasy etc

//need to find that club in our nested object
let book = books[bookKey];

// we fill in the pages
document.getElementById("bookImage").src = book.image;
document.getElementById("bookImage").alt = book.title;
document.getElementById("bookTitle").innerText = book.title;
document.getElementById("bookAuthor").innerText = book.author;
document.getElementById("pages").innerHTML = `<strong>${book.pages}</strong><br>Pages `;
document.getElementById("genre").innerHTML = `<strong>${book.genre}</strong><br>Genre `;
document.getElementById("publishedDate").innerHTML = `<strong>${book.publishedDate}</strong><br>Published `;
document.getElementById("bookSummary").innerText = book.summary;

let stars = document.getElementById("star");
let reviews = document.getElementById("reviews");


const fullStars = Math.floor(book.rating);
let starsHtml = ` `;
for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
        starsHtml += '<i class="fas fa-star"></i>';
    } else if (i === fullStars + 1 && book.rating % 1 >= 0.5) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    } else {
        starsHtml += '<i class="far fa-star"></i>';
    }
}
stars.innerHTML = starsHtml;


// Generate reviews HTML
let reviewsHtml = '';
book.reviews.forEach(review => {
    let reviewStars = '';
    for (let i = 1; i <= 5; i++) {
        reviewStars += i <= review.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    reviewsHtml += `
                    <div class="review-card">
                        <div class="d-flex justify-content-between align-items-center">
                            <strong class="review-author">${review.user}</strong>
                            <div class="star-rating">${reviewStars}</div>
                        </div>
                        <p class="mt-2 mb-1">"${review.comment}"</p>
                        <small class="text-muted">${review.date}</small>
                    </div>
                `;
});
reviews.innerHTML = reviewsHtml;


// User clicks About button
function backToAbout() {
    window.location.href = 'HomePage.html#About';
}
