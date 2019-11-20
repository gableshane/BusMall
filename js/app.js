'use strict;'
// GLOBAL VARIABLES
// list of product names/image paths
var products = [['bag', 'img/bag.jpg'], ['banana', 'img/banana.jpg'
], ['bathroom', 'img/bathroom.jpg'], ['boots', 'img/boots.jpg'], ['breakfast', 'img/breakfast.jpg'], ['bubblegum', 'img/bubblegum.jpg'], ['chair', 'img/chair.jpg'], ['cthulhu', 'img/cthulhu.jpg'], ['dog-duck', 'img/dog-duck.jpg'], ['dragon', 'img/dragon.jpg'], ['pen', 'img/pen.jpg'], ['pet-sweep', 'img/pet-sweep.jpg'], ['scissors', 'img/scissors.jpg'], ['shark', 'img/shark.jpg'], ['sweep', 'img/sweep.png'], ['tauntaun', 'img/tauntaun.jpg'], ['unicorn', 'img/unicorn.jpg'], ['usb', 'img/usb.gif'], ['water-can', 'img/water-can.jpg'], ['wine-glass', 'img/wine-glass.jpg']];
// variable to store objects
var roundLimit = 25;
var votingRoundsCounter = 1;
var productObjects = [];
var previousChoices = [];
var imageOne = document.getElementById('imgOne')
var imageTwo = document.getElementById('imgTwo');
var imageThree = document.getElementById('imgThree');
imageOne.addEventListener('click', clickHandler);
imageTwo.addEventListener('click', clickHandler);
imageThree.addEventListener('click', clickHandler);

function addElement(tag, container, text) {
    var element = document.createElement(tag);
    container.appendChild(element);
    element.textContent = text;
    return element;
}
function clickHandler(event) {
    var id = event.target.id;
    var productOne = productObjects[previousChoices[0]];
    var productTwo = productObjects[previousChoices[1]];
    var productThree = productObjects[previousChoices[2]];
    if(id === 'imgOne') {
        productOne.clicks++;
    } else if(id === 'imgTwo') {
        productTwo.clicks++;
    } else if(id === 'imgThree') {
        productThree.clicks++;
    }
    if(votingRoundsCounter < roundLimit) {
        votingRoundsCounter++;
        renderThreeChoices();
    } else {
        endProgram();
    }

}
// ends the app
function endProgram() {
    imageOne.removeEventListener('click', clickHandler);
        imageTwo.removeEventListener('click', clickHandler);
        imageThree.removeEventListener('click', clickHandler);
        //displayResults();
        displayChart();
        alert('You have chosen 25 products. Please scroll down to view the chart.')
}
// displays list of results on the left
function displayResults() {
    var listElem = document.getElementById('display');
    for(var i = 0; i < productObjects.length; i++) {
        addElement('li', listElem, productObjects[i].name + ' had ' + productObjects[i].clicks + ' votes and was shown ' + productObjects[i].shown + ' times.');
    }   
}
//displays the chart
function displayChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: createChartLabel(),
            datasets: [{
                label: 'Clicks',
                backgroundColor: 'rgb(200, 100, 100)',
                borderColor: 'rgb(200, 100, 100',
                data: createChartDataClicks()
            }, {
                label: 'Shown',
                backgroundColor: 'rgb(300, 200, 200)',
                borderColor: 'rgb(300, 200, 200',
                data: createChartDataShown()
            }]
        }, // I COPIED AND PASTED THIS FROM CHARTJS.ORG because there are a lot of freaking brackets and squiggles
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        } // END COPY AND PASTED SECTION
    });
}
// gets labels for the chart
function createChartLabel() {
    var chartLabels = [];
    for(var i = 0; i < productObjects.length; i++) {
        chartLabels.push(productObjects[i].name);
    }
    return chartLabels;
}
// gets dataset for the chart
function createChartDataClicks() {
    var chartDataClicks = [];
    for(var i = 0; i < productObjects.length; i++) {
        var newDataClicks = [productObjects[i].clicks];
        chartDataClicks.push(newDataClicks);
    }
    return chartDataClicks;
}
function createChartDataShown() {
    var chartDataShown = [];
    for(var i = 0; i < productObjects.length; i++) {
        var newDataShown = [productObjects[i].shown];
        chartDataShown.push(newDataShown);
    }
    return chartDataShown;
}
// products constructor function
function Product(productName, productImg) {
    this.name = productName;
    this.img = productImg;
    this.clicks = 0;
    this.shown = 0;
}
Product.prototype.show = function() {
    this.shown++;
}
// instatiates all the objects into the array.
for(var i = 0; i < products.length; i++) {
    productObjects.push(new Product(products[i][0], products[i][1]));
}
function randomProductGenerator() {
    var productChoices = [];
    while(productChoices.length < 3) {
        var newChoice = Math.floor(Math.random() * (products.length));
        if(!productChoices.includes(newChoice) && !previousChoices.includes(newChoice)) {
            productChoices.push(newChoice);
        }
    }
    previousChoices = productChoices.slice();
    return productChoices;
}
function renderThreeChoices() {
    var threeProducts = randomProductGenerator();
    imageOne.setAttribute('src', productObjects[threeProducts[0]].img);
    imageTwo.setAttribute('src', productObjects[threeProducts[1]].img);
    imageThree.setAttribute('src', productObjects[threeProducts[2]].img);
    productObjects[threeProducts[0]].show();
    productObjects[threeProducts[1]].show();
    productObjects[threeProducts[2]].show();
}
renderThreeChoices();