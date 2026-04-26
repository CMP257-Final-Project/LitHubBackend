//okay so, first we get the using URL parameters, they help pass information about a click through its URL
const url = new URLSearchParams(window.location.search);
//window.location.search - this returns the entire string
const mood = url.get("mood");


const moods = {

  "feel-good": {
    theme: "theme-feel-good",
    emoji: "😊",
    tagline: "Sunshine in every page",
    subtext: "Books that wrap you in a warm hug",
    booksSectionTitle: "Feel-Good Reads",
    booksSectionSub: "Handpicked to lift your spirits",
    BookClubsTitle: "Clubs for Happy Readers",
    BookClubsSub: "Find your people",


    books: [
      "Img/fgb1.jpg",
      "Img/fgb2.jpg",
      "Img/fgb3.jpg",
      "Img/fgb4.jpg",
      "Img/fgb5.jpg",
      "Img/tn7.jpg",

    ],

    clubs: [
      "Img/fgc1.jpg",
      "Img/fgc2.png",
      "Img/fgc3.png",
      "Img/fgb4.png",

    ]
  },

  "cant-put-down": {
    theme: "theme-cant-put-down",
    emoji: "🔥",
    tagline: "Just one more chapter...",
    subtext: "Stories you won't be able to stop reading",
    booksSectionTitle: "Can't Put Down Reads",   
    booksSectionSub: "Warning: sleep not included", 
    BookClubsTitle: "Clubs for Addicted Readers", 
    BookClubsSub: "Find your people",               

    books: [
      "Img/cd1.jpg",
      "Img/cd2.jpg",
      "Img/cd3.jpg",
      "Img/cd4.jpg",
      "Img/cd5.jpg",
      "Img/tn6.jpg",


    ],

    clubs: [
      "Img/cdb1.png",
      "Img/cdb4.jpg",
      "Img/cdb3.png",

    ]
  },

  "dark-twisted": {
    theme: "theme-dark-twisted",
    emoji: "🖤",
    tagline: "Enter the shadows",
    subtext: "Twisted tales and dark minds",
    booksSectionTitle: "Dark & Twisted Picks",
    booksSectionSub: "Not for the faint-hearted",
    BookClubsTitle: "Clubs for the Brave",
    BookClubsSub: "Find your people",
    books: [
      "Img/cd1.jpg",
      "Img/cd2.jpg",
      "Img/cd3.jpg",
      "Img/cd4.jpg",
      "Img/cd5.jpg",
      "Img/tn6.jpg",

    ],

    clubs: [
      "Img/cdb1.png",
      "Img/cdb2.png",
      "Img/cdb3.png",


    ]
  },

  // "mind-bending": {
  //   theme: "theme-mind-bending",
  //   emoji: "🤯",
  //   tagline: "Reality is overrated",
  //   subtext: "Stories that twist your brain and flip everything",

  //   booksSectionTitle: "Mind-Bending Reads",
  //   booksSectionSub: "Plot twists you won't see coming",
  //   BookClubsTitle: "Deep Thinkers Club",
  //   BookClubsSub: "Discuss theories, endings & hidden meanings",


  //   books: [
  //     "Img/fgb1.jpg",
  //     "Img/fgb2.jpg",
  //     "Img/fgb3.jpg",
  //     "Img/fgb4.jpg",
  //     "Img/fgb5.jpg",
  //     "Img/tn7.jpg",

  //   ],

  //   clubs: [
  //     "Img/fgc1.jpg",
  //     "Img/fgc2.png",
  //     "Img/fgc3.png",
  //     "Img/fgb4.png",

  //   ]
  // },

  "laugh-out-loud": {
    theme: "theme-laugh-out-loud",
    emoji: "😂",
    tagline: "Books that feel like a comedy show",
    subtext: "Light, funny reads to brighten your day",

    booksSectionTitle: "Laugh-Out-Loud Reads",
    booksSectionSub: "Because life’s too short to be serious",
    BookClubsTitle: "Comedy Book Clubs",
    BookClubsSub: "Share laughs, memes & favorite moments",

    books: [
      "Img/fgb1.jpg",
      "Img/fgb2.jpg",
      "Img/fgb3.jpg",
      "Img/fgb4.jpg",
      "Img/fgb5.jpg",
      "Img/tn7.jpg",

    ],

    clubs: [
      "Img/lol1.png",
      "Img/fgc2.png",
      "Img/lol3.png",
      "Img/fgb4.png",

    ]
  },

  "make-me-cry": {
    theme: "theme-make-me-cry",
    emoji: "😢",
    tagline: "Bring the tissues",
    subtext: "Emotional stories that stay with you forever",

    booksSectionTitle: "Heartbreaking Reads",
    booksSectionSub: "Stories that hit you right in the feels",
    BookClubsTitle: "Emotional Readers Clubs",
    BookClubsSub: "Find your reading community",
    books: [
      "Img/fgb1.jpg",
      "Img/fgb2.jpg",
      "Img/fgb3.jpg",
      "Img/fgb4.jpg",
      "Img/fgb5.jpg",
      "Img/tn7.jpg",

    ],

    clubs: [
      "Img/mcb1.jpg",
      "Img/mcb2.png",
      "Img/mcb3.png",
      "Img/fgb4.png",

    ],
  }




}


const current = moods[mood];
document.body.classList.add(current.theme); // so the <body class=" "> changes acc to the current mood
document.getElementById("moodTagline").innerText = current.tagline;
document.getElementById("moodSub").innerText = current.subtext;
document.getElementById("moodEmoji").innerText = current.emoji;
document.getElementById("moodEmoji").innerText = current.emoji;
document.getElementById("booksSectionTitle").innerText = current.booksSectionTitle;
document.getElementById("booksSectionSub").innerText = current.booksSectionSub;
document.getElementById("BookClubsTitle").innerText = current.BookClubsTitle;





for (let i = 0; i < current.books.length; i++) {
  document.getElementById(`book${i + 1}`).src = current.books[i];


}

for (let i = 0; i < current.clubs.length; i++) {
    document.getElementById(`c${i + 1}`).src = current.clubs[i];


}
