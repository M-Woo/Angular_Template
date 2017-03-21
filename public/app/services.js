angular.module('TempServices', ['ngResource'])
// .factory('Recipe', ['$resource', function($resource) {
//   return $resource('/api/recipes/:id');
// }])
.factory('Auth', ['$window', function($window){
	return {
		saveToken: function(token){
			$window.localStorage['secretrecipes-token'] = token;
		},
		getToken: function(){
			return $window.localStorage['secretrecipes-token']
		},
		removeToken: function(){
			$window.localStorage.removeItem('secretrecipes-token');
		},
		isLoggedIn: function(){
			var token = this.getToken();
			return token ? true : false;
		},
		currentUser: function(){
			if(this.isLoggedIn()){
				var token = this.getToken();

				try{
					//Vulnerable code
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					console.log('payload', payload);
					return payload
					}
				catch(err){
					//Graceful error handling
					console.log(err);
					return false;
				}
			}
			return false;
		}
	}
}])
.factory('AuthIntercepter', ['Auth', function(Auth){
	return{
		request: function(config){
			var token = Auth.getToken();
			if(token){
				config.headers.Authorization = 'Bearer' + token;
			}
			return config;
		}
	}
}])
.factory('Alerts', ['Auth', function(Auth){
	var alerts = [];

	return{
		clear: function(){
			alerts = [];
		},
		add: function(type, msg){
			alerts.push({type: type, msg: msg});
		},
		get: function(){
			return alerts;
		}, 
		remove: function(index){
			alerts.splice(index, 1);
		}
	}
}])