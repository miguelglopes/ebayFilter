(function() {

	chrome.storage.sync.get('ebayAddon', function(storage){

		var elementsToBeHidden = []
		var elementsNotToBeHidden = []

		//get all ements
		var ul = document.getElementsByClassName("s-item");
		for (var i = 0; i < ul.length; ++i) {

			element = {"sellerPercentage":0, "soldItems":0,"element":ul[i], "link":"", "totalPrice":0};			

			//price
			var shipping = ul[i].getElementsByClassName("s-item__shipping s-item__logisticsCost")[0];
			var price = ul[i].getElementsByClassName("s-item__price")[0]
			var productPrice = price.innerHTML.match(/\d+\.\d+|\d+/g);
			if(productPrice!=null){
				productPrice=productPrice.map(Number)[productPrice.length-1];
			} else{
				elementsToBeHidden.push(element);
				continue;
			}
			var productShipping = shipping.innerHTML.match(/\d+\.\d+|\d+/g);
			if(productShipping!=null)
				productShipping=productShipping.map(Number)[0];
			else
				productShipping=0;
			var totalPrice = productPrice+productShipping;

			//description
			var sellerDescription = ul[i].getElementsByClassName("s-item__seller-info-text")[0];
			if(sellerDescription.length == 0){
				elementsToBeHidden.push(element);
				continue;
			}
			var sellerPercentage = sellerDescription.innerHTML.match(/(\d+|\d+[.,]\d{1,2})(?=\s*%)/g);
			if(sellerPercentage!=null)
				sellerPercentage=sellerPercentage.map(Number)[0];
			else
				sellerPercentage=0;
			var soldItems = sellerDescription.innerHTML.match(/(?<=\().*?(?=\))/g);
			if(soldItems!=null)
				soldItems=soldItems[0].replace(",", "");
			else
				soldItems=0;
			var link = "";

			//fill element
			element = {"sellerPercentage":sellerPercentage, "soldItems":soldItems,"element":ul[i], "link":link, "totalPrice":totalPrice};
			if(Number(sellerPercentage) < Number(storage.ebayAddon.ebaySellerRating)){
				elementsToBeHidden.push(element);
			} else if(Number(soldItems) < Number(storage.ebayAddon.ebaySellerSales)){
				elementsToBeHidden.push(element);
			} else if(Number(totalPrice) >= Number(storage.ebayAddon.ebayTotalPrice)){
				elementsToBeHidden.push(element);
			} else{
				console.log(sellerPercentage+" "+storage.ebayAddon.ebaySellerRating +" " +soldItems+ " " + storage.ebayAddon.ebaySellerSales);
				elementsNotToBeHidden.push(element);
			}
		}

		for(var i =0 ; i<elementsToBeHidden.length;++i)
			elementsToBeHidden[i]["element"].style.display = "none";

		for(var i =0 ; i<elementsNotToBeHidden.length;++i)
			elementsNotToBeHidden[i]["element"].style.display = "list-item";

	});

})();