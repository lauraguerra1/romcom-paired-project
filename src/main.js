// Create variables targetting the relevant DOM elements here 👇
var randomCoverBtn = document.querySelector(".random-cover-button");
var makeCoverBtn = document.querySelector(".make-new-button");
var homeBtn = document.querySelector('.home-button');
var viewSavedBtn = document.querySelector('.view-saved-button');
var saveBtn = document.querySelector('.save-cover-button');
var newBookBtn = document.querySelector('.create-new-book-button');
var coverImg = document.querySelector(".cover-image");
var coverTitle = document.querySelector(".cover-title");
var tagline1 = document.querySelector(".tagline-1");
var tagline2 = document.querySelector(".tagline-2");
var formView = document.querySelector('.form-view');
var homeView = document.querySelector('.home-view');
var savedView = document.querySelector('.saved-view');
var userCover = document.getElementById('cover');
var userTitle = document.getElementById('title');
var userTagline1 = document.getElementById('descriptor1');
var userTagline2 = document.getElementById('descriptor2');
var savedCoversSection = document.querySelector('.saved-covers-section');
var coverView = document.querySelector('.main-cover');
var allViews = [homeView, savedView, formView];


// We've provided a few variables below
var savedCovers = [
  createCover(
    "http://3.bp.blogspot.com/-iE4p9grvfpQ/VSfZT0vH2UI/AAAAAAAANq8/wwQZssi-V5g/s1600/Do%2BNot%2BForsake%2BMe%2B-%2BImage.jpg",
    "Sunsets and Sorrows",
    "sunsets",
    "sorrows"
  ),
];
var currentCover;

// Add your event listeners here 👇
randomCoverBtn.addEventListener('click', displayCover);
window.addEventListener('load', displayCover);
makeCoverBtn.addEventListener('click', switchToForm);
homeBtn.addEventListener('click', switchToHome);
viewSavedBtn.addEventListener('click', switchToSaved);
newBookBtn.addEventListener('click', function(event) {
  event.preventDefault()
  createUserBook()
})
saveBtn.addEventListener('click', addSavedCover);
savedCoversSection.addEventListener('dblclick', function(event) {
  deleteCover(event.target)
})
// homeView.addEventListener('click', function(event) {
//   randomizeSection(event.target)
// })

// Create your event handlers and other functions here 👇

function getAllIndexs() {
  var idx = {
    cover: getRandomIndex(covers),
    title: getRandomIndex(titles),
    descrip1: getRandomIndex(descriptors),
    descrip2: getRandomIndex(descriptors),
  };
  return idx;
}

function showCover(currCover) {
  coverImg.src = currCover.coverImg;
  coverTitle.innerText = currCover.title;
  tagline1.innerText = currCover.tagline1;
  tagline2.innerText = currCover.tagline2;
}

function displayCover() {
  var idx = getAllIndexs();
  currentCover = createCover(
    covers[idx.cover],
    titles[idx.title],
    descriptors[idx.descrip1],
    descriptors[idx.descrip2]
  );
  showCover(currentCover);
}

function switchView(selectedView) {
  for (var i = 0; i < allViews.length; i++) {
    if(allViews[i] === selectedView) {
      selectedView.classList.remove('hidden');
    }
    else {
      allViews[i].classList.add('hidden')    
    }
  }
}
 
function switchBtns(selectedView) {
  if(selectedView !== homeView) {
    homeBtn.classList.remove('hidden');
    saveBtn.classList.add('hidden');
    randomCoverBtn.classList.add('hidden');
  } else {
    homeBtn.classList.add('hidden');
    saveBtn.classList.remove('hidden');
    randomCoverBtn.classList.remove('hidden');
  }
}

function switchToForm() {
  switchView(formView);
  switchBtns(formView);
}

function switchToHome() {
  switchView(homeView);
  switchBtns(homeView);
}

function cloneSections() {
  for (var i = 0; i < savedCovers.length; i++) {
      savedCoversSection.innerHTML += `
      <section class="mini-cover" id="${savedCovers[i].id}">
        <img class="cover-image" src="${savedCovers[i].coverImg}">
        <h2 class="cover-title">${savedCovers[i].title}</h2>
        <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
        <img class="price-tag" src="./assets/price.png">
        <img class="overlay" src="./assets/overlay.png">
        </section>`
  }
}

function switchToSaved() {
  switchView(savedView);
  switchBtns(savedView);
  savedCoversSection.innerHTML = ``;
  cloneSections();
}
 
function addToData(cover) {
  if (!covers.includes(cover.coverImg)) {
    covers.push(cover.coverImg)
  }
  if (!titles.includes(cover.title)) {
    titles.push(cover.title)
  }
  if (!descriptors.includes(cover.tagline1)) {
    descriptors.push(cover.tagline1)
  }
  if (!descriptors.includes(cover.tagline2)) {
    descriptors.push(cover.tagline2)
  }
}

function createUserBook() {
  currentCover = createCover(userCover.value, userTitle.value, userTagline1.value, userTagline2.value);
  showCover(currentCover);
  addToData(currentCover);
  switchToHome();
}

function addSavedCover() {
  if (!savedCovers.includes(currentCover)){
    savedCovers.push(currentCover)
  }
}

function deleteCover(event) {
 for (var i = 0; i < savedCovers.length; i++) {
  if (savedCovers[i].id.toString() === event.parentNode.id) {
    savedCovers.splice(i ,1)
    event.parentNode.classList.add('hidden')
  }
 }
}

// function randomizeSection(event) {
//   var idx = getAllIndexs()
//   if (event.className === 'cover-image') {
//     coverImg.src = covers[idx.cover];
//     currentCover.coverImg = covers[idx.cover];
//   } else if (event.className === 'cover-title') {
//     coverTitle.innerText = titles[idx.title];
//     currentCover.title = titles[idx.title];
//   } else if (event.className === 'tagline-1') {
//     tagline1.innerText = descriptors[idx.descrip1];
//     currentCover.tagline1 = descriptors[idx.descrip1];
//   } else if (event.className === 'tagline-2') {
//     tagline2.innerText = descriptors[idx.descrip2];
//     currentCover.tagline2 = descriptors[idx.descrip2];
//   } else if (event.className === 'tagline') {
//     tagline1.innerText = descriptors[idx.descrip1];
//     tagline2.innerText = descriptors[idx.descrip2];
//     currentCover.tagline1 = descriptors[idx.descrip1];
//     currentCover.tagline2 = descriptors[idx.descrip2];
//   }
//   currentCover.id = Date.now();
// }

// We've provided two functions to get you started
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2,
  };
  return cover;
}
