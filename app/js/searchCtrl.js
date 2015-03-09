// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

	$scope.resultCount = 0;
	$scope.searched = false;
	$scope.loading = false;

	$scope.shortDishTitle = function(title, maxLength) {
		return Dinner.shortenDescription(title, maxLength);
	}

	// TODO in Lab 5: you will need to implement a method that searchers for dishes
	// including the case while the search is still running.
	$scope.search = function(query) {
		$scope.loading = true;
		$scope.status = "Searching...";
		
		Dinner.DishSearch.get(
			{title_kw:query},
			function(data) {
				$scope.searched = true;
				$scope.resultCount = data["ResultCount"];
				$scope.dishes = data.Results;
				$scope.status = "Showing " + data.Results.length + " results";
				$scope.loading = false;
			},
			function(data) {
				$scope.searched = true;
				$scope.loading = false;
				$scope.error = true;
				$scope.status = "There was an error";
			}
		);
	}

	Dinner.setPendingPrice(0);
	$scope.search("1");
});