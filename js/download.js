var downloadButton = document.getElementById("downloadButton");

downloadButton.addEventListener("click", function() {
    var link = document.createElement("a");
    link.download = "cv.pdf"; 
    link.href = "img//cv.pdf";
    link.click();
    downloadButton.classList.add("clicked");
});

downloadButton.addEventListener("mouseup", function() {
    downloadButton.classList.remove("clicked");
});

function game() {
    window.location.href = "http://localhost/nws/Site-IP/game";
}