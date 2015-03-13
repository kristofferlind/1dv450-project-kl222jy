class HomeController < ApplicationController
  def index
  end

  def auth_callback
    @auth = request.env["omniauth.auth"]
    @creator = Creator.find_or_create_by_auth(@auth)
    payload = Hash.new
    payload[:creatorId] = @creator.id
    payload[:exp] = 2.hours.from_now.to_i()
    @token = JWT.encode(payload, Rails.application.secrets.app_secret, "HS512")
    cookies[:token] = @token
    # redirect_to(root_path)
    # @origin = request.env['omniauth.origin'] + 'callback?token=' + @token
    @origin = request.env['omniauth.origin'] + '#/token/' + @token
    redirect_to @origin || root_path
  end
end
