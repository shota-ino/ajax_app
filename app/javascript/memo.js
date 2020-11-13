// 投稿するボタンをクリックした時

// memoという関数を定義
function memo() {
  // 「投稿する」ボタンの情報を取得（idで）
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // オブジェクトを生成し、引数にフォームの要素を渡すことで、そのフォームに入力された値を取得
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // リクエストの内容を引数へ追記(HTTPメソッドはPOST、パスは/posts、非同期通信はtrue)
    XHR.open("POST", "/posts", true);
    // //レスポンスとして欲しい情報の形式を指定
    XHR.responseType = "json";
    // メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);

    //『↑ここまでがリクエストの送信までの処理』
    //『↓ここからがレスポンス受信後の処理』

    //レスポンスなどの受信が成功した場合に呼び出される
    XHR.onload = () => {
      // 例外処理させる
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      // レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // 文字は入力されたままになってしまう,メモの入力フォームをリセットするため
      const formText = document.getElementById("content");

      // 「メモとして描画する部分のHTML」を定義
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // 要素listの直後にHTMLを追加挿入
      list.insertAdjacentHTML("afterend", HTML);
      // 「メモの入力フォームに入力されたままの文字」はリセット
      // 正確には、空の文字列に上書きされるような仕組み
      formText.value = "";
    };
    
    // submitボタンでclickする」というイベントを阻止
    e.preventDefault();
  });
}


// window（ページ）をload（読み込み）時に実行される
window.addEventListener("load", memo);
