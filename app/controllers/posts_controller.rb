class PostsController < ApplicationController
  def index  # indexアクションを定義した
    # @post = Post.find(1)  # 1番目のレコードを@postに代入
    # @posts = Post.all
    # orderメソッドでidをDESC（降順）で並び替え
    @posts = Post.all.order(id: "DESC")
  end

  # def new
  # end
  # ↑newアクションは不要なので

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
    # ↑メモを保存した後にトップページへリダイレクトされるように追記
  end

  def checked
    post = Post.find(params[:id])
    # ↑URLパラメーターから、既読したメモのidが渡されるように設定され、そのidを使用して該当するレコードを取得
    # ↓if文で、post.checkedという既読であるか否かを判定するプロパティを指定
    # update↓というActiveRecordのメソッドを使用して更新
    if post.checked 
      post.update(checked: false)
          # 既読であれば「既読を解除するためにfalseへ変更」し、
    else
      post.update(checked: true)
          # 既読でなければ「既読にするためtrueへ変更」する
    end
    # 最後に
    item = Post.find(params[:id])
    # ↑更新したレコードをitem = Post.find(params[:id])で取得し直し
    render json: { post: item }
    # ↑render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却
  end

end
