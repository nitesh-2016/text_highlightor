// Import all required dependencies.
var WordPOS = require('wordpos');
var wordpos = new WordPOS();
var dbConnectionManager = require("./dbConnectionManager");
const collectionName = "highlights";

/**
 * Function to save highlighted text data(captured from browser) in database.
 * @param req - HttpReq
 * @param res - HttpRes
 */
function saveHighlightedText(req, res) {
  dbConnectionManager.getConnection((connErr, connection) => {
    if (connErr) {
      console.error("saveHighlightedText error - ", connErr);
      res.status(503).json({error: "Database unreachable."});
    } else {
      try {
        let selectedText = req.body || {};
        wordpos.getNouns(selectedText.text || "", (nouns) => {
          selectedText.nouns = nouns;
          connection.collection(collectionName).insert(selectedText, (insertErr, insertResult) => {
            if (insertErr) {
              console.error("saveHighlightedText error - ", insertErr);
              res.status(500).json({error: "Unknown error occurred while execution."});
            } else if (insertResult && insertResult.ops) {
              res.status(200).json({data: insertResult.ops});
            }
          });
        });
      } catch (ex) {
        console.error("saveHighlightedText exception - ", ex);
        res.status(500).json({error: "Unknown error occurred while execution."});
      }
    }
  });
}

/**
 * Function to get all the highlighted texts stored in database.
 * @param req - HttpReq
 * @param res - HttpRes
 */
function getAllHighlightedTexts(req, res) {
  dbConnectionManager.getConnection((connErr, connection) => {
    if (connErr) {
      console.error("getAllHighlightedTexts error - ", connErr);
      res.status(503).json({error: "Database unreachable."});
    } else {
      try {
        connection.collection(collectionName).find({}).toArray((findErr, findResult) => {
          if (findErr) {
            console.error("getAllHighlightedTexts error - ", findErr);
            res.status(500).json({error: "Unknown error occurred while execution."});
          } else {
            res.status(200).json({data: findResult});
          }
        });
      } catch (ex) {
        console.error("getAllHighlightedTexts exception - ", ex);
        res.status(500).json({error: "Unknown error occurred while execution."});
      }
    }
  });
}

/**
 * Exports publicly used functions.
 * @type {{saveHighlightedText: saveHighlightedText, getAllHighlightedTexts: getAllHighlightedTexts}}
 */
module.exports = {
  saveHighlightedText: saveHighlightedText,
  getAllHighlightedTexts: getAllHighlightedTexts
};