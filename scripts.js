var ideaArray = [];
var $title = $('#title');
var $body = $('#body');
var qualityChangers = {
  up: {
    genius: "genius",
    plausible: "genius",
    swill: "plausible"
  },
  down: {
    genius: "plausible",
    plausible: "swill",
    swill: "swill"
  }
};

$('document').ready( function() {
  var holdingValue = JSON.parse(localStorage.getItem("ideaArray"));
  if (holdingValue){
    ideaArray = holdingValue;
    renderArray();
  }
});

function renderArray() {
  $('#ideas').empty();
  for (var i = 0; i < ideaArray.length; i++) {
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
  var id = this.closest("article").id;
  deleteIdea(id);
});

function deleteIdea (id) {
  for (var i = 0; i < ideaArray.length; i++) {
    var ideaId = ideaArray[i].id;
    if (id == ideaId) ideaArray.splice(i, 1);
    localStorage.setItem("ideaArray",JSON.stringify(ideaArray));
  }
}

function Idea(title, body) {
  this.id = new Date().getTime();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function storeIdea (idea) {
  ideaArray.push(idea);
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
}

function createCard(idea) {
  $('#ideas').prepend(`<article class="newIdea" id=${idea.id}>
    <h1 id="ideaTitle" contenteditable="true">${idea.title}</h1>
    <button id="delete-btn"></button>
    <p id="ideaBody" contenteditable="true">${idea.body}</p>
    <button id="up-btn"></button>
    <button id="down-btn"></button>
    <h2>quality: ${idea.quality}</h2>
  </article>`);
}

function findIdeaByID(id) {
  return ideaArray.filter(function(idea) {
    return idea.id === id;
  })[0];
}

$("#ideas").on('click', "#up-btn", function(){
  var id = +$(this).parent().attr('id');
  var currentIdea = findIdeaByID(id);
  var ideaQuality = currentIdea.quality;
  ideaArray.forEach(function(idea) {
    if (idea.id === id) {
      idea.quality = qualityChangers.up[ideaQuality];
    }
  });
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
  renderArray();
});

$("#ideas").on('click', "#down-btn", function(){
  var id = +$(this).parent().attr('id');
  var currentIdea = findIdeaByID(id);
  var ideaQuality = currentIdea.quality;
  ideaArray.forEach(function(idea) {
    if (idea.id === id) {
      idea.quality = qualityChangers.down[ideaQuality];
    }
  });
  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
  renderArray();
});


$('#ideas').on('keyup blur', "#ideaTitle", function(e) {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    var id = +$(this).parent().attr('id');
    var currentIdea = findIdeaByID(id);
    var ideaTitle = currentIdea.title;
    var newTitle = $(this).text();
    ideaArray.forEach(function(idea) {
      if (idea.id === id) {
          idea.title = newTitle;
      }
    });
    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
    renderArray();
  }
});

$('#ideas').on('keyup blur', "#ideaBody", function(e) {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    var id = +$(this).parent().attr('id');
    var currentIdea = findIdeaByID(id);
    var ideaBody = currentIdea.body;
    var newBody = $(this).text();
    ideaArray.forEach(function(idea) {
      if (idea.id === id) {
          idea.body = newBody;
      }
    });
    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
    renderArray();
  }
});
