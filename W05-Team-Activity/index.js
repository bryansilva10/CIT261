import HikesController from './hikesController';

//on load grab the array and insert it into the page
const myHikesController = new HikesController('hikeList');
//window.addEventListener('load', () => {
  console.log("loaded");
  myHikesController.showHikeList();
//});