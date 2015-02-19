module Api::V1
  class CreatorsController < ApiController
    # before_action :require_logged_in

    def me
      render json: current_creator
    end
  end
end
