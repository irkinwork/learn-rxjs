import {animationFrameScheduler, interval} from 'rxjs';

const ball = document.getElementById('ball');

// similar to requestAnimationFrame
animationFrameScheduler.schedule(function(position) {
    ball.style.transform = `translate3d(0, ${position}px, 0)`;
    if (position <= 300) this.schedule(position + 1);
}, 0, 0);

interval(0, animationFrameScheduler).pipe(
    takeWhile(val => val <= 300),
).subscribe((position) => {
    ball.style.transform = `translate3d(0, ${position}px, 0)`;
    if (position <= 300) this.schedule(position + 1);
})