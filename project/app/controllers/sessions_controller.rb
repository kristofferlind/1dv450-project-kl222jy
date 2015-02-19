class SessionsController < ApplicationController
  #Login view, form for logging in
  def new
  end

  #Logging in, create session
  def create
    user = User.find_by(email: params[:session][:email].downcase)
    #Authenticate, was it successful?
    if user && user.authenticate(params[:session][:password])
      login(user)
      redirect_to(user)
    else
      flash.now[:danger] = "Invalid credentials"
      render('new')
    end
  end

  #Logging out, destroy session
  def destroy
    logout if logged_in?
    redirect_to(root_url)
  end
end
