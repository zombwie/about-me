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
const popupEl = document.getElementById("cheesy");

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
function pupup() {
    if (cheesys == false) {
        console.log("not Cheesy");
        popupEl.style.visibility = 'hidden';
    }
    else {
        console.log("cheesy");
        popupEl.style.visibility = 'visible';
    }
}

function nopupup() {
    cheesys = false;
    pupup();
}

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
            cheesys = true;
            pupup();
		}
	} else {
		alert("Du har ikke nok penger du trenger " + oppgraderingskostnad + " penger. Du er " + ~~prosent + "% av veien!");
	}
}