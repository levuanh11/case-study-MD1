let dx = (Math.random() * 2) + 2; // speed x
let dy = (Math.random() * 2) + 2; // speed y
let cx = 50; // ball x
let cy = 50; // ball y
const radius = 8; // bankinh

let rx = 300; // bar x
let ry = 245;// bar y
let rh = 5; // bar height
let rw = 50; // bar width
let lose; // lose width
let win = 0; // win width

// vẽ khung canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
lose = canvas.width / 2;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);


// vẽ và chuyển động của bóng
function animateCircle() {
    requestAnimationFrame(animateCircle);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
    ctx.strokeStyle = 'pink';
    ctx.stroke();
    cx += dx;
    cy += dy;

    //Game life
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 5, lose, 5);

    //Game win
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width / 2 - 5, 5, win, 5)
    // nếu bán kính + tâm.x của đường tròn lớn hon chiều ngang của canvas hoặc tâm.x của đường tròn - bán kính nhỏ hơn 0 thì dx= -dx
    if (cx + radius > canvas.width || cx - radius < 0) {
        dx = -dx;
    }

    // nếu tâm.y + bán kính lớn hơn chiều y của canvas thì xét tiếp--
    // Nếu tâm.x lớn hơn bar.x và nhỏ hơn bar.x + bar.width thì dy= -dy và cộng điểm ( mỗi lần đỡ được ball)
    // else gọi đến hàm rreset
    if (cy + radius > canvas.height) {
        if (cx > rx && cx < rx + rw) {
            dy = -dy;
            win += 20;
        } else {
            reset();
        }
    }


    // điều kiện và thông báo kết thúc game
    // win + lose = canvas.width
    if (win > canvas.width / 2) {
        ctx.font = "30px Arial";
        ctx.fillText("YOU WON!", 165, 100)
        lose = canvas.width / 2;
        dx = 0;
        dy = 0;
    }
    if (lose < 0) {
        ctx.font = "30px Arial";
        ctx.fillText("YOU LOST!", 165, 100);
        // win = 0;
        dx = 0;
        dy = 0;
    }
    if (cy - radius < 0) {
        dy = -dy
    }
}


function reset() {
    cy = 10;
    lose -= 55;
}


// requestAnimationFrame(tham số) là hàm để vẽ lại hình ảnh tiếp theo
function movingBar() {
    requestAnimationFrame(movingBar);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'pink ';
    ctx.fillRect(rx, ry, rw, rh);
}


function eventHandler(e) {
    switch (e.keyCode) {
        case 37:  /* Left arrow was pressed */
            rx -= 30;
            if (rx - rw < 0) {
                rx = 0;
            }
            break;
        case 39:  /* Right arrow was pressed */
            rx += 30;
            if (rx + rw > canvas.width) {
                rx = canvas.width - rw;
            }
            break;
    }
}


// function cho button
function restart() {
    cx = 10;
    cy = 10;
    dx = (Math.random() * 2) + 2;
    dy = (Math.random() * 2) + 2;
    lose = canvas.width / 2;
    win = 0;
}


function init() {
    animateCircle();
    movingBar();
}


init();
window.addEventListener('keydown', eventHandler, true);
let button = document.getElementById('button');
button.addEventListener('click', restart);
