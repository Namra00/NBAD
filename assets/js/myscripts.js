function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.6)";
  document.getElementById("mySidenav").style.display = "block";

}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
  document.getElementById("mySidenav").style.display = "none";
}

function myFunction(a) {
  a.parentNode.getElementsByClassName("dropdown-content")[0].classList.toggle("show");
}
