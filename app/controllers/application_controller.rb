class ApplicationController < ActionController::Base
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
end
