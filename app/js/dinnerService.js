// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {

	if ($cookieStore.get("numberOfGuests") == null) {
		var numberOfGuests = 2;
	} else {
		var numberOfGuests = $cookieStore.get("numberOfGuests");
	}

	var pendingPrice = 0;
	var randomVar = "234";

	this.createMenu = function() {
		var menu = [];
		if ($cookieStore.get("menu") != null) {
			var ids = $cookieStore.get("menu");

			for (var i in ids) {
				this.Dish.get(
					{id:ids[i]},
					function(data) {
						menu.push(data);
					},
					function(data) {
						//menu = [];
					}
				);
			}
		}
		return menu;
	}


	this.getRandomVar = function() {
		return randomVar;
	}

	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
		$cookieStore.put("numberOfGuests", num);
	}

	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}

	this.setPendingPrice = function(value) {
		pendingPrice = value;
	}

	this.getPendingPrice = function() {
		return pendingPrice;
	}

	//Returns the dish that is on the menu for selected type 
	this.getSelectedDish = function(type) {
		return this.getDish(menu[type]);
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		fullMenu = [];

		for (var key in menu) {
			fullMenu.push(menu[key]);
		}

		return fullMenu;
	}

	this.shortenDescription = function(description, maxLength) {
	// Tar emot en beskrivning av en maträtt. Förkortar den till den maximalt tillåtna längden på valsidan.
		if (description.length > maxLength) {
			return description.substr(0,maxLength) + "…";
		} else {
			return description;
		}
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var ingredients = [];

		if (menu == null) {
			return;
		}

		for (var key in menu) {
			dish = menu[key];
			for (var j in dish["Ingredients"]) {
				ingredients.push(dish["Ingredients"][j]);
			}
		}

		return ingredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		var ingredients = this.getAllIngredients();
		var price = 0;
		for (var i in ingredients) {
			price += ingredients[i]["Quantity"];
		}
		return price;
	}

	this.getDishPrice = function(dish) {
		var price = 0.0;

		//var dish = this.getDish(id);

		for (i in dish["Ingredients"]) {
			price += dish["Ingredients"][i]["Quantity"];
		}

		return price;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(dish) {
		// dish = this.getDish(id);
		menu.push(dish);

		cookieMenu = []
		for (key in menu) {
			cookieMenu.push(menu[key]["RecipeID"]);
		}
		$cookieStore.put("menu", cookieMenu);

		console.log("Nu innehåller menu så här mycket: " + menu.length);
		console.log("Nu är det i cookies menu: " + $cookieStore.get("menu"));
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		for (var key in menu) {
			if (menu[key]["RecipeID"] == id) {
				delete menu[key];
			}
		}

		cookieMenu = $cookieStore.get("menu");

		for (var key in cookieMenu) {
			if (cookieMenu[key] == id) {
				delete cookieMenu[key];
				$cookieStore.put("menu", cookieMenu)
				console.log("Nu är det i cookies menu: " + $cookieStore.get("menu"));
			}
		} 
	}

	this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:20,api_key:'dvx9EUS7d1Pr8xN1Hua1iC9Qc9zn1niL'});
	this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'dvx9EUS7d1Pr8xN1Hua1iC9Qc9zn1niL'});


	var menu = this.createMenu();

	// TODO in Lab 5: Add your model code from previous labs
	// feel free to remove above example code
	// you will need to modify the model (getDish and getAllDishes) 
	// a bit to take the advantage of Angular resource service
	// check lab 5 instructions for details





	// Angular service needs to return an object that has all the
	// methods created in it. You can consider that this is instead
	// of calling var model = new DinnerModel() we did in the previous labs
	// This is because Angular takes care of creating it when needed.
	return this;

});