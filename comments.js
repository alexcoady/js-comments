fs = require("fs");
fs.readFile("src/example.js", "utf8", function (err, fileContents) {

	if (err) {
		console.log(err);
		return;
	}

	var Comment = function (title, author, date, param, return_prop) {
		this.title = title;
		this.author = author;
		this.date = date;
		this.param = param;
		this.return_prop = return_prop;
	};

	Comment.prototype = {

		title: undefined,
		author: undefined,
		date: undefined,
		param: undefined,
		return_prop: undefined,

		set: function setFn (property, value) {

			this[property] = value;
		},

		get: function (property) {

			return this[property];
		},

		isValid: function isValidFn () {

			if (this.title || 
				this.author || 
				this.date || 
				this.param || 
				this.return_prop) {

				return true;
			}
			return;
		},

		getTitle: function getTitleFn () {

			return this.title;
		},

		logOut: function printOutFn () {

			console.log(this);
		},

		printAsMarkDown: function printAsMarkDownFn () {

			console.log("#", this.get("title"));
			console.log("##Author:", this.get("author"));
			console.log("##Date:", this.get("date"));
			console.log("##Param:", this.get("param"));
			console.log("##Return:", this.get("return_prop"));
		},

		getMarkdown: function getMarkdown () {

			return "#" + this.get("title") + "\n" +
			"*Author: " + this.get("author") + "\n" +
			"*Date: " + this.get("date") + "\n" +
			"*Param: " + this.get("param") + "\n" +
			"*Return: " + this.get("return_prop") + "\n\n\n";
		}
	};

	var string = fileContents,
		char_count = fileContents.length,
		char_i = 0,
		comment_started = false,
		comment_entered = false,
		started_i = 0,
		finished_i = 0,
		comments_string_array = [];

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

			comments_string_array.push( string.substring(started_i, finished_i + 1) );
			continue;		
		} 
	}

	var comments_count = comments_string_array.length,
		comments_i = 0,
		comment_string,
		lines,
		line_count,
		line_i,
		line,
		kw_index = {},
		comments = [];

	for (comments_i; comments_i < comments_count; comments_i += 1) {

		comment_string = comments_string_array[comments_i];
		// Split lines in the comment into seperate array items
		lines = comment_string.match(/[^\r\n]+/g);
		line_count = lines.length;
		line_i = 0;

		var comment = new Comment();

		for (line_i; line_i < line_count; line_i += 1) {

			line = lines[line_i].trim();

			if ( line.charAt(0) === "*" ) {

				line = line.substring(1).trim();
			}

			kw_index.title = line.indexOf("@title");
			kw_index.author = line.indexOf("@author");
			kw_index.date = line.indexOf("@date");
			kw_index.param = line.indexOf("@param");
			kw_index.return_prop = line.indexOf("@return");


			if ( kw_index.title !== -1 ) {

				comment.set("title", line.substring(kw_index.title + 7));

			} else if ( kw_index.author !== -1 ) {

				comment.set("author", line.substring(kw_index.author + 8));
			
			} else if ( kw_index.date !== -1 ) {

				comment.set("date", line.substring(kw_index.date + 6));
			
			} else if ( kw_index.param !== -1 ) {

				comment.set("param", line.substring(kw_index.param + 7));

			} else if ( kw_index.return_prop !== -1 ) {

				comment.set("return_prop", line.substring(kw_index.return_prop + 8));

			} else if (comment.isValid()) {

				comments.push(comment);

			}
		}
	}

	if (comments.length > 0) {

		console.log(comments.length);

		var markdown = "";

		for (var i = 0; i < comments.length; i +=1) {

			markdown += comments[i].getMarkdown();
		}

		fs.writeFile("dist/example.md", markdown, function (err, data) {

			if (err) {

				console.log("Error writing file:", err);
				return;
			} else {

				console.log("Saved to file!");
			}
		});
	}

});