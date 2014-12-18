class ScoresController < ApplicationController
  before_action :set_score, only: [:show, :edit, :update, :destroy]

  respond_to :html, :json

  def index
    @scores = Score.all
    render json: @scores
  end

  def show
    respond_with(@score)
  end

  def new
    @score = Score.new
    respond_with(@score)
  end

  def edit
  end

  def create
    @user = current_user
    @score = Score.new(score_params)
    @score.users.push(@user)
    @score.save
    respond_with(@score)
  end

  def update
    @score.update(score_params)
    respond_with(@score)
  end

  def destroy
    @score.destroy
    respond_with(@score)
  end

  private
    def set_score
      @score = Score.find(params[:id])
    end

    def score_params
      params.require(:score).permit(:score)
    end
end
