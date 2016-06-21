'use strict';

angular.module('library')
	.factory('UserResource', function($resource) {
		return $resource("/api/user/:id", {
			id: "@user_id",
		}, {
			update: {
				method: "PUT"
			}
		});
	});