module Api::V1
  class CreatorsController < ApiController
    before_action :require_logged_in, except: [:index, :show]

    def index
      @creators = Creator.all.order("id DESC").page(params[:page]).per(params[:limit]).includes(:stories)
    end

    def show
      @creator = Creator.find(params[:id])
    end

    def me
      @creator = current_creator
    end
  end
end
