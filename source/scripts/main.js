var slideIndex = 0;
var slidetimeout;
var section_list = ["page-top", "section_1", "section_2", "section_3"];
var buttons = ["welcome", "button1", "button2", "button3", ];

showSlides();
window.onscroll = function() {scrollFunction()};
navhighlight();

document.getElementById("myVideo").volume = 0.0;

var prev = document.getElementsByClassName("prev");
prev[0].addEventListener("click", function() {nextSlide(-1);});

var next = document.getElementsByClassName("next");
next[0].addEventListener("click", function() {nextSlide(1);});

var modals = document.getElementsByClassName("modal");
var closes = document.getElementsByClassName("close")

for (var i = 0; i < modals.length; i++) {
  (function (n) {
    document.getElementById("modal"+n).addEventListener("click", function() {
      console.log("open " + n, this.className, this.id);
      event.stopPropagation();
      document.getElementById("content" + n).style.display="block";});
  }) (i);
}

for (var i = 0; i < modals.length; i++) {
  (function (n) {
    document.getElementById("close"+n).addEventListener("click", function() {
      console.log("close", this.className, this.id);
      event.stopPropagation();
      document.getElementById("content" + n).style.display="none";});
    document.getElementById("close_button"+n).addEventListener("click", function() {
      console.log("close", this.className, this.id);
      event.stopPropagation();
      document.getElementById("content" + n).style.display="none";});
  }) (i);
}


function navhighlight() {
  for (var i = 0; i < buttons.length; i++) {
    (function (n) {
      document.getElementById(buttons[n]).addEventListener("click", function() {highlight(n);});
    }) (i);
  }
}

function highlight(n) {
  var target = Math.max(0, document.getElementById(section_list[n]).offsetTop - document.getElementById("navbar").offsetHeight);
  console.log(target);
  var cur = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  var prev = cur;
  var step = 23;
  if (target < cur)
    step = -23;
  var t = window.setInterval(function(){
    var target = Math.max(0, document.getElementById(section_list[n]).offsetTop - document.getElementById("navbar").offsetHeight);
    var curY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if ((step > 0 && target > curY) || (step < 0 && target < curY)){
      window.scrollBy(0, step);
      console.log(111, curY, target);
    }else {
      console.log(222, curY, target);
      clearInterval(t);
    }
    var curY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (prev == curY)
      clearInterval(t);
    if (Math.abs(step) > Math.abs(target - curY)){
      window.scrollTo(0, target);
      clearInterval(t);
    }
    prev = curY;
  }, 10);
}


function scrollFunction() {
  var curY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
  if (curY > 80){
    document.getElementsByClassName("navbar")[0].style.fontSize = "1rem";
    document.getElementsByClassName("navbar")[0].style.padding = "1rem";
    document.getElementById("m").style.fontSize = "0.6rem";
    document.getElementById("m").style.padding = "0.4rem";
  } else {
    document.getElementsByClassName("navbar")[0].style.fontSize = "1.5rem";
    document.getElementsByClassName("navbar")[0].style.padding = "1.5rem";
    document.getElementById("m").style.fontSize = "1rem";
    document.getElementById("m").style.padding = "0.5rem";
  }
  var highlight = -1;
  for (var i = 1; i < section_list.length; i++) {
    var target = Math.max(0, document.getElementById(section_list[i]).offsetTop-document.getElementById("navbar").offsetHeight);
    if (curY+1 >= target) {
      highlight = i;
    }
  }
  for (var i = 1; i < section_list.length; i++) {
    if (i != highlight) {
        document.getElementById(buttons[i]).style.backgroundColor="black";
    } else {
      if (!document.getElementById("menu").checked)
        document.getElementById(buttons[i]).style.backgroundColor="#F7819F";
    }
  }
}


function nextSlide(n) {
  window.clearTimeout(slidetimeout);
  slideIndex += n;
  showSlides();
}

function plusSlide() {
  slideIndex++;
  showSlides();
}

function showSlides() {
  var slides = document.getElementsByClassName("carousel");
  if (slideIndex < 0)
    slideIndex = slides.length - 1;
  if (slideIndex >= slides.length)
    slideIndex = 0;
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";

  slidetimeout = window.setTimeout(plusSlide, 2500);
}
