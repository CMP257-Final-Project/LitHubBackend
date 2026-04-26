document.onmousemove = function(e){
    var x = e.clientX / 50;
    var y = e.clientY / 50;

    if(x > 6) x = 6;
    if(x < -6) x = -6;

    if(y > 6) y = 6;
    if(y < -6) y = -6;
    var eyeballs = document.querySelectorAll(".eyeball");
    eyeballs.forEach(function(ball){
        ball.style.transform = "translate(" + x + "px," + y + "px)";
    });
    
    var tailX = -x / 2;
    var tailY = -y / 2;

    var tail = document.querySelector(".dot3");
    tail.style.transform = "translate(" + tailX + "px," + tailY + "px)";
}

setInterval(function(){
    var angle = Math.sin(Date.now()/400) * 8;
    var wingL = document.querySelector(".wingl");
    var wingR = document.querySelector(".wingr");

    wingL.style.transform = "rotate(" + angle + "deg)";
    wingR.style.transform = "rotate(" + (-angle) + "deg)";

},20);

function resizeOwl(){
    var owl = document.querySelector(".owl");
    if(window.innerWidth < 768){
        owl.style.transform = "scale(0.6)";
    } else {
        owl.style.transform = "scale(1)";
    }
}

resizeOwl();
window.onresize = resizeOwl;