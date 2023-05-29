import './style.css'

const parallax_el = document.querySelectorAll(".parallax");
const box = document.querySelector(".myBox");

let xValue = 0;
let yValue = 0;

window.addEventListener("mousemove", (event) => {
  xValue = event.clientX - window.innerWidth / 2; // x relative to center of window
  yValue = event.clientY - window.innerWidth / 2; // y relative to center of window
  // console.log(xValue, yValue);
  // console.log(parallax_el);

  box.style.transform = `translateY(${yValue})`
  console.log(box.style.color);
  //grabs all parallax layers and add to node list that we can loop through
  parallax_el.forEach((el) => {
    // el.style.transform = `translateX(calc(-50% + ${xValue})) translateY(calc(-50% + ${yValue}))`;
    // el.style.transform =  `translate(calc(-50%), calc(-50%))`; 
    // el.style.transform =  `rotate(25deg)`; 
    // el.style.transform = `scaleX(${xValue})`;
    // el.style.transform =  `translate(calc(-50% + ${xValue}), calc(-50% + ${yValue}))`; 
    // console.log(el);
  })
})
