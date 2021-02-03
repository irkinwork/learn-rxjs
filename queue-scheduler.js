import {queueScheduler} from 'rxjs';

// executes tasks synchronously
queueScheduler.schedule(() => {
    console.log('first queue');
    queueScheduler.schedule(() => {
        console.log('inner queue')
    })
})

console.log('sync')
