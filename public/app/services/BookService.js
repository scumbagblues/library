'use strict';

angular.module('library')
	.factory('BookResource', function($resource) {
		return $resource("/api/book/:id", {
			id: "@book_id",
		}, {
			update: {
				method: "PUT"
			}
		});
	});