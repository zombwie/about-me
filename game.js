const pengerS = JSON.parse(localStorage.getItem("penger"));
const nivåS = JSON.parse(localStorage.getItem("nivå"));
const spillertidS = JSON.parse(localStorage.getItem("spillertid"));
const multiplyerS = JSON.parse(localStorage.getItem("multiplyer"));
const oppgaderingskostnadS = JSON.parse(localStorage.getItem("oppgraderingskostnad"));

var penger = pengerS;
var nivå = nivåS;
var spillertid = spillertidS;
var multiplyer = multiplyerS;
var oppgraderingskostnad = oppgaderingskostnadS;

const kostEL = document.getElementById('kost');
const pengerEl = document.getElementById("penger"); 
const nivåEl = document.getElementById("nivå");
const spillertidEl = document.getElementById("spillertid");

if (multiplyer == null){
    nivå = 1;
    multiplyer = 1;
    penger = 100;
    oppgraderingskostnad = 100;
}
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}
function teller() {
        spillertid = spillertid + 1;
        console.log(spillertid);
}
const timer = async () => {
    pengerTeller();
    let delayres = await delay(1000);
    teller();
    timer();
  }
timer();

function pengerTeller() {
    penger = penger + 1 * multiplyer;
    console.log("Penger:", penger);
    pengerEl.innerHTML = 'Penger: ' + penger;
    spillertidEl.innerHTML = 'Spillertid: ' + spillertid;
    nivåEl.innerHTML = 'Nivå: ' + nivå;
    kostEL.innerHTML = 'Neste oppgradering: ' + oppgraderingskostnad;
    localStorage.setItem("penger", JSON.stringify(penger));
    localStorage.setItem("nivå", JSON.stringify(nivå));
    localStorage.setItem("spillertid", JSON.stringify(spillertid));
    localStorage.setItem("multiplyer", JSON.stringify(multiplyer));
}

function trykk() {
    penger = penger + 1;
    console.log(penger);
    pengerEl.innerHTML = 'Penger: ' + penger;
    localStorage.setItem("penger", JSON.stringify(penger));
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
    }
    else {
        alert("Du har ikke nok penger du trenger " + oppgraderingskostnad + " penger");
    }
}