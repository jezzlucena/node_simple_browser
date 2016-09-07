var fs = require("fs"),
    path = require("path"),
    mime = require("mime-types");

exports.getFiles = function(srcpath, req, res) {
  var responseBuilder = {
    srcpath: srcpath,
    directories: [],
    files: []
  };

  fs.readdir(srcpath, function (err, files) {
    if (err) {
      res.send({
        error: 'Invalid directory.'
      });
      return;
    }

    files.forEach(function (entry) {
      var stats = fs.statSync(srcpath + entry);
      var ext = path.extname(entry);
      var mime_type = mime.lookup(srcpath + entry);

      if(stats.isFile()){
        responseBuilder.files.push({
          entry,
          stats,
          ext,
          mime_type
        });
      }else if(stats.isDirectory()){
        responseBuilder.directories.push({
          entry,
          stats,
          ext,
          mime_type,
          is_dir: true
        });
      }

      console.log(entry);
    });

    res.send(responseBuilder);
    return responseBuilder;
  });
}
