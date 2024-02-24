// Check localStorage items to set colors value
const colorsLis = document.querySelectorAll('.colors-list li');
const rootEl = document.documentElement;
let mainColor = localStorage.getItem('color_option');

if (mainColor)
{
   rootEl.style.setProperty('--main-color', mainColor);

   // Check for active class
   colorsLis.forEach(li =>
   {
      if (li.dataset.color === mainColor)
      {
         removeActiveClass(colorsLis);

         addActiveClass(li);
      }
   })
}

// Start check localStorage items to set background options

// Add array of images
let imgsArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

// Select random-backgrounds buttons
const randomBackButtons = document.querySelectorAll('.random-backgrounds button');

let yesBtn = document.querySelector('.random-backgrounds .yes');

let noBtn = document.querySelector('.random-backgrounds .no');

// Select localStorage background_options
let backgroundLocalItem = localStorage.getItem('background_option');

let backgroundNumber = localStorage.getItem("background_number");

// BackgroundOption
let backgroundOption = true;

// Variable to handle clearInterval()
let backgroundInterval;

if (backgroundLocalItem !== null)
{
   if (backgroundLocalItem === "true")
   {
      backgroundOption = true;
   }
   else
   {
      backgroundOption = false;
   }

   // Set active class according to localStorage background_option

   if (backgroundLocalItem === "true")
   {
      // Remove active class from all .random-backgrounds span
      removeActiveClass(randomBackButtons);

      // Add active class to the span that has class "no"     
      addActiveClass(yesBtn);

      yesBtn.disabled = true;

      noBtn.disabled = false;
   }
   else
   {
      // Remove active class from all .random-backgrounds spans
      removeActiveClass(randomBackButtons);

      // Add active class to the span that has class "no"
      addActiveClass(noBtn);

      yesBtn.disabled = false;

      noBtn.disabled = true;
   }
}

// Set backgroundImage according to the number of the localStorage background_number
if (backgroundNumber !== null)
{
   document
      .querySelector('.landing-page')
      .style.backgroundImage = `url("../imgs/${imgsArray[backgroundNumber]}")`;
}

// End check localStorage items to set background options

// Start reusable functions

// Remove active classes from all children
function removeActiveClass(elementsArr)
{
   // Loop on the elements and remove active classes
   elementsArr.forEach((element) =>
   {
      element.classList.remove('active');
   })
}

// Add active class 
function addActiveClass(currentEl)
{
   // Add active class to the current element
   currentEl.classList.add("active");
}

// Add & Remove active class handler
function activeHandler(elementsArr)
{
   elementsArr.forEach((element) =>
   {
      element.addEventListener("click", (e) =>
      {
         let currentEl = e.target;

         removeActiveClass(elementsArr);

         addActiveClass(currentEl);
      })
   })
}
// End reusable functions

// Start navbar elements
const navbarLinks = document.querySelectorAll('.links li a');

activeHandler(navbarLinks);
// End navbar elements

// Start Settings-box
document.querySelector('.settings-toggler i').addEventListener('click', function ()
{
   this.classList.toggle('fa-spin')
   document.querySelector('.settings-box').classList.toggle('opened');
});

// Start Switch Colors
const switchColors = (e) =>
{
   let currentEl = e.target;

   removeActiveClass(colorsLis);

   addActiveClass(currentEl);

   // Change rootEl color
   rootEl.style.setProperty('--main-color', currentEl.dataset.color);
   localStorage.setItem('color_option', currentEl.dataset.color);
}

colorsLis.forEach(li =>
{
   li.addEventListener('click', switchColors);

   return () => li.removeEventListener('click', () => switchColors(li));
})
// End Switch Colors

// Remove / Add active class on click 
randomBackButtons.forEach(button =>
{
   button.addEventListener('click', e =>
   {
      let currentBtn = e.target;

      // Remove active class on click from all buttons
      removeActiveClass(randomBackButtons);

      // Add active class on the current button
      addActiveClass(currentBtn);

      // Set background options
      if (currentBtn.dataset.background === "yes")
      {
         backgroundOption = true;

         // Disable the button to prevent executing the randomizeImgs() to many times
         yesBtn.disabled = true;

         noBtn.disabled = false

         randomizeImgs();

         localStorage.setItem('background_option', backgroundOption);
      }
      else
      {
         backgroundOption = false;

         // Disable the button to prevent executing the randomizeImgs() to many times
         yesBtn.disabled = false;

         noBtn.disabled = true;

         clearInterval(backgroundInterval);

         localStorage.setItem('background_option', backgroundOption);
      }
   })
});

// End Settings-box

// Randomize background images
function randomizeImgs()
{
   if (backgroundOption === true)
   {
      // Select landing page element
      let landingPage = document.querySelector('.landing-page');

      // Get array of imgs
      let imgsArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

      backgroundInterval = setInterval(() =>
      {
         let randomNumber = Math.floor(Math.random() * imgsArray.length);

         // Save the randomNumber in localStorage to set background-image
         localStorage.setItem("background_number", randomNumber);

         landingPage.style.backgroundImage = `url("../imgs/${imgsArray[randomNumber]}")`;
      }, 8000);
   }
}

randomizeImgs();

// Select Our Skills Section
let ourSkills = document.querySelector('.skills');

window.addEventListener('scroll', () =>
{
   // Skills Offset Top
   let skillsOffsetTop = ourSkills.offsetTop;

   // Skills Outer Height 
   let skillsOuterHeight = ourSkills.offsetHeight;

   // Window Height
   let windowHeight = window.innerHeight;

   // Window ScrollTop
   let windowScrollTop = window.scrollY;

   if (windowScrollTop > skillsOffsetTop + (skillsOuterHeight - windowScrollTop))
   {
      // Select all skill spans
      let allSkills = document.querySelectorAll('.skills .skill-progress span');

      allSkills.forEach(skill =>
      {
         skill.style.width = skill.dataset.progress;
      })
   }
})