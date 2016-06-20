'use strict';

angular.module('library')
	.factory('CategoryResource', function($resource) {
		return $resource("/api/category/:id", {
			id: "@category_id",
		}, {
			update: {
				method: "PUT"
			}
		});
	});