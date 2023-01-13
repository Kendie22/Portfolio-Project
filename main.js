const BASE_URL = `https://newsapi.org/v2/everything?q=keyword&sortBy=popularity&apiKey=2ad82d31191e48759f08a1ee26d6afc3`
const topStoriesUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=2ad82d31191e48759f08a1ee26d6afc3`

// accessing image
const image = document.querySelector(".container", "img")
const searchResult = document.querySelector(".search-bar")
//create a variable to contain the form 
const form = document.querySelector("form");
// create a variable to contain main element
const newsStoriesRightBar = document.querySelector('#search-ul');
// format date to be year- month- date (const date = Date)
const topStoriesArticle = document.querySelector("#top-stories-id")
let formattedUrl

// When the user scrolls the page, execute myFunction
// window.onscroll = function() {scrollHeader()};

// Get the header
// const header = document.getElementById("myHeader");

// Get the offset position of the navbar
// const sticky = header.offsetTop;


form.addEventListener("submit", getCurrentApi);  //make function call to get Api Data

function getCurrentApi(event) {
  event.preventDefault();
  //change to userinput
  const newsSearch = `${searchResult.value}`
   formattedUrl = BASE_URL.replace("keyword", newsSearch)
   // add the user an option for a date
   console.log(formattedUrl)
   getNewsApiData(formattedUrl, newsSearch)
  //form.reset()
}

// write a function that uses the result from the fetch to create all news search api data
getTopStories(topStoriesUrl)

function getNewsApiData(url) {
  console.log("I am in News API DATA")
  fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        //call our  function with result
          createNewsData(result);
      form.reset()
      })
      .catch((error) => {
          // call createErrorMessage function with error
         createErrorMessage(error)
          //create a section element with the class of error
         function createErrorMessage(){}
      });
}
// create a fetch for the topStoriesUrl specifically
function getTopStories(url) {
  fetch(url)
      .then((response) => response.json())
      .then((result) => {
        //create p element to hold the top story titles
          //write how you want it to show up on the page 
        const topStories = document.createElement("p")
        topStories.innerHTML = result.articles[0].title
        const topStoriesTwo = document.createElement("p")
        topStoriesTwo.innerHTML = result.articles[1].title
        const topStoriesThree = document.createElement("p")
        topStoriesThree.innerHTML = result.articles[2].title

        //append the top stories 
        topStoriesArticle.append(topStories)
        topStoriesArticle.append(topStoriesTwo)
        topStoriesArticle.append(topStoriesThree)
// console.log(result)
      })
    }

function createNewsData(result) {
  console.log("I'm inside News Data")
  let updatedUrlImage = result.articles[0].urlToImage
  console.log(updatedUrlImage)
  let updatedNewsLink = result.articles[0].url
  console.log(updatedNewsLink)
  
  newsStoriesRightBar.textContent = ""
  console.log(newsStoriesRightBar)
        const newsStories = document.createElement("p")
        newsStories.textContent = result.articles[0].description
       
        const imgUpdate = document.createElement("img")
        imgUpdate.setAttribute("src", updatedUrlImage)
        imgUpdate.setAttribute("alt", "News Image")
        imgUpdate.setAttribute("class", "right-side-bar-img")
        imgUpdate.style.cssText = "height: 50px; width: 50px;"
        const  newsTitle = document.createElement("p")
        newsTitle.innerHTML =  `<h3>${result.articles[0].title} </h3>`
         const a = document.createElement("a")
        a.setAttribute("href","#")
        a.setAttribute("name", updatedNewsLink)
        a.textContent = updatedNewsLink
        console.log(newsTitle, newsStories, imgUpdate, a)
newsStoriesRightBar.append(newsTitle, imgUpdate, newsStories)
newsTitle.append(a)

// console.log(updatedNewsLink)
          
}
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function scrollHeader() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
 
// }