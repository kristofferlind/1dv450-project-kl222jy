module Api::V1
  class ApiController < ApplicationController
    before_action :require_api_key
    # before_action :require_logged_in

    protected
      def current_creator
        if @current_creator.nil?
          token = cookies[:token] || request.headers['Authorization'].to_s.split(" ")
          token = token[1] if token.length == 2
          payload = JWT.decode(token, Rails.application.secrets.app_secret, "HS512")
          creatorId = payload[0]["creatorId"]

          @current_creator = Creator.find(creatorId)
        end
        return @current_creator
      end

      def current_creator?(creator)
        creator == current_creator
      end

      def require_logged_in
        !current_creator.nil?
      end

    private

      def require_api_key
        key = request.headers['ClientKey']
        unless key && User.find_by_api_key(key)
          return head :forbidden
        end
      end
  end
end
