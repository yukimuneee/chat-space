$(function(){
  function buildHTML(message){
    var imageA = '';
    if (message.image) {
      imageA = `<img src="${message.image}" class="lower-message__image">`;
    }
    var html = `<div class="main-chat__maincontents__messages" data-message-id="${message.id}">
                  <div class="main-chat__maincontents__messeageinfomation">
                    <div class="main-chat__maincontents__messeageinfomation__username">${message.name}</div>
                    <div class="main-chat__maincontents__messeageinfomation__date">${message.date}</div>
                  </div>
                  <div class="main-chat__maincontents__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${imageA}
                  </div>
                </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__maincontents').append(html);
      $("#new_message")[0].reset();
      $('.main-chat__form__submit').prop('disabled', false);
      $('.main-chat__maincontents').animate({scrollTop: $('.main-chat__maincontents')[0].scrollHeight}, 'fast');
      
    })
    .fail(function(){
      $('.main-chat__form__submit').prop('disabled', false);
      alert("メッセージ送信に失敗しました");
    })
  })
 
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main-chat__maincontents__messages:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
      $('.main-chat__maincontents').animate({scrollTop: $('.main-chat__maincontents')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  };
  
  setInterval(reloadMessages, 7000); 
})


