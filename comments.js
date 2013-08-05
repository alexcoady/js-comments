fs = require("fs");
fs.readFile("src/example.js", "utf8", function (err, fileContents) {

	if (err) {
		console.log(err);
		return;
	}

	var string = fileContents,
		char_count = fileContents.length,
		char_i = 0,
		comment_started = false,
		comment_entered = false,
		started_i = 0,
		finished_i = 0,
		comments = [];

	for (char_i; char_i < char_count; char_i += 1) {

		if ( (char_i + 1) < char_count &&
			string.charAt(char_i) === "/" &&
			string.charAt(char_i + 1) === "*") {

			comment_started = true;
			started_i = char_i;

			char_i += 1;
			continue;

		} else if ( (char_i + 1) < char_count &&
			string.charAt(char_i) === "*" &&
			string.charAt(char_i + 1) === "/") {

			comment_started = false;
			char_i += 1;
			finished_i = char_i;

			comments.push( string.substring(started_i, finished_i + 1) );
			continue;		
		} 
	}

	var comments_count = comments.length,
		comments_i = 0,
		comment,
		lines,
		line_count,
		line_i,
		line,
		kw_index = {};

	console.log("Found", comments_count, "comments");

	for (comments_i; comments_i < comments_count; comments_i += 1) {

		comment = comments[comments_i];
		// Split lines in the comment into seperate array items
		lines = comment.match(/[^\r\n]+/g);
		line_count = lines.length;
		line_i = 0;

		for (line_i; line_i < line_count; line_i += 1) {

			line = lines[line_i];

			// Look for keywords in line
			kw_index.title = line.indexOf("@title");
			kw_index.author = line.indexOf("@author");
			kw_index.date = line.indexOf("@date");
			kw_index.param = line.indexOf("@param");
			kw_index.return = line.indexOf("@return");

			if ( kw_index.title !== -1 ) {
				console.log("Title:", line);
			}

			if ( kw_index.author !== -1 ) {
				console.log("Author:", line);
			}

			if ( kw_index.date !== -1 ) {
				console.log("Date:", line);
			}

			if ( kw_index.param !== -1 ) {
				console.log("Param:", line);
			}

			if ( kw_index.return !== -1 ) {
				console.log("Return:", line);
			}
		}
	}
});