//ここにDOMの取得からエンドポイントへのリクエストに関する記述

//「要素1つずつに対して、『クリック』した際に動作するイベント駆動」
function check() {
                //postをクラス名にもつ要素を取得
  const posts = document.querySelectorAll(".post");
  //forEachで繰り返し処理を行い要素1つずつに対して処理
  posts.forEach(function (post) {

    // 1秒間の間にtrueを付与する処理とfalseを付与する処理が、連続でおこなわれているため、その処理を止める分岐
    
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");


    //引数にclickの指定 『クリック』した際に動作する {}内に内に行う何らかの処理を記述
    post.addEventListener("click", () => { 
      //メモのidを取得(属性値)
      const postId = post.getAttribute("data-id");
      //エンドポイントを呼び出すためにまず、オブジェクトを生成
      const XHR = new XMLHttpRequest();
      //どのようなリクエストをするのかを指定する
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンスとして欲しい情報の形式を指定
      XHR.responseType = "json";

      XHR.send();

      //『↑ここまでがリクエストの送信までの処理』
      //『↓ここからがレスポンス受信後の処理』

      //レスポンスなどの受信が成功した場合に呼び出される
      XHR.onload = () => {

        // 例外処理させる
        // HTTPステータスコードが200以外の場合、ifはtrueとなり、アラートを表示する処理が行われる
        if (XHR.status != 200) {
          // エラーが生じたオブジェクトに含まれるエラーメッセージが表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // JavaScriptの処理から抜け出しこれ以下の処理は行わないようにする
          return null;          
        }

        // checkedアクションで返却したitemは、XHR.response.postで取得
        const item = XHR.response.post;
        // 既読であれば先ほどHTMLに定義した属性であるdata-checkの属性値にtrueをセット
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
          // 逆に未読であればdata-checkは属性ごと削除
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);

//window（ページ）をload（読み込み）した時に実行
window.addEventListener("load", check);