module SessionsHelper
  #Fetch currently logged in user
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    end
  end

  #Is user the same as logged in user?
  def current_user?(user)
    user == current_user
  end

  #Is the user logged in?
  def logged_in?
    !current_user.nil?
  end

  #login, create session
  def login(user)
    session[:user_id] = user.id
  end

  #logout, destroy session
  def logout
    session.delete(:user_id)
    @current_user = nil
  end
end
