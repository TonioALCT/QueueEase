



var queue = [];  
var line = [];





function loadQueue() {
  var saved = localStorage.getItem("queue");

  if (saved === null) {
    queue = [];
  } else {
    try {
      queue = JSON.parse(saved);

      if (!Array.isArray(queue)) {
        queue = [];
      }
    } catch (error) {
      console.log("Could not read saved queue:", error);
      queue = [];
    }
  }
}


function saveQueue() {
 
  localStorage.setItem("queue", JSON.stringify(queue));
}

// Give the next queue number: 1, then 2, then 3 ...
function nextNumber() {
  var last = localStorage.getItem("lastNumber"); // the last number we gave out
  if (last === null) {                           
    last = 0;                                    
  }
  var newNumber = Number(last) + 1;              
  localStorage.setItem("lastNumber", newNumber); 
  return newNumber;                             
}


// ================= PART 2: QUEUE RULES =================
// (These use the shared list "queue". Call loadQueue() first so it is up to date.)

// Find the person who is being served right now. Gives back null if nobody.
function findServing() {
  for (var i = 0; i < queue.length; i++) {   
    if (queue[i].status === "serving") {     
      return queue[i];                      
    }
  }
  return null;                               
}

// Fill the shared list "line" with the waiting people in the right order:
// priority people first (senior, PWD, pregnant), then regular people.
// Inside each group, the smaller number goes first (first come, first served).
function makeLine() {
  line = [];                                       
  var i;                                           

  for (i = 0; i < queue.length; i++) {             
    if (queue[i].status === "waiting" && queue[i].priority === true) {
      line.push(queue[i]);                         
    }
  }
  for (i = 0; i < queue.length; i++) {             
    if (queue[i].status === "waiting" && queue[i].priority === false) {
      line.push(queue[i]);                         
    }
  }
}

// The first person in the line gives back null if the line is empty.
function findNextWaiting() {
  makeLine();                                      
  if (line.length === 0) {                        
    return null;
  }
  return line[0];                                  
}




var currentSlide = 0;                             


function showSlide() {
  var slides = document.getElementsByClassName("slide"); 
  var dots = document.getElementsByClassName("dot");     

  if (currentSlide >= slides.length) {             
    currentSlide = 0;                              
  }
  if (currentSlide < 0) {                          
    currentSlide = slides.length - 1;              
  }

  for (var i = 0; i < slides.length; i++) {        
    if (i === currentSlide) {
      slides[i].style.display = "block";           
      dots[i].className = "dot active";           
    } else {
      slides[i].style.display = "none";            
      dots[i].className = "dot";
    }
  }
}

function nextSlide() {
  currentSlide = currentSlide + 1;                 
  showSlide();
}

function previousSlide() {
  currentSlide = currentSlide - 1;                 
  showSlide();
}

// Start the slider only if this page has slides (Home and Services).
if (document.getElementsByClassName("slide").length > 0) {
  showSlide();                                     
  setInterval(nextSlide, 4000);                    
}


// Login Html Functions//


