
HIVE_APPS = {

// blogging
  broadhive:     {id: 'broadhive', name: 'Broadhive', icon: '', url: 'https://www.broadhive.org', description: ''},
  dbuzz:         {id: 'dbuzz', name: 'dBuzz', icon: '', url: 'https://d.buzz', description: ''},
  ecency:        {id: 'ecency', name: 'Ecency', icon: '', url: 'https://ecency.com/', description: ''},
  'hive.blog':   {id: 'hive.blog', name: 'Hive.blog', icon: '', url: 'https://hive.blog/', description: ''},
  leofinance:    {id: 'leofinance', name: 'LeoFinance', icon: '', url: 'https://leofinance.io/', description: ''},
  palnet:        {id: 'palnet', name: 'PALNet', icon: '', url: 'https://www.palnet.io', description: ''},
  peakd:         {id: 'peakd', name: 'PeakD', icon: '', url: 'https://peakd.com/', description: 'The intuitive way to experience everything HIVE'},
  proofofbrain:  {id: 'proofofbrain', name: 'ProofOfBrain', icon: '', url: 'https://www.proofofbrain.io', description: ''},

// gaming
  dcity:         {id: 'dcity', name: 'dCity', icon: '', url: 'https://dcity.io', description: ''},
  dcrops:        {id: 'dcrops', name: 'dCrops', icon: '', url: '', description: ''},
  exode:         {id: 'exode', name: 'EXODE', icon: '', url: 'https://exodegame.com/', description: ''},
  hashkings:     {id: 'hashkings', name: 'HashKings', icon: '', url: 'https://farm.hashkings.app/play', description: ''},
  rabona:        {id: 'rabona', name: 'Rabona', icon: '', url: 'http://rabona.io', description: ''},
  risingstar:    {id: 'risingstar', name: 'RisingStar', icon: '', url: 'https://www.risingstargame.com/', description: ''},
  splinterlands: {id: 'splinterlands', name: 'Splinterlands', icon: '', url: 'https://splinterlands.com/', description: ''},

// markets
  hivelist:      {id: 'hivelist', name: 'HiveList', icon: '', url: 'https://hivelist.io/', description: 'HiveCommerce marketplace community'},
  'hive-engine': {id: 'hive-engine', name: 'Hive Engine', icon: '', url: 'https://hive-engine.com/', description: ''},
  leodex:        {id: 'leodex', name: 'Leo Dex', icon: '', url: 'https://leodex.io', description: ''},
  nftmart:       {id: 'nftmart', name: 'NFTMart', icon: '', url: 'https://nftm.art', description: ''},
  tribaldex:     {id: 'tribaldex', name: 'Tribaldex', icon: '', url: 'https://tribaldex.com', description: ''},
  vftlab:        {id: 'vftlab', name: 'VFT Lab', icon: '', url: 'https://vftlab.finance', description: ''},

// music & art
  creativecoin:  {id: 'creativecoin', name: 'CreativeCoin', icon: '', url: 'https://www.creativecoin.xyz', description: ''},
  lensy:         {id: 'lensy', name: 'Lensy', icon: '', url: 'https://lensy.io/', description: ''},
  nftshowroom:   {id: 'nftshowroom', name: 'NFTShowroom', icon: '', url: 'https://nftshowroom.com/',  description: 'Collectible, scarce, tokenized art'},
  musicforlife:  {id: 'musicforlife', name: 'MusicForLife', icon: '', url: 'https://www.musicforlife.io', description: ''},

// utilities  
  hiveblocks:    {id: 'hiveblocks', name: 'Hiveblocks', icon: '', url: 'https://hiveblocks.com/', description: 'Hive block explorer tool'},
  hivesearcher:  {id: 'hivesearcher', name: 'Hivesearcher', icon: '', url: 'https://hivesearcher.com/', description: 'Search engine for Hive content'},
  hivestats:     {id: 'hivestats', name: 'HiveStats', icon: '', url: 'https://hivestats.io', description: ''},
  hivetasks:     {id: 'hivetasks', name: 'HiveTasks', icon: '', url: 'https://hivetasks.com/', description: ''},


// null
//  null:          {id: '', name: '', icon: '', url: '', description: ''},

}

FAVORITE_APPS = []

RECENT_APPS = []


function expandAppData(apps) {
  return apps.map((id) => {return HIVE_APPS[id]})
}


function drawMenu() {

  // data
  var data = {categories: [ 
    {name: 'Favorites',   apps: getFavorites()},
    {name: 'Recents',     apps: getRecents()},
    {name: 'ArtAndMusic', apps: expandAppData(['creativecoin', 'lensy', 'nftshowroom', 'musicforlife'])},
    {name: 'Blogging',    apps: expandAppData(['broadhive', 'dbuzz', 'ecency', 'hive.blog', 'leofinance', 'palnet', 'peakd', 'proofofbrain'])},
    {name: 'Gaming',      apps: expandAppData(['dcity', 'dcrops', 'exode', 'hashkings', 'rabona', 'risingstar', 'splinterlands'])},
    {name: 'Markets',     apps: expandAppData(['hivelist', 'hive-engine','leodex', 'nftmart', 'tribaldex', 'vftlab'])},
    {name: 'Utilities',   apps: expandAppData(['hiveblocks', 'hivestats', 'hivesearcher', 'hivetasks'])},
  ]};

  console.log(data)

  var source = document.querySelector('#menu-template').innerHTML;
  var template = Handlebars.compile(source);

  // data is passed to above template
  var output = template(data);
  document.querySelector('#menu').innerHTML = output;

  var source = document.querySelector('#submenu-template').innerHTML;
  var template = Handlebars.compile(source);

  // data is passed to above template
  var output = template(data);
  document.querySelector('#submenus').innerHTML = output;

  getFavorites().forEach( (app) => {
    Array.from(document.querySelectorAll(`a.nonfavorite#${app.id}`)).map((x) => {
      x.innerHTML = '<i class="fa fa-star" style="float:right" aria-hidden="true"></i>'
      x.className = 'favorite'
    })
  })


  function showSubmenu(event) {
    Array.from(document.querySelectorAll('.submenu')).forEach(element => {
        element.style.display = 'none'
      })

      let category = event.target.id.split('-')[1]
      document.querySelector(`#submenu-${category}`).style.display = 'block'
  }

  // set up event handlers
  data.categories.forEach(cat => {
    document.querySelector(`#cat-${cat.name}`).onclick = showSubmenu
    document.querySelector(`#cat-${cat.name}`).onmouseover = showSubmenu
  })

  Array.from(document.querySelectorAll('a.nonfavorite')).forEach(star => {
    star.onclick = (e) => {
      addFavorite(e.currentTarget.id)
      e.currentTarget.className = 'favorite'
    }
  })

  Array.from(document.querySelectorAll('a.favorite')).forEach(star => {
    star.onclick = (e) => {
      removeFavorite(e.currentTarget.id)
      e.currentTarget.className = 'nonfavorite'
    }
  })
}


function getFavorites() {
  var favorites = JSON.parse(window.localStorage.getItem('favorites'))
  if (favorites) {
    return favorites.map((id) => HIVE_APPS[id])
  }
  return []
}


function removeFavorite(id) {
  var favorites = JSON.parse(window.localStorage.getItem('favorites'))

  favorites = favorites.filter((x) => x != id)

  window.localStorage.setItem('favorites', JSON.stringify(favorites))

  drawMenu()
}


MAX_FAVORITES_COUNT = 7
MAX_RECENTS_COUNT = 7


function addFavorite(id) {
  var favorites = JSON.parse(window.localStorage.getItem('favorites'))
  if (favorites && favorites.length == MAX_FAVORITES_COUNT) {
    return
  }

  if (favorites && id) {
    favorites.push(id)
    window.localStorage.setItem('favorites', JSON.stringify(favorites))
  } else if (id) {
    window.localStorage.setItem('favorites', JSON.stringify([id]))
  }

  drawMenu()
}


function getRecents() {
  var recents = JSON.parse(window.localStorage.getItem('recents'))
  if (recents) {
    return recents.map((id) => HIVE_APPS[id])
  }
  return []
}


function updateRecents(id) {
  var recents = JSON.parse(window.localStorage.getItem('recents'))
  if (recents) {
    recents.unshift(id)
    recents.slice(0, MAX_RECENTS_COUNT) // only store MAX_RECENTS_COUNT most recent
    window.localStorage.setItem('recents', JSON.stringify(recents))
  } else {
    window.localStorage.setItem('recents', JSON.stringify([id]))
  }

  drawMenu()
}


function eraseAllData() {
  window.localStorage.removeItem('recents')
  window.localStorage.removeItem('favorites')

  // update visible menu
  drawMenu()
}


function handleClickButton(e) {
  if (typeof e.target.value !== 'undefined' && e.target.value != "") {
   chrome.runtime.sendMessage({
       url: e.target.value
     })
  }
}

function handleClickAnchor(e) {
  if (typeof e.target.href !== 'undefined' && e.target.href != "") {
    updateRecents(e.target.id)
    chrome.runtime.sendMessage({
        url: e.target.href
      })
  }
}

var buttons = document.querySelectorAll('button.dapplink')
buttons.forEach(function(button) {
 addEventListener('click', handleClickButton)
})

var anchors = document.querySelectorAll('a')
anchors.forEach(function(button) {
  addEventListener('click', handleClickAnchor)
})


document.querySelector('button#reset').onclick = eraseAllData

drawMenu()
