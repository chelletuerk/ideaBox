var ideaArray = [];
var $title = $('#title');
var $body = $('#body');

$('document').ready( function() {
  var holdingValue = JSON.parse(localStorage.getItem("ideaArray"));
  if (holdingValue){
    ideaArray = holdingValue;
    repopulate();
  }
});


function repopulate() {
    for (i=0; ideaArray.length; i++) {
      createCard(ideaArray[i]);
  }
}

$('.save').on('click', function(e){
  var title = $title.val();
  var body = $body.val();
  var idea = new Idea(title, body);
  storeIdea(idea);
  createCard(idea);
  $title.val("");
  $body.val("");
});

$("#ideas").on("click", "#delete-btn", function(){
  $(this).closest("article").remove();
  var id=this.closest("article").id;
  deleteIdea(id);
});

function deleteIdea (id) {
  for (i=0; ideaArray.length; i++) {
    var ideaID = ideaArray[i].id;
    if (id == ideaID) {
      ideaArray.splice(i, 1);
    }
    localStorage.setItem("ideaArray",JSON.stringify(ideaArray));
  }
}

function Idea(title, body) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function storeIdea (idea) {
  ideaArray.push(idea);
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
};


function createCard(idea) {
  $('#ideas').prepend(`<article class="newIdea" id=${idea.id}>
  <h1>${idea.title}</h1>
  <button id="delete-btn"></button>
  <p>${idea.body}</p>
  <button id="up-btn"></button>
  <button id="down-btn"></button>
  <h2>quality: ${idea.quality}</h2>
</article>`)
};


// ROUGH DRAFT FOR QUALITY RATINGS
// $('up').on('click', function(){
// var quality = function() {
//
//   this.upQuality =  {
//     "genius": "genius",
//     "plausible": "genius",
//     "swill": "plausible"
//   }
// }
//
//   this.downQuality = {
//     "swill": "swill",
//     "plausible": "swill",
//     "genius": "plausible"
//   }
// }
//
// upQuality[currentValue]
// downQuality[currentValue]
