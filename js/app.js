var app = angular.module('flickrApp', ['ngMessages', 'ngAnimate'])
.controller('Ctrl', function($scope, $http, $timeout){

	$scope.imgFade = false;

	$scope.submit = function(){

		var url = "https://api.flickr.com/services/rest";
		var params = {
	    method: 'flickr.photos.search',
	    api_key: '64aff55713b85a93da08bc624e8e3f61',
	    tags: $scope.searchTag,
	    format: 'json',
	    nojsoncallback: 1
		};

		$http({
			url: url,
			params: params
		})
		.then(function(response){
			$scope.photos = response.data.photos.photo;

			$timeout(function() {
				$scope.imgFade = true;	
			}, 0);
			
			// Update search status
			foundStatus(response);
			},

			function(){
				searchError();
			}
		);

		// Update search status
		searchStatus();
	};

	searchStatus = function(){
		$scope.searchStatus = "Searching Flickr for '"+ $scope.searchTag +"'";

		// Reset form
		$scope.searchTag = "";
		$scope.searchForm.$setPristine();
	};

	foundStatus = function(response){
		$scope.searchStatus = "We found "+ response.data.photos.total +" results for '"+ response.config.params.tags +"'";
	};

	searchError = function(){
		$scope.searchStatus = "Sorry there was an unexpected error from the Flickr server, please try again later";
	}
});