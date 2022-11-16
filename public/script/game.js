const pengerS = JSON.parse(localStorage.getItem("penger"));
const nivåS = JSON.parse(localStorage.getItem("nivå"));
const spillertidS = JSON.parse(localStorage.getItem("spillertid"));
const multiplyerS = JSON.parse(localStorage.getItem("multiplyer"));
const oppgaderingskostnadS = JSON.parse(localStorage.getItem("oppgraderingskostnad"));
const minutterS = JSON.parse(localStorage.getItem("minutter"));

var penger = pengerS;
var nivå = nivåS;
var spillertid = spillertidS;
var multiplyer = multiplyerS;
var oppgraderingskostnad = oppgaderingskostnadS;
var minutter = minutterS;
var prosent = 0;
var cheesys = false;

const kostEL = document.getElementById('kost');
const pengerEl = document.getElementById("penger");
const nivåEl = document.getElementById("nivå");
const spillertidEl = document.getElementById("spillertid");
const oppgraderingsEl = document.getElementById("iBar");
const cheesyEl = document.getElementById("cheesy");
const unlockerEL = document.getElementById("unlocker");
const cmemeEl = document.getElementById("cmeme");
const memek1El = document.getElementById("meme1");
const memek2El = document.getElementById("meme2");
const memek3El = document.getElementById("meme3");
const memek4El = document.getElementById("meme4");
const sokkerEl = document.getElementById("sokker");
const godeordEl = document.getElementById("quoutes");

if (multiplyer == null) {
	nivå = 1;
	multiplyer = 1;
	penger = 100;
	oppgraderingskostnad = 100;
}
const delay = (delayInms) => {
	return new Promise(resolve => setTimeout(resolve, delayInms));
};

function teller() {
	spillertid = spillertid + 1;
	if (spillertid >= 60) {
		spillertid = 0;
		minutter = minutter + 1;
		localStorage.setItem("minutter", JSON.stringify(minutter));
	}
}
const timer = async() => {
	pengerTeller();
	let delayres = await delay(1000);
	teller();
	timer();
};
timer();
function pengerTeller() {
	penger = penger + 1 * multiplyer;
	pengerEl.innerHTML = 'Penger: ' + penger;
	spillertidEl.innerHTML = 'Spillertid: ' + minutter + ' M ' + spillertid + ' S';
	nivåEl.innerHTML = 'Nivå: ' + nivå;
	kostEL.innerHTML = 'Neste oppgradering: ' + oppgraderingskostnad;
	localStorage.setItem("penger", JSON.stringify(penger));
	localStorage.setItem("nivå", JSON.stringify(nivå));
	localStorage.setItem("spillertid", JSON.stringify(spillertid));
	localStorage.setItem("multiplyer", JSON.stringify(multiplyer));

	prosent = (penger / oppgraderingskostnad) * 100;
	if (prosent > 100) {
		prosent = 100;
	}
	oppgraderingsEl.style.width = prosent + '%';
	oppgraderingsEl.innerHTML = ~~prosent + '%';
}

function trykk() {
	penger = penger + 5;
	pengerEl.innerHTML = 'Penger: ' + penger;
	localStorage.setItem("penger", JSON.stringify(penger));
	prosent = (penger / oppgraderingskostnad) * 100;
	if (prosent > 100) {
		prosent = 100;
	}
	oppgraderingsEl.style.width = prosent + '%';
	oppgraderingsEl.innerHTML = ~~prosent + '%';
}

function oppgrader() {
	if (penger >= oppgraderingskostnad) {
		penger = penger - oppgraderingskostnad;
		nivå = nivå + 1;
		multiplyer = multiplyer + 0.5;
		oppgraderingskostnad = oppgraderingskostnad + nivå * 10;
		localStorage.setItem("oppgraderingskostnad", JSON.stringify(oppgraderingskostnad));
		kostEL.innerHTML = 'Neste oppgradering: ' + oppgraderingskostnad;
		nivåEl.innerHTML = 'Nivå: ' + nivå;
		if (nivå == 20) {
            pupup();
		}
	} else {
		alert("Du har ikke nok penger du trenger " + oppgraderingskostnad + " penger. Du er " + ~~prosent + "% av veien!");
	}
}



function memes() {
    if (nivå > 4) {
        memes = 1;
        console.log(memes)
        unlocker();
    }
    if (nivå > 9) {
        memes = memes + 1;
        console.log(memes)
        unlocker();
    }
    if (nivå > 14) {
        memes = memes + 1;
        console.log(memes)
        unlocker();
    }
    if (nivå > 19) {
        memes = memes + 1;
        console.log(memes)
        unlocker();
    }
}
function unlocker() {
    if (memes == 1) {
        document.getElementById("unlocker").style.visibility = 'visible';
        console.log("unlocker");
    }
}

memes();
function nomeme() {
    cmemeEl.style.visibility = 'hidden';
    memek1El.style.visibility = 'hidden';
    memek2El.style.visibility = 'hidden';
    memek3El.style.visibility = 'hidden';
    memek4El.style.visibility = 'hidden';
}

function mememesopp() {
    cmemeEl.style.visibility = 'visible';
    if (memes == 1) {
        memek1El.style.visibility = 'visible';
    }
    if (memes == 2) {
        memek1El.style.visibility = 'visible';
        memek2El.style.visibility = 'visible';
    }
    if (memes == 3) {
        memek1El.style.visibility = 'visible';
        memek2El.style.visibility = 'visible';
        memek3El.style.visibility = 'visible';
    }
    if (memes == 4) {
        memek1El.style.visibility = 'visible';
        memek2El.style.visibility = 'visible';
        memek3El.style.visibility = 'visible';
        memek4El.style.visibility = 'visible';
    }
}


function chesymeme() {
    cheesyEl.style.visibility = 'visible';
    cheesyEl.style.opacity = '1';
    cheesyEl.style.transition = 'opacity 1s linear';
    nomeme();
}
function sokker() {
    sokkerEl.style.visibility = 'visible';
    sokkerEl.style.opacity = '1';
    sokkerEl.style.transition = 'opacity 1s linear';
    nomeme();
}
function godeord() {
    godeordEl.style.visibility = 'visible';
    godeordEl.style.opacity = '1';
    godeordEl.style.transition = 'opacity 1s linear';
    nomeme();
}




function nomemesplayer() {
    cheesyEl.style.visibility = 'hidden';
    cheesyEl.style.opacity = '0';
    cheesyEl.style.transition = 'visibility 0s 1s, opacity 1s linear';
    sokkerEl.style.visibility = 'hidden';
    sokkerEl.style.opacity = '0';
    sokkerEl.style.transition = 'visibility 0s 1s, opacity 1s linear';
    godeordEl.style.visibility = 'hidden';
    godeordEl.style.opacity = '0';
    godeordEl.style.transition = 'visibility 0s 1s, opacity 1s linear';
}



// memes drag and drop
var pressed = false;


//cheesy
function cheld() {
    pressed = true;
    cheesymove()
}
function cunheld() {
    pressed = false;
}
function cheesymove() {
    onmousemove = function(e){
        if (pressed == true) {
        var minusx = 200;
        var minusy = 200;
        cheesyEl.style.left = e.clientX - minusx + 'px';
        cheesyEl.style.top = e.clientY - minusy + 'px';
        }
        else {
        }
    }
}
//sokker
function sheld() {
    pressed = true;
    sokkermove()
}
function sunheld() {
    pressed = false;
}
function sokkermove() {
    onmousemove = function(e){
        if (pressed == true) {
        var minusx = 200;
        var minusy = 200;
        sokkerEl.style.left = e.clientX - minusx + 'px';
        sokkerEl.style.top = e.clientY - minusy + 'px';
        }
        else {
        }
    }
}
function scm() {
    if (sheld = true) {
        if (sokkerEl.addEventListener("click", scm)) {
        sheld = false;
        console.log("sheld = false");
    }
}
}



// quoute

function qheld() {
    pressed = true;
    qoutemove()
}
function qunheld() {
    pressed = false;
}
function qoutemove() {
    onmousemove = function(e){
        if (pressed == true) {
        var minusx = 200;
        var minusy = 200;
        godeordEl.style.left = e.clientX - minusx + 'px';
        godeordEl.style.top = e.clientY - minusy + 'px';
        godeord
        }
        else {
        }
    }
}
function scm() {
    if (sheld = true) {
        if (godeordEl.addEventListener("click", scm)) {
        sheld = false;
        console.log("sheld = false");
    }
}
}

document.addEventListener("DOMContentLoaded", () => {
    const quote = document.getElementById("quoute");
    const cite = document.getElementById("qtitle");
    const button = document.getElementById("qbutton");
  
    async function updateQuote() {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      if (response.ok) {
        quote.textContent = data.content;
        cite.textContent = "- " + data.author;
      } else {
        quote.textContent = "An error occured";
        console.log(data);
      }
    }
    button.addEventListener("click", updateQuote);
    updateQuote();
  });
  
  