'use strict';

function appService($q, $location, $http, $sce) {
  var originalText = "Washington: The rings of Saturn may have formed much later than the planet itself, according to a new analysis of gravity science data from NASA’s Cassini spacecraft. The findings, led by scientists from Rome’s Sapienza University, indicate that Saturn’s rings formed between 10 million and 100 million years ago. From our planet’s perspective, that means Saturn’s rings may have formed during the age of dinosaurs. Saturn formed 4.5 billion years ago, in the early years of our solar system. There have been clues that its ring system is a young upstart that attached to Saturn years afterward. But how long afterward? To figure out the age of the rings, scientists needed to measure the mass of the rings, or how much material they hold. Radio signals sent to Cassini from the antennas of NASA’s Deep Space Network and the European Space Agency relayed the spacecraft’s velocity and acceleration. Once scientists knew how much gravity was pulling on Cassini, causing it to accelerate — down to a fraction of a millimeter per second — they could determine how massive the planet is and how massive the rings are.";

  /**
   * Function to tag nouns in aqua color.
   * @param subString - selected string.
   * @param nouns - nouns in selected string.
   * @return taggedString
   */
  function tagNouns(subString, nouns) {
    let taggedString = subString;
    nouns.forEach((noun) => {
      let tagNoun = '<span class="noun">' + noun + '</span>';
      taggedString = taggedString.replace(noun, tagNoun);
    });
    return taggedString;
  }

  /**
   * Function to highlight the selected text in yellow color.
   * @param string - Base string.
   * @param textRecord - contains info about selected text and nouns.
   * @return highlighted base string.
   */
  function highlight(string, textRecord) {
    string = string || originalText;
    if (!textRecord) {
      return $sce.trustAsHtml(string);
    }

    let taggedString = tagNouns(textRecord.text, textRecord.nouns);
    let highlightedText = '<span class="highlightedText">' + taggedString + '</span>';
    return $sce.trustAsHtml(string.replace(textRecord.text, highlightedText));
  }

  /**
   * Function to check if selected text is already selected.
   * @param paragraph - existing paragraph.
   * @param text - selected text.
   * @return {boolean} - true/false.
   */
  function isTextAlreadyHighlighted(paragraph, text) {
    let paragraphContent = paragraph.toString();
    if (!paragraphContent.includes(text)) {
      return true;
    }
    return false;
  }

  /**
   * Function to save highlighted in database.
   * @param paragraph - existing paragraph.
   * @param text - selected text.
   * @return {Promise} - response of server.
   */
  function saveHighlightedText(paragraph, text) {
    var deferred = $q.defer();
    if (text.trim() && !isTextAlreadyHighlighted(paragraph, text)) {
      var url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/api/highlight';

      $http.post(url, {text: text}).then(function (response) {
        console.log("success!!");
        if (response.data && response.data.data && response.data.data.length) {
          deferred.resolve(response.data.data);
        }
      }).catch(function (error) {
        deferred.reject(error);
      });
    }
    return deferred.promise;
  }

  /**
   * Function to get all highlighted texts from the server.
   * @return {Promise} - response of the server.
   */
  function getAllHighlightedText() {
    var deferred = $q.defer();
    var url = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/api/highlight';
    $http.get(url).then(function (response) {
      console.log("success!!");
      if (response.data && response.data.data && response.data.data.length) {
        deferred.resolve(response.data.data);
      } else {
        deferred.resolve([]);
      }
    }).catch(function (error) {
      deferred.reject(error);
    });
    return deferred.promise;
  }

  // Expose all the globally required functions.
  return {
    highlight: highlight,
    saveHighlightedText: saveHighlightedText,
    getAllHighlightedText: getAllHighlightedText
  }
}

// Dependencies.
var requires = [
  '$q',
  '$location',
  '$http',
  '$sce',
  appService
];
app.service('appService', requires);