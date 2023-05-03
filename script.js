let canvas = document.getElementById("scratch");
let ctx = canvas.getContext("2d");

let pixels = canvas.width * canvas.height;
console.log('pixel:',pixels);
const init = () => {
    let gradientColor = ctx.createLinearGradient(10, 10, 135, 135);
    gradientColor.addColorStop(0, "#0ABFBC");
    gradientColor.addColorStop(1, "#FC354C");
    ctx.fillStyle = gradientColor;
    ctx.fillRect(0, 0, 200, 200);
};
window.onload = init();

let mouseX = 0;
let mouseY = 0;
let isDragged = false;

let events = {
    mouse: {
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup'
    },
    touch: {
        down: 'touchstart',
        move: 'tuchmove',
        up: 'touchend'
    }
};

let deviceType = '';

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    } catch (e) {
        deviceType = 'mouse';
        return false;
    }
};

isTouchDevice();


let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;


const getxyPos = (e) => {
    mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
    mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
}
var scrapedPixels = 0;

const scratch = (x, y) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI);
    ctx.fill();
    scratchedArea(x,y);
}
function scratchedArea(x,y){
    let scratchArea = x * y;
    scrapedPixels = scratchArea / pixels * 100;
    if(scrapedPixels > 40){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    console.log("scrapedPixels:",scrapedPixels);
}
canvas.addEventListener(events[deviceType].down,
    (e) => {
        isDragged = true;
        getxyPos(e);
        scratch(mouseX, mouseY);
    });
canvas.addEventListener(events[deviceType].move, (e) => {
    if (!isTouchDevice()) {
        e.preventDefault();
    }
    if (isDragged) {
        getxyPos(e);
        scratch(mouseX, mouseY);
    }
})
canvas.addEventListener(events[deviceType].up, () => {
    isDragged = false;
})
canvas.addEventListener("mouseleave", () => {
    isDragged = false;
});


