const device = require('device.js')();
const isDesktop = device.desktop();

const dungeonizerDescription = document.getElementById('dungeonizerDescription');
const spaceshipIndwellerDescription = document.getElementById('spaceshipIndwellerDescription');
const maskedPointsDescription = document.getElementById('maskedPointsDescription');

if (dungeonizerDescription) {
    dungeonizerDescription.addEventListener('click', () => {
        window.open('https://mlknz.github.io/Dungeonizer.js/', '_blank');
    });
}

if (spaceshipIndwellerDescription) {
    spaceshipIndwellerDescription.addEventListener('click', () => {
        window.open('https://mlknz.github.io/spaceship-indweller/', '_blank');
    });
}

if (maskedPointsDescription) {
    maskedPointsDescription.addEventListener('click', () => {
        window.open('https://mlknz.github.io/Masked-Points-Transition/', '_blank');
    });
}

const container = document.getElementById('container');
const footer = document.getElementById('footer');

if (!isDesktop) {
    container.style.width = '100%';
    container.style.marginLeft = '0';
    footer.style.width = '100%';
    footer.style.marginLeft = '0';
}

// window.addEventListener('resize', () => {
//     console.log(window.innerWidth, window.innerHeight);
// });
