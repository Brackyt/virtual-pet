(function() {
	angular.module("VirtualPetApp")
	.component("statsBar", {
		templateUrl: "app/components/stats-bar/stats-bar.html",
		controller: StatsBarCtrl,
		controllerAs: "StatsBarCtrl"
	});

	function StatsBarCtrl($http, ApplicationService, $scope, $state) {

		console.log("StatsBarCtrl loaded!");
		this.healthBars = [];
		this.moodBars = [];
		this.data = ApplicationService;
		$scope.safeApply = function(fn) {
	      var phase = this.$root.$$phase;
	      if(phase == '$apply' || phase == '$digest') {
	        if(fn && (typeof(fn) === 'function')) {
	          fn();
	        }
	      } else {
	        this.$apply(fn);
	      }
	    };

    $scope.$on("update", function(event, args) {
      $scope.safeApply();
      this.healthBars = [];
      this.moodBars = [];
      this.healthBarCount = this.data.health/10;
      this.moodBarCount = this.data.mood/10;
      for(var i = 0; i < this.healthBarCount; i++){
      	this.healthBars.push(i);
      }
      for(var j = 0; j < this.moodBarCount; j++) {
      	this.moodBars.push(j);
      }
    }.bind(this))

      	this.healthBarCount = this.data.health/10;
      	this.moodBarCount = this.data.mood/10;
      	for(var i = 0; i < this.healthBarCount; i++){
      		this.healthBars.push(i);
      	}
      	for(var j = 0; j < this.moodBarCount; j++) {
      		this.moodBars.push(j);
      	}
}

	StatsBarCtrl.$inject = ['$http', 'ApplicationService', '$scope', '$state'];
})()