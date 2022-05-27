//=========================================================================================================
// Global Variables
//
//
//=========================================================================================================
// Number of random color boxes defined in html
const boxArr = document.querySelectorAll('.container__box');

// Used for copying the color to the clipboard
let colorArray = new Array(boxArr.length);

//=========================================================================================================
// Initialization
// Setting up a load handler to do the main startup work once the page is fully loaded.
//
//=========================================================================================================

window.addEventListener("load", startup, false);

function startup() {

    //set the boxes with some random colours when the page is loaded
    newColors();
    
    // Add spacebar event to the document, so each time the spacebar is pressed random coours will be generated 
    // for all the colur boxes.
    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            newColors();
        }
    });

 
    // Add event listener for copy icon to copy the colour to the clipboard
    for(let i=0; i<boxArr.length; i++) {
        boxArr[i].getElementsByClassName('fa-clone')[0].addEventListener('click', (event) =>{
            navigator.clipboard.writeText(colorArray[i]);
            displayConfirmationMsg();
        });
    };

    // Add event listener for color wizard.
    for(let i=0; i<boxArr.length; i++) {
        boxArr[i].getElementsByClassName('fa-table-cells')[0].addEventListener('input', update, false);
        boxArr[i].getElementsByClassName('fa-table-cells')[0].addEventListener('change', update, false);
    };
}

//=========================================================================================================
// Generate the random value between 1 and 255
//
//
//=========================================================================================================
const getColorValue = ()=>{
    return Math.floor(Math.random()*255);
}

//=========================================================================================================
// Return a new colour in rgb
//
//
//=========================================================================================================
const getNewColor = () =>{
    return ('rgb('+getColorValue()+','+getColorValue()+','+getColorValue()+')');
}

//=========================================================================================================
// This will set the boxes background with random colours and store the color of each box in an array. 
//
//
//=========================================================================================================
const newColors = () =>{
    for(let i=0; i<boxArr.length;i++){
        let color = getNewColor();
        boxArr[i].style.backgroundColor = color; // Set the background colour

        colorArray[i] = color; // For copy to the clipboard

        // Set the color wizard value
        document.querySelector(".container__color-wizard").value = color;
    };
}

//=========================================================================================
// Display the copy message confirmation and reset the message after few seconds.
//
//
//=========================================================================================
function displayConfirmationMsg(){
    let element = document.querySelector(".copy-confirmation");
    element.innerHTML = "Color copied to the clipboard!";
  
    setTimeout(() => {
        element.innerHTML = " ";
    }, 1500);   
}

//=========================================================================================
// The update() function is called in response to the input and change event. It changes 
// the color in the document to match the new value of the color input. 
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
//=========================================================================================
function update(event) {    
    let color = event.target.value;
    this.parentElement.parentElement.style.backgroundColor = color;    
}
 


