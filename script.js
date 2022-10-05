let imagesArray = [];     // to store each image object that gets returned from the call to the Unsplash random image API using fetch method
let countOfImagesLoaded = 0;  // to track the number of images loaded onto the web page
let totalImagesToLoad = 30;  // to define the total amount of images to load onto the web page for EACH individual call to the unsplash image API.
let allImagesLoaded = false;

const accessKey = 'vO-FKIksPGPipWk3BWM0FZ7Mga50VPyT7ScjIx8Z3_c';
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${totalImagesToLoad}`

//  create variable elements for img and page loader , add to DOM
const imgContainer = document.querySelector('.img-container');
const loadContainer = document.getElementById('loader');



function imageLoaded(){
    countOfImagesLoaded++
    if(countOfImagesLoaded === totalImagesToLoad){
        allImagesLoaded = true;
        // set images loaded back to zero and hide page loader icon.
        countOfImagesLoaded = 0;
        hidePageLoader();
    }

}

async function getImages() {
    try {
        if(!showPageLoader()){
            showPageLoader()
        }
         const response = await fetch(ApiUrl);
        imagesArray = await response.json();       
        displayImages();
         } catch (error) {
            // catch error here
        alert(error);
    }
}

function displayImages() {
    // run function for each object of the array.
    imagesArray.forEach((image) => {
        let imageSrc = image.urls.regular
        let imageAlt = image.description
        let imageElement = document.createElement('img');
        imageElement.src = imageSrc;
        imageElement.alt = imageAlt;
        imgContainer.appendChild(imageElement);
        // add event when image is loaded to the screen.
        imageElement.addEventListener('load', imageLoaded())
       
    })
   
}

// show loader 
function showPageLoader() {
loadContainer.hidden = false;
}

// hide loader
function hidePageLoader (){
    loadContainer.hidden = true;
}

// create event to get more images when scroller reaches the bottom of the page.
window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && allImagesLoaded){
        getImages();
        allImagesLoaded = false;
    }
})


showPageLoader();
 getImages();

