angular.module('docular.plugin.markdown', [])
    .controller('docular.plugin.markdown.documentationController', ['$scope', function ($scope) {
        $scope.content = $scope.documentationItem.content;
    }]);