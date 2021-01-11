import loadingService from './loadingService';

/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */


 const loadingOverlay = document.getElementById('loading-layout');


 loadingService.loadingStatus.subscribe((isLoading) => {
     if (isLoading) {
        loadingOverlay.classList.add('open');
     } else {
        loadingOverlay.classList.remove('open');
     }
 })
 loadingService.showLoading();

 setTimeout(() => {
    loadingService.hideLoading()
 }, 3000)