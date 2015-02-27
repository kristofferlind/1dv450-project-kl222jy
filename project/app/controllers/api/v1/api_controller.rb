module Api::V1
  class ApiController < ApplicationController
    before_action :require_api_key
    skip_before_filter :verify_authenticity_token

    rescue_from ActionController::UnknownFormat, with: :missing_format
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from JWT::ExpiredSignature, with: :not_authenticated
    rescue_from JWT::DecodeError, with: :not_authorized

    include ApiHelper

    require './lib/error_message.rb'

    protected
      #Currently logged in creator
      def current_creator
        if @current_creator.nil?
          #fetch token from cookie or headers
          token = cookies[:token] || request.headers['Authorization'].to_s.split(" ")
          #if token length is 2, its from headers
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
        if current_creator.nil?
          not_authorized
        end
      end

      def require_same
        unless current_creator?(current_creator)
          return head :forbidden
        end
      end

    private

      def require_api_key
        key = request.headers['ClientKey']
        unless key && User.find_by_api_key(key)
          return head :forbidden
        end
      end

      # -------------
      # Errorhandling
      # -------------

      def missing_format(e)
        error = ErrorMessage.new("Cannot serve requested format", "Bad request, contact developer", e)
        render json: error, status: 422
      end

      def not_found(e)
        error = ErrorMessage.new("API resource could not be found", "Requested resource could not be found", e)
        render json: error, status: 404
      end

      def not_authorized
        error = ErrorMessage.new("Not authorized, make sure token is valid and correctly sent in headers", "Not authorized")
        render json: error, status: 403
      end

      def not_authenticated(e = nil)
        error = ErrorMessage.new("Not authenticated, token has expired", "You are no longer logged in, session has expired", e)
        render json: error, status: 401
      end
  end
end
