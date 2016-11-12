(function() {
	angular.module("VirtualPetApp")
	.component("nurse", {
		templateUrl: "app/components/nurse/nurse.html",
		controller: Nurse,
		controllerAs: "nurse"
	});

	function Nurse(ApplicationService, $scope) {
		var nurse = this;
		nurse.isNurseAllowed = true;

		ApplicationService.startLoop();
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

			if(Date.now() > (Number(ApplicationService.stats[4].last) + ApplicationService.actionInfos.nurse.msUntilAvailable))
			{
				nurse.isNurseAllowed =  true;
			} else {
				nurse.isNurseAllowed =  false;
			}
			console.log("nurse allowed", nurse.isNurseAllowed);
		})



		nurse.healing = function(){
			ApplicationService.calcStats("nurse", "acted");
		}

	}
	Nurse.$inject = ["ApplicationService", "$scope"];
})()