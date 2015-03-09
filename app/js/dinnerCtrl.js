// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getMenu = function() {
  	return Dinner.getFullMenu();
  }

  $scope.getPrice = function(dish) {
    return Dinner.getDishPrice(dish);
  }

  $scope.getPendingPrice = function(dish) {
    return Dinner.getPendingPrice();
  }

  $scope.getTotalMenuPrice = function() {
    return Dinner.getTotalMenuPrice();
  }

  $scope.toFix = function(num) {
    return num.toFixed(2);
  }

  $scope.removeDishFromMenu = function(dishID) {
    console.log("removeFromMenu " + dishID);
    Dinner.removeDishFromMenu(dishID);
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});