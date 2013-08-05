#JS Comments
##Node.js plugin by Alex Coady

A Node.js plugin to rip comments from your JavaScript code and create a Java-like API page ([Like this](https://github.com/alexcoady/js-comments/blob/master/dist/example.md "Have a look")).

	node comments.js

Parses all the comments in the file

## To do

*	Check if a comment relates to a function, to the page or is a floater
*	Add default values if required (Author, Date etc)
*	Display function description
*	Parse return/param data type, whatever is wrapped in (here):
	*	(String
	*	(Int)
	*	(Boolean)
	*	(Comment)
	*	(Object)
*	Add to grunt workflow
*	Loop through all scripts in a directory & create own files
*	Add header text/banner including
	*	Date processed
	*	File described
*	Better markdown stuff
	*	In-page anchors