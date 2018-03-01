//Define angular app
var app = angular.module('TaskManager', []); 

//controllers
app.controller('taskController', function($scope) {
    $scope.saved = localStorage.getItem('taskItems');
    $scope.taskItem = (localStorage.getItem('taskItems')!==null) ? 
    JSON.parse($scope.saved) : [ {description: "Add your To-Do", complete: false}];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));

    $scope.newTask = null;
      $scope.errormsg="";
      $scope.addNew = function (data) {
      if(data == "" || data == null)
	  {
		  $scope.errormsg="Please enter your task.";
		   return;    
	  }
	  else{
		  $scope.errormsg="";
		 $scope.taskItem.push({
                description: data,
                complete: false,
            })
	  }
        $scope.newTask = '';
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };
    $scope.deleteTask = function () {
		$scope.errormsg="";
        var completedTask = $scope.taskItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
		document.getElementById('selectAll').checked=false;
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

	 $scope.toggleAll = function() {
     var toggleStatus = !$scope.isAllSelected;
     angular.forEach($scope.taskItem, function(itm){ itm.complete = toggleStatus; });
   
  }

    $scope.save = function () {
		$scope.errormsg="";
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    }
});
