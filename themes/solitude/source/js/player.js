if (localStorage.getItem("music") == undefined) {
  localStorage.setItem("music", "0");
};
var consoleplayer = document.getElementById("consoleplayer");
function musicsw() {
  if (localStorage.getItem("music") == "0") {
    localStorage.setItem("music", "1");
    loadmusic();
  } else {
    localStorage.setItem("music", "0");
    loadmusic();
  }
};
function loadmusic() {
  if (GLOBAL_CONFIG.player.div === false) {
    player1();
  }else{
    player2();
  }
};
function player1() {
  var playerid = document.getElementById('guiguiplayer');
  var playertips = document.getElementById('guiguiTips');
  var playerksc = document.getElementById('guiguiKsc');
  var playerlrc = document.getElementById('guiguiKsc');
  var playerjs = document.getElementById('xplayer');
  if (localStorage.getItem("music") == "1") {
    if(playerjs && playerid && playertips && playerksc && playerlrc){
      playerid.style.visibility = 'visible';
      playertips.style.visibility = 'visible';
      playerksc.style.visibility = 'visible';
      playerlrc.style.visibility = 'visible';
    }else{
      var script = document.createElement('script');
      script.id = 'xplayer';
      script.src = GLOBAL_CONFIG.player.js;
      script.setAttribute('key',GLOBAL_CONFIG.player.key);
      script.setAttribute('m','1');
      if(GLOBAL_CONFIG.player.api !== false) script.setAttribute('api',GLOBAL_CONFIG.player.api);
      document.getElementById('mplayer').appendChild(script);
    }
    if (!consoleplayer.classList.contains('on')) {
      consoleplayer.classList.add('on')
    }
  }
  else if (localStorage.getItem("music") == "0")  {
    if (playerjs && playerid && playertips && playerksc && playerlrc){
      playerid.style.visibility = 'hidden';
      playertips.style.visibility = 'hidden';
      playerksc.style.visibility = 'hidden';
      playerlrc.style.visibility = 'hidden';
      document.querySelector('.pause').click()
    }
    if (consoleplayer.classList.contains('on')) {
      consoleplayer.classList.remove('on')
    }
  }
};
function player2() {
  var playerid = document.getElementById('music');
  var playerjs = document.getElementById('xplayer');
  if (localStorage.getItem("music") == "1") {
    if(playerjs && playerid){
      playerid.style.visibility = 'visible';
    }else{
      if(GLOBAL_CONFIG.player.api !== false) {
          document.getElementById('mplayer').innerHTML = `<div id="music" key="${GLOBAL_CONFIG.player.key}" api="${GLOBAL_CONFIG.player.api}"></div>`;
      }else{
          document.getElementById('mplayer').innerHTML = `<div id="music" key="${GLOBAL_CONFIG.player.key}" ></div>`;
      }
      var script = document.createElement('script');
      script.id = 'xplayer';
      script.src = GLOBAL_CONFIG.player.js;
      document.getElementById('mplayer').appendChild(script);
    }
    if (!consoleplayer.classList.contains('on')) {
      consoleplayer.classList.add('on')
    }
  }
  else if (localStorage.getItem("music") == "0")  {
    if (playerjs && playerid){
      playerid.style.visibility = 'hidden';
      document.querySelector('.pause').click()
    }
    if (consoleplayer.classList.contains('on')) {
      consoleplayer.classList.remove('on')
    }
  }
};
loadmusic();