module Api::V1
  class CreatorsController < ApiController
    before_action :require_logged_in, except: [:index, :show]

    def index
      render json: Creator.all
    end

    def me
      render json: current_creator
    end
  end
end
