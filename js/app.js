'use strict;'
// GLOBAL VARIABLES
// list of product names/image paths
var products = [['bag', 'img/bag.jpg'], ['banana', 'img/banana.jpg'
], ['bathroom', 'img/bathroom.jpg'], ['boots', 'img/boots.jpg'], ['breakfast', 'img/breakfast.jpg'], ['bubblegum', 'img/bubblegum.jpg'], ['chair', 'img/chair.jpg'], ['cthulhu', 'img/cthulhu.jpg'], ['dog-duck', 'img/dog-duck.jpg'], ['dragon', 'img/dragon.jpg'], ['pen', 'img/pen.jpg'], ['pet-sweep', 'img/pet-sweep.jpg'], ['scissors', 'img/scissors.jpg'], ['shark', 'img/shark.jpg'], ['sweep', 'img/sweep.png'], ['tauntaun', 'img/tauntaun.jpg'], ['unicorn', 'img/unicorn/jpg'], ['usb', 'img/usb.gif'], ['water-can', 'img/water-can.jpg'], ['wine-glass', 'img/wine-glass.jpg']];
// variable to store objects
var productObjects = [];

// products constructor function
function Product(productName, productImg) {
    this.name = productName;
    this.img = productImg;
    this.clicks = 0;
    this.shown = 0;
    this.clickRate = this.shown / this.clicks;
}
// instatiates all the objects into the array.
for(var i = 0; i < products.length; i++) {
    productObjects.push(new Product(products[i][0], products[i][1]));
}
function randomProductGenerator() {
    var productOne = randomProductNumber();
    var productTwo = randomProductNumber();
    var productThree = randomProductNumber();
    var imageOne = document.getElementById('productOne')
    var imageTwo = document.getElementById('productTwo');
    var imageThree = document.getElementById('productThree');
   // imageOne.setAttribute('src', productObjects[productOne].img);
    console.log(imageOne)
   // imageTwo.setAttribute('src', productObjects[productTwo].img);
   // imageThree.setAttribute('src', productObjects[productThree].img);
}
function randomProductNumber() {
    var productNumber = Math.floor(Math.random() * (products.length) + 1);
    return productNumber;
}
randomProductGenerator();