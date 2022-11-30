const kommentarEl = document.getElementById('kommentar');
console.log(kommentarEl);



const baseUrl = 'http://65.108.15.66:25002/coments'
var num = 0;

async function getInfo(){
  const res = await fetch(baseUrl,
  {
    method: 'GET'
  })
  const data = await res.json()
  const comments = JSON.stringify(data)
  const commentsList = JSON.parse(comments)
  kommentarEl.innerHTML = kommentarEl.innerHTML +  '<div class="commentboddy"><div id="navn"><h3>' + commentsList[num].email +'</h3></div><div id="kommentar"><a>' + commentsList[num].feedback + '</a></div><div><a>Dato: ' + commentsList[num].dato + '</a></div></div>';
  console.log(commentsList[num].email);
  console.log(commentsList[num].feedback);
  console.log(num);
    num = num + 1;
    if (num < 3) {
        getInfo();
    }
}
getInfo();
function newcomments() {
    num = 0;
    kommentarEl.innerHTML = '';
    getInfo();
}