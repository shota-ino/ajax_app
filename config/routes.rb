Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get 'posts', to: 'posts#index'
  # ↑↓より簡単にトップページへアクセスできるようにするため
  root to: 'posts#index' 
  # get 'posts/new', to: 'posts#new'
  # ↑「投稿完了しました」というページは使用しないため
  post 'posts', to: 'posts#create'

  # get 'posts', to: 'posts#checked'←queryパラメーターで設定した場合
  # ↑必要なパラメーターは、「どのメモを既読したか」を判別するためのメモのid
  # queryパラメーターを使用した場合、/posts/?id=1とリクエストを行うと、params[:id]にてパラメーターを取得することができる
  get 'posts/:id', to: 'posts#checked'
  # ↑今回のように渡す情報が一意の情報であればpathパラメーターの方が適している
  # postのidであれば'posts/:id'のように記載するpathパラメーターの方が認識もしやすく、記述も単純
end
