fs = require("fs");
fs.readFile("src/example.js", "utf8", function (err, fileContents) {

	if (err) {
		console.log(err);
		return;
	}

	var string = fileContents,
		char_count = fileContents.length,
		char_i = 0,
		function_started = false,
		function_entered = false,
		parenth_count = 0,
		internal_parenth_count = 0,
		started_i = 0,
		finished_i = 0;

	for (char_i; char_i < char_count; char_i += 1) {

		if ( (char_i + 7) < char_count &&
			string.charAt(char_i) === "f" &&
			string.charAt(char_i + 1) === "u" &&
			string.charAt(char_i + 2) === "n" &&
			string.charAt(char_i + 3) === "c" &&
			string.charAt(char_i + 4) === "t" &&
			string.charAt(char_i + 5) === "i" &&
			string.charAt(char_i + 6) === "o" &&
			string.charAt(char_i + 7) === "n" ) {

			function_started = true;
			char_i += 7;

			internal_parenth_count = 0;
			started_i = char_i;

			continue;

		} else if ( string.charAt(char_i) === "{" ) {

			parenth_count += 1;
			internal_parenth_count += 1;

			if (internal_parenth_count === 1 && function_started) {

				function_entered = true;
			}

		} else if ( string.charAt(char_i) === "}" ) {

			parenth_count -= 1;
			internal_parenth_count -= 1;

			if (internal_parenth_count === 0 && function_entered) {

				function_entered = false;
				function_started = false;
				finished_i = char_i;
				console.log("Function finished", string.substring(started_i + 1, finished_i + 1));
			}
		}
	}
});



// Loop through every character in a string

// Find start of a function

// Find the end of a function
// Add function to array

// Find the start of a comment

// Find the end of a comment
// Add comment to array