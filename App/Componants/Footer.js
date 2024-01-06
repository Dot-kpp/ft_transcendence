window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollBottom > 20 || document.documentElement.scrollBottom > 20) {
    document.getElementById("footer").style.bottom = "0";
  } else {
    document.getElementById("footer").style.bottom = "-50px";
  }
}