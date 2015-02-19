class HomeController < ApplicationController
  def index
  end

  def auth_callback
    @auth = request.env["omniauth.auth"]
    @creator = Creator.find_or_create_by_auth(@auth)
    payload = Hash.new
    payload[:creatorId] = @creator.id
    payload[:exp] = 2.hours.from_now.to_i()
    cookies[:token] = JWT.encode(payload, Rails.application.secrets.app_secret, "HS512")


    #use jwt to save creatorId, name, uid and provider

    # cookies[:token] = request.env["omniauth.auth"]['credentials']['token']
    # render json: request.env["omniauth.auth"]
    redirect_to(root_path)
  end
end
