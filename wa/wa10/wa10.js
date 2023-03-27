const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['greece1.jpg','greece2.jpg','greece3.jpg','greece4.jpg','greece5.jpg'];

/* Declaring the alternative text for each image file */
const alts = {
    'greece1.jpg' : 'first photo of greece',
    'greece2.jpg' : '2nd photo of greece',
    'greece3.jpg' : '3rd photo of greece',
    'greece4.jpg' : '4th photo of greece',
    'greece5.jpg' : '5th photo of greece'
  }


/* Looping through images */
for (const image of images) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'wa10/${image}`);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
      });


 /* Wiring up the Darken/Lighten button */
 btn.addEventListener('click', () => {
     const btnClass = btn.getAttribute('class');
     if (btnClass === 'dark') {
          btn.setAttribute('class','light');
          btn.textContent = 'Lighten';
          overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
     } else {
          btn.setAttribute('class','dark');
          btn.textContent = 'Darken';
          overlay.style.backgroundColor = 'rgba(0,0,0,0)';
        }
      });
