// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

	$scope.dishLoaded = false;

	$scope.search = function(dishID) {
		$scope.status = "Loading...";

		Dinner.Dish.get(
			{id:dishID},
			function(data) {
				$scope.dish = data;
				Dinner.setPendingPrice(Dinner.getDishPrice($scope.dish) * Dinner.getNumberOfGuests());
				$scope.status = "Showing dish";
				$scope.dishLoaded = true; 
			},
			function(data) {
				$scope.status = "There was an error";
			}
		);
	}

	$scope.n = function() {
		return Dinner.getNumberOfGuests();
	}

	$scope.search($routeParams.dishID);

	// $scope.fixItToTwo = function(num) {
	// 	return num.toFixed(2);
	// }

	$scope.getTotalPrice = function(dish) {
		// totalPrice = 0;

		// for (var i = 0; i < ingredients.length; i++) {
		// 	totalPrice += ingredients[i]["Quantity"];
		// }

		// return totalPrice;
		return Dinner.getDishPrice(dish);
	}

	$scope.confirmDish = function(dish) {
		Dinner.addDishToMenu(dish);
		Dinner.setPendingPrice(0);
	}

	$scope.inMenu = function(dish) {
		menu = Dinner.getFullMenu();

		for (var i = 0; i < menu.length; i++) {
			if (menu[i]["RecipeID"] == dish["RecipeID"]) {
				return true; // Det är sant att den är menyn
			}
		}
		
		return false;
	}

	$scope.toFix = function(num) {
    	return num.toFixed(2);
  	}

	
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});