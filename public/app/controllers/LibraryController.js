'use strict';

angular.module('library')
	.controller('IndexBookCtrl', function($scope,$location,$timeout,BookResource,$uibModal){
	//$scope.datePattern=/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/i
	
	/**DELETE MODAL FUNCTIONALLITY**/
	$scope.removeBook = function(bookId){
		var modalInstance = $uibModal.open({
	      templateUrl: 'deletebook.html',
	      controller: 'ModalDeleteBookCtrl',
	      resolve: {
		      bookId: function () {
		          return bookId;
		      }
	      }
	    });

	    modalInstance.result.then(function () {
	      var result = BookResource.delete({id:bookId});
	      $timeout(function(){
			$scope.books = BookResource.query();
		  },500);
	    });
	};

	/**CHANGE STATUS MODAL FUNCTIONALLITY**/
	$scope.changeStatus = function(book_id,user_id){
		 var modalInstanceForBookStatus = $uibModal.open({
	      templateUrl: 'changeStatusBook.html',
	      controller: 'ModalchangeStatusBookCtrl',
	      resolve: {
		      bookId: function () {
		          return book_id;
		      },
		      userId: function () {
		          return user_id;
		      },
	      }
	    });
		
		modalInstanceForBookStatus.result.then(function () {
	      	$timeout(function(){
				$scope.books = BookResource.query();
		  	},500);
	    }); 
	};

	//First query 
	$scope.books = BookResource.query();
	
	//Pagination stuff
	$scope.itemsPerPage = 10
  	$scope.currentPage = 1;
  	$scope.pageCount = function () {
    	return Math.ceil($scope.books.length / $scope.itemsPerPage);
  	};

  	$scope.books.$promise.then(function () {
    $scope.totalItems = $scope.books.length;
    $scope.$watch('currentPage + itemsPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
        end = begin + $scope.itemsPerPage;
	  	$scope.filteredBooks = $scope.books.slice(begin, end);
      });
  	});
  	/**END of pagination stuff**/
	//Availabilty row
	$scope.showAvailability = function(user_id){
		if(user_id > 0){
			$scope.availability = 'No';
		}else{
			$scope.availability = 'Yes';
		}
		return $scope.availability;
	}		
	})
	.controller('CreateBookCtrl',function($scope,$http,BookResource,$location,$timeout){
		$scope.title = "Add book";
		$scope.button = "Save";
		$scope.Book = {};
		
		$http.get('/api/category').
		 	success(function(data, status, headers, config) {
		 	$scope.categories = data;
			$scope.selected = $scope.categories[0];	
		 });

		$scope.saveBook = function(){
			var category_id = $scope.Book.category_id.category_id;
			$scope.Book.category_id = category_id;
			var result = BookResource.save($scope.Book);
			result.$promise.then(function(data){
				$scope.ResponseDetails = data.message;
			});
			$timeout(function(){
				$location.path('/books');
			},500);
		};
	})
	.controller('EditBookCtrl', function($scope,$http,$location,BookResource,CategoryResource,$routeParams,$timeout){
		var bookId = $routeParams.id
		$scope.title = "Edit book";
		$scope.button = "Edit";

		var bookResource = BookResource.get({
			id: bookId
		});

		$scope.Book = bookResource;

		bookResource.$promise.then(function(data){
			$scope.Book.category_id = data.categories[0].category_name;
		});

		$http.get('/api/category').
		 	success(function(data, status, headers, config) {
		 	$scope.categories = data;
			$scope.selected = $scope.categories[0];	
		 });

		$scope.saveBook = function(){
			var category_id = $scope.Book.category_id.category_id;
			$scope.Book.category_id = category_id;
			var result = BookResource.update($scope.Book);
			result.$promise.then(function(data){
				$scope.ResponseDetails = data.message;
			});
			$timeout(function(){
				$location.path('/books');
			},1000);
		}
	})
	.controller('ModalDeleteBookCtrl',function($scope,$uibModalInstance){
		$scope.deleteBook = function () {
		   $uibModalInstance.close($scope.ResponseDetails);
		};

  		$scope.cancel = function () {
    	   $uibModalInstance.dismiss('cancel');
  		};
	})
	.controller('ModalchangeStatusBookCtrl',function($scope,$uibModalInstance,$http,bookId,userId,UserResource,BookResource){
		var users = UserResource.query();
		var user;
		if(userId <= 0){
			$scope.bookFree = "This book is available, Do you want assign?";
		}

		$scope.bookAvailability = function(){
			if(userId > 0){
				return true;
			}else{
				return false;
			}
		}

		$scope.users = users;
		//Functions from modal buttons
		$scope.changeUser = function (user_selected) {
			//console.log(bookId,user_selected);
			if(user_selected !== undefined){
				$http.get('/api/book/updatebookstatus/'+ bookId + '/' + user_selected).
				success(function(data, status, headers, config) {
					 console.log(data);
				});
			}
		   $uibModalInstance.close($scope.ResponseDetails);
		};

  		$scope.cancel = function () {
    	   $uibModalInstance.dismiss('cancel');
  		};
	});
