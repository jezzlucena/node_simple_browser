# File Browser

We'll implement the code for a remote file browsing API that allows listing files
in directories and getting some metadata about them.
We don't want to get the contents but only browse around folders.

Submit the finished code to us, for example using a public GitHub repo, a Cloud9
workspace, or similar.

Include a short note. In the note you should tell us what we should
look for in your submission, what you are the most proud of in the implementation and
what you wanted to have done better.

## Step 1

Implement API server.

Use restify/express to implement a Rest API server that:
 * list files and directories in a base local directory
 * get metadata (size, type, modification date, ...) about a requested file


### Bonus
(not to be fully implemented, but consider to refactor previous code or provide a stub)

To make it better, you can consider things like:
 * tests
 * how can we add API calls to configure the remote base local directory ?
 * In the future, instead of browsing only local files we want to browse some
   remote files (Google Drive, Dropbox). How can we integrate those services
   behind our API ?

## Step 2

Implement API client.

Use any framework/library (vanilla, react, angular, ...) to implement a HTML/Javascript client for the Step 1 rest API.

![example screen shot](/client_example.jpg?raw=true)
