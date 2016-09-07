var serverURL = "http://localhost:3000"
var apiURI = "/read_dir"

$(document).ready(function(){
  updateDir();

  $('#sourcepath').keypress(function (e) {
    if (e.which == 13) {
      updateDir();
    }
  });

  $('.send-btn').click(function (e) {
    updateDir();
  });
});

function populateView(entries) {
    if(entries.error){
      $('.sourcepath-area-error').html('* ' + entries.error);
      $('.sourcepath-area-error').show();
      shake($('#sourcepath'));

      $(".entries-container").html();
    }else{
      $(".entries-container").html("");
    }

   $(entries.directories).each(function(index, value){
      var div = $("<div>", {"class": "entry directory"});
      div.html("| <a href='#'>" + value.entry + "/</a>");
      console.log(div);

      div.click(function(){
        showDetails(value);
      });

      $(".entries-container").append(div);
   });

   $(entries.files).each(function(index, value){
      var div = $("<div>", {"class": "entry file"});
      div.html("<a href='#'>" + value.entry + "</a>");

      div.click(function(){
        showDetails(value);
      });

      $(".entries-container").append(div);
   });
}

function showDetails(item) {
  console.log(item);
  $('.details .name .content').html(item.entry);
  $('.details .size .content').html(item.stats.blksize);
  $('.details .created .content').html(item.stats.birthtime);
  $('.details .modified .content').html(item.stats.mtime);

  if(item.is_dir){
    $('.details .extension .content').html('N/A (Directory)');
    $('.details .mime .content').html('N/A (Directory)');
  }else{
    $('.details .extension .content').html(item.ext);
    $('.details .mime .content').html(item.mime_type);
  }
}

// Function that updates the navigated Directory using the RESTful API
function updateDir() {
  var error = false;

  // Validate the fields and show error messages
  if($('#sourcepath').val()){
    $('.sourcepath-area-error').hide();
  }else{
    $('.sourcepath-area-error').html('* Source Path is mandatory.');
    $('.sourcepath-area-error').show();
    shake($('#sourcepath'));
    error = true;
  }

  // If there's any error, don't send
  if (error) {
    return false;
  }

  // jQuery GET request via the ajax(...) function
  $.ajax({
     url: serverURL + apiURI,
     type: "GET",
     data: {
       sourcepath: $('#sourcepath').val(),
     },
     dataType: "json",
     complete: function(data) {
       var entries = data.responseJSON;
       populateView(entries);
     }
  });
}

function shake(div){
    var interval = 100;
    var distance = 10;
    var times = 4;

    $(div).css('position','relative');

    for(var iter=0;iter<(times+1);iter++){
        $(div).animate({
            left:((iter%2==0 ? distance : distance*-1))
            },interval);
    }//for

    $(div).animate({ left: 0},interval);

}//shake
