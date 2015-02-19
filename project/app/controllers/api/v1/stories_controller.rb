module Api::V1
  class StoriesController < ApiController

    def index
      # current_creator
      render json: current_creator
    end
  end
end
