import {StoreObservable} from './store';
/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */

const store = new StoreObservable({name: 'Irina', auth: true}); 
store.selectState('name').subscribe(console.log)

store.updateState({name: 'Irini', auth: true})
store.updateState({name: 'Irini', auth: true})
store.updateState({name: 'Irina', auth: true})

