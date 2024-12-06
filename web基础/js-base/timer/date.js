let currentDateLabel = document.querySelector('.currentDateLabel');

setInterval(function() {
    let date = new Date();
    currentDateLabel.textContent = date.toLocaleTimeString();
}, 1000);