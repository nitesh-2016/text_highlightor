'use strict';

function appController($scope, appService) {
  $scope.paragraph = appService.highlight();
  $scope.highlightedTexts = [];
  $scope.selectedText = "";

  /**
   * Function to refresh entire text content.
   * @param highlightedTexts - all the highlighted texts.
   */
  function refreshContent(highlightedTexts) {
    $scope.highlightedTexts = $scope.highlightedTexts.concat(highlightedTexts);
    $scope.highlightedTexts.forEach((textRecord) => {
      $scope.paragraph = appService.highlight($scope.paragraph.toString(), textRecord);
    });
  }

  // Initialize content.
  appService.getAllHighlightedText().then((data) => {
    refreshContent(data);
  }).catch((err) => {
    console.error(err);
  });

  /**
   * Function to select a text when user lift up the mouse.
   */
  $scope.selectText = function () {
    if (window.getSelection) {
      $scope.selectedText = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      $scope.selectedText = document.selection.createRange().text;
    }
    appService.saveHighlightedText($scope.paragraph, $scope.selectedText).then((data) => {
      refreshContent(data);
    }).catch((err) => {
      console.error(err);
    });
  };
}

// dependencies.
var requires = [
  '$scope',
  'appService',
  appController
];
var app = angular.module('myApp', []);
app.controller('appController', requires);