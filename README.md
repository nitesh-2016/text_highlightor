# text_highlightor
TextHighlightor application which allows user to select a text and remember the decision.

## Requirements
1. Install mongodb - version 3.6
2. Start mongodb using this command -
   -> mongod --dbpath <Create a new directory and give the path here>
3. Install Node.js - version 8.x
4. In root and root/client directory, run below command -
   -> npm install


## Running the code
1. npm start (Start the server on 5000 port.)
2. Hit http://localhost:5000/ in the browser.
3. Select lines from the paragraph.
4. Selected Lines will be highlighted in yellow color.
5. Nouns in the selected lines will be highlighted in aqua color.