let locationContainer = document.querySelector('.location');
let getLocation = document.querySelector('.getlocation');

/// 获取位置
getLocation.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let p = document.createElement('p');
        p.textContent = `lat:${lat}, lng:${lng}`;
        locationContainer.appendChild(p);
    });
});