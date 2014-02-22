var app = angular.module('NewTabApp', ['LocalStorageModule'])

.directive('keybinding', function () {
  return {
    restrict: 'E',
    scope: { invoke: '&' },
    link: function (scope, el, attr) {
      Mousetrap.bind(attr.on, scope.invoke);
    }
  };
});

function padZeros(n, len){
  var s = n.toString();
  while (s.length < len){
    s = '0' + s
  }
  return s;
}

function TimeCtrl($scope, $interval){
  $interval(function(){
    var t = new Date();
    $scope.time = padZeros(t.getHours(), 2) + ':' + padZeros(t.getMinutes(), 2) + ':' + padZeros(t.getSeconds(), 2);
  }, 1000);
}

function LinkCtrl($scope, localStorageService){
  $scope.links = localStorageService.get('links') || {};

  $scope.addLink = function(){
    $scope.links[$scope.new.name] = {url: $scope.new.url, keys:$scope.new.keys};
    localStorageService.add('links', $scope.links);
    $scope.new.name = '';
    $scope.new.url = '';
    $scope.new.keys = '';
    $('#add-form').slideUp('fast');
  }

  $scope.removeLink = function(n){
    delete $scope.links[n];
    localStorageService.add('links', $scope.links);
  }

  $scope.gotoLink = function(l){
    window.location = l;
  }

  $scope.focusSearch = function(){
    $('#search').focus();
    return false;
  }

  $scope.searchComparator = function(a, e){
    if (a.indexOf(e) !== -1){
      return true;
    }
    var s = a.split(' ');
    var t = '';
    s.forEach(function(i){
      t = t + i.substring(0,1);
    });
    if (t.indexOf(e) !== -1){
      return true;
    }
    return false;
  }

  $('#expand-form').click(function(){
    $('#add-form').slideDown('fast');
  })
}
