var ebayTotalPrice = document.getElementById('ebayTotalPrice');
var ebaySellerRating = document.getElementById('ebaySellerRating');
var ebaySellerSales = document.getElementById('ebaySellerSales');
var ebayRatingSubmit = document.getElementById('ebayRatingSubmit');

//get already saved values
chrome.storage.sync.get("ebayAddon", function(storage){
  ebaySellerRating.value=storage.ebayAddon.ebaySellerRating;
  ebaySellerSales.value=storage.ebayAddon.ebaySellerSales;
  ebayTotalPrice.value=storage.ebayAddon.ebayTotalPrice;
});

//onclick submit
ebayRatingSubmit.onclick = function(element) {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    chrome.storage.sync.set({
      ebayAddon:{
        ebayTotalPrice: ebayTotalPrice.value,
        ebaySellerRating: ebaySellerRating.value,
        ebaySellerSales: ebaySellerSales.value
      }
    });

    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'inject.js'});
  });
};


