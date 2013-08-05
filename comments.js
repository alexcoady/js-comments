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
		finished_i = 0;

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

			console.log("Function", string.substring(started_i, finished_i + 2));

			
			continue;
			
		}
	}
});