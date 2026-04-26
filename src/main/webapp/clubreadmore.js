//storing each club data in one nested object

let clubs = {
    "booktok": {
        name: "BookTok Club",
        tagline: "#TiktokMadeMeBuyIt",
        summary: "We're the club for readers who found their favourite books through a 30-second video at 2am. Whether it's a tearjerker, a dark romance or a five-star fantasy ,if BookTok recommended it, we've probably all bought it. Join us for weekly buddy reads, spoiler discussions and chaotic TikTok watch parties",
        members: 10,
        currentBook: "Currently Reading: It Ends with Us",
        image: "Img/db5.png",

    },
    "fantasy": {
        "name": "Fantasy Readers Club",
        "tagline": "Reality is overrated.",
        "summary": "We don’t just read; we migrate. If you’ve ever felt homesick for a place that doesn't exist or waited for a letter from an owl, you’re in the right spot. We specialize in epic world-building, complex magic systems, and falling in love with dragons (or the villain). Join us for map-drawing sessions and deep-dives into lore.",
        "members": 15,
        "currentBook": "Currently Reading: The Silent Patient",
        "image": "Img/db2.jpg"
    },

    "introvert": {
        "name": "The Quiet Corner",
        "tagline": "Read alone, together.",
        "summary": "The club for people who love books but hate small talk. Our 'meetings' consist of 45 minutes of silent reading followed by optional, low-pressure tea sipping. No forced icebreakers, no public speaking, and absolutely no 'going around the circle' to introduce yourself. Come for the books, stay for the lack of social exhaustion.",
        "members": 8,
        "currentBook": "Currently Reading: The Midnight Library",
        "image": "Img/db3.jpg"
    },

    "poetry": {
        "name": "Poetry & Verse Club",
        "tagline": "Finding the rhythm between the lines.",
        "summary": "For the souls who find meaning in a single stanza. We explore everything from classical sonnets to modern spoken word and gritty 'Instapoetry.' Whether you're here to analyze the masters or share your own secret scribbles, we provide a safe space for those who speak in metaphors and feel in rhythm.",
        "members": 12,
        "currentBook": "Currently Reading: The Sun and Her Flowers",
        "image": "Img/db4.png"
    }
};

//html reads the url
let params = new URLSearchParams(window.location.search);
let clubKey = params.get("club"); //will get booktok, fantasy etc

//need to find that club in our nested object
let club = clubs[clubKey];
if(club === undefined){
    club = clubs["booktok"];
}

// we fill in the pages
document.getElementById("clubImage").src = club.image; // booktok.image
document.getElementById("clubImage").alt = club.name;
document.getElementById("clubTitle").innerText = club.name;
document.getElementById("clubSub").innerText = club.tagline;
document.getElementById("clubSummary").innerText = club.summary;
document.getElementById("clubMembers").innerText = club.members.toLocaleString() + " members";
document.getElementById("clubCurrentBook").innerText = club.currentBook


let title = document.getElementById("modalTitle");
let msg = document.getElementById("modalMessage");
// now the join btn
// checking whether user 
let joinbtn = document.getElementById("joinBtn");
let closebtn = document.getElementById("closeBtn");

let joined = false;


function joinClub(){

    //if user has joined already, dont open
    if(joined==true){
        return;
    }

    let newMember = club.members + 1;
    title.innerText     = "Welcome to " + club.name + "!";
    msg.innerText     =  "You're officially part of the club!"

//update member count
    document.getElementById("clubMembers").innerText = newMember.toLocaleString() + " members";
    document.getElementById("modalOverlay") .classList.add("active");
    joinbtn.innerText = "Joined!";
    joinbtn.classList.add("joined");

    joined = true;
}


    function closeClub() {


    document.getElementById("modalOverlay").classList.remove("active");

    // document.getElementById("modalOverlay").addEventListener("click", function(event) {

    //     if (event.target === document.getElementById("modalOverlay")) {
    //     closeJoinModal();
    // }

}

joinbtn.addEventListener("click",joinClub);
closebtn.addEventListener("click",closeClub);




