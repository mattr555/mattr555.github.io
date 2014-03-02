function searchComparator(a, e){
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

function padZeros(n, len){
  var s = n.toString();
  while (s.length < len){
    s = '0' + s
  }
  return s;
}

function linkFilterFn(links, search){
  var l = [];
  angular.forEach(links, function(item, key){
    item['name'] = key;
    l.push(item);
  });
  if (!search){
    return l;
  } else {
    var m = [];
    l.forEach(function(i){
      if (searchComparator(i.name, search)){
        m.push(i);
      }
    });
    return m;
  }
}

var app = angular.module('NewTabApp', ['LocalStorageModule'])

.directive('keybinding', function () {
  return {
    restrict: 'E',
    scope: { invoke: '&' },
    link: function (scope, el, attr) {
      Mousetrap.bind(attr.on, scope.invoke);
    }
  };
})

.filter('linkFilter', function(){
  return linkFilterFn;
});

function TimeCtrl($scope, $interval){
  $interval(function(){
    $scope.time = moment().format('H:mm:ss');
    $scope.date = moment().format('dddd MMMM Do')
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

  $scope.checkEnter = function(e){
    if (e.keyCode === 13){
      var l = linkFilterFn($scope.links, $scope.search);
      if (l.length === 1){
        window.location = l[0]['url'];
      }
    }
  }

  $scope.expandForm = function(){
    $('#add-form').slideDown('fast');
  }
}
