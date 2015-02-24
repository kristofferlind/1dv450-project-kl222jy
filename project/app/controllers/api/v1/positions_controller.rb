module Api::V1
  class PositionsController < ApiController
    before_action :require_logged_in, except: [:index, :show]

  end
end
