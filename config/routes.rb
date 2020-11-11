Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get 'posts', to: 'posts#index'
  # ↑↓より簡単にトップページへアクセスできるようにするため
  root to: 'posts#index' 
  # get 'posts/new', to: 'posts#new'
  # ↑「投稿完了しました」というページは使用しないため
  post 'posts', to: 'posts#create'
end
