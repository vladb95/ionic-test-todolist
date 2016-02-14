// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ToDo', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});
angular.module('ToDo').controller('toDoController',toDoCtrl);

toDoCtrl.$inject=['$scope','$ionicModal'];
function toDoCtrl($scope,$ionicModal){
//  var vm=this;
  $scope.tasks=[{
        title:'Buy blue teapot',
        description:'I need to buy blue teapot',
        done:false
      },{
        title:'Buy red teapot',
        description:'I need to buy not blue teapot',
        done:true
      },
  ];

  $ionicModal.fromTemplateUrl('js/task.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function($ionicModal){
    $scope.modal=$ionicModal;
  });

  $scope.currentTaskId=-1;

  $scope.addNewTask=function(){
    $scope.activeTask={
      title:'',
      description:'',
      done:false
    };
    $scope.currentTaskId=-1;
    $scope.modal.show();
  };

  $scope.closeTask=function(){
    $scope.modal.hide();
  };

  $scope.openTask=function(id){
    var task=$scope.tasks[id];
    $scope.currentTaskId=id;
    $scope.activeTask={
      title:task.title,
      description:task.description,
      done:task.done
    };
    $scope.modal.show();
  };

  $scope.deleteTask=function(id){
    $scope.tasks.splice(id,1);
  };

  $scope.submitTask=function(task){
    if($scope.currentTaskId===-1){
      $scope.tasks.push(task);
    }else{
      $scope.tasks[$scope.currentTaskId]=task;
    }
    $scope.modal.hide();
  };
}
