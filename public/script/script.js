async function sendContact(ev) {
    ev.preventDefault();

    const baseUrl = 'http://65.108.15.66:25002/formapi?'
    const senderEmail = document.getElementById('emailInput').value;
    const senderMessage = document.getElementById('messageInput').value;

    const res = await fetch(baseUrl + 'email=' + senderEmail + '&fedback=' + senderMessage,
    {
      method: 'GET'
    });
    alert('Tak for tilbagemeldingen!');
    newcomments();
  }









  
const theme = document.getElementsByTagName('link')[0];

const themes = JSON.parse(localStorage.getItem("theme"));

var witchTheme = themes;
theme.setAttribute('href', witchTheme);

if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", JSON.stringify("style.css"));
  witchTheme = 'style.css';
  theme.setAttribute('href', witchTheme);
}

function toggleTheme() {
  if (witchTheme == 'light.css') {
      witchTheme = 'style.css';
      localStorage.setItem("theme", JSON.stringify(witchTheme));
      theme.setAttribute('href', witchTheme);
  }
  else {
      witchTheme = 'light.css';
      localStorage.setItem("theme", JSON.stringify(witchTheme));
      theme.setAttribute('href', witchTheme);
  }
}

