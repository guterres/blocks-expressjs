$(function(){
  $.get('/blocks', appendToList);

  $('form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    var blockData = form.serialize();

    $.ajax({
      type: 'POST', url: '/blocks', data: blockData
    }).done(function(blockName){
      appendToList([blockName]);
      form.trigger('reset'); //clean
    });
  });

  function appendToList(blocks){
    var list = [];
    for(var i in blocks){
      block = blocks[i];
      content = "<a href='/blocks/"+block+"'>"+block+"</a>"+"<a href='#' data-block='"+block+"'>remove</a>";
      list.push($('<li>', { html: content }));
    }
    $('.block-list').append(list);
  };

  $('.block-list').on('click', 'a[data-block]', function(event){
    if(!confirm('Are you sure?')){
      return false;
    }

    var target = $(event.currentTarget); //the link element that was clicked

    $.ajax({
      type: 'DELETE', url: '/blocks/' + target.data('block')
    }).done(function(){
      target.parents('li').remove();
    });
  });
});
