var $title = $('#title')
var $body = $('#body')

function Idea(title, body) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}


$('.save').on('click', function(e){
  var title = $title.val();
  var body = $body.val();
  var idea = new Idea(title, body);
  call on storeIdea prototype
  call on function that displays new ideas
  clear title input-target id
  clear body input--target id

});

Idea.prototype.storeIdea = function(idea) {
  get all ideas from local storage (JSON parse)
  push new idea to end of ideas array from local storage at end of array
  set new local storage JSON stringify
}
