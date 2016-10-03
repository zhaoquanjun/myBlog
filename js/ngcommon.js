/**
 * Created by Administrator on 2016/8/25.
 */
var app = angular.module('myApp',[]);
app.controller('appCtrl',function($scope){
    $scope.down = down;
    $scope.toTop = toTop;
})