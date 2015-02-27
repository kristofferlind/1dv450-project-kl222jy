module Api::V1
  class HooksController < ApiController
    # before_action :require_logged_in
    
    def create
      key = request.headers['ClientKey']
      user = User.where(api_key: key).first
      if user.hooks.where(hook_params).first_or_create
        render json: {message: "hook successfully saved"}
      else
        render json: {message: "failed to create hook"}, status: 503
      end
    end
    
    private

      def hook_params
        params.require(:hook).permit(:callbackUrl, :model, :event)
      end
  end
end
