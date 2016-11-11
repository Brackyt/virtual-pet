(function() {
	angular.module("VirtualPetApp")
	.component("newPet", {
		templateUrl: "app/components/newpet/newpet.html",
		controller: NewPetCtrl,
		controllerAs: "newpet"
	});

	function NewPetCtrl($http, ApplicationService, $scope, $state) {

		console.log("NewPetCtrl loaded!");

		this.newPet = {
      		petname: "",
      		species: "",
      		health: 100,
      		mood: 100,
      		stats: [
        			{
          			  name: "sleep",
         			  last: Date.now(),
			          isSleeping: "false"
			        },
			        {
			          name: "feed",
			          last: Date.now()
			        },
			        {
			          name: "clean",
			          last: Date.now()
			        },
			        {
			          name: "exercise",
			          last: Date.now()
			        },
			        {
			          name: "nurse",
			          last: Date.now()
			        }
      		]	
    	}

    	this.createPet = function(){
    		$http({
        		url: "/api/users/newPet",
       			method: "PUT",
       			data: this.newPet
      		}).then(function(res){
      			$state.go('backPlay');
      		});
    	}

	}

	NewPetCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state'];
})()