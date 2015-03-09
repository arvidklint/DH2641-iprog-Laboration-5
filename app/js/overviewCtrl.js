dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {
	

	$scope.getMenu = function() {
		return Dinner.getFullMenu();
	}

	$scope.shortDishTitle = function(title, maxLength) {
		return Dinner.shortenDescription(title, maxLength);
	}

	$scope.getPrice = function(dish) {
	    return Dinner.getDishPrice(dish);
	}

  	$scope.getTotalMenuPrice = function() {
	    return Dinner.getTotalMenuPrice();
	}

  	$scope.toFix = function(num) {
		return num.toFixed(2);
	}

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

});