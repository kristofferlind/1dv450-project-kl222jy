class UsersController < ApplicationController
  before_action :require_login, except: [:new, :create]
  before_action :require_same_user, only: [:show, :revoke]
  before_action :require_admin, only: [:index, :destroy, :generate]

  #User registration
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to(@user)
    else
      render('new')
    end
  end

  #Show all users (admin)
  def index
    @users = User.all
  end

  #Registration view
  def new
    @user = User.new
  end

  #User profile
  def show
    @user = User.find(params[:id])
  end

  #Generate API key
  def generate
    @user = User.find(params[:user_id])
    @user.api_key = SecureRandom.hex
    if @user.save
      flash[:success] = "User updated"
    else
      flash[:danger] = "Something went wrong"
    end
    if current_user.is_admin? then redirect_to(users_path) else redirect_to(@user) end
  end

  #Revoke API key
  def revoke
    @user = User.find(params[:user_id])
    @user.api_key = nil
    if @user.save
      flash[:success] = "User updated"
    else
      flash[:danger] = "Something went wrong"
    end
    if current_user.is_admin? then redirect_to(users_path) else redirect_to(@user) end
  end

  #Delete user (admin, maybe allow same user aswell?)
  def destroy
    @user = User.find(params[:id])
    #Delete user, was it successful?
    if @user.destroy
      flash[:success] = "Successfully deleted user"
      redirect_to(users_url)
    else
      flash[:danger] = "Something went horribly wrong"
      redirect_to(users_url)
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :api_key)
    end

    #Make sure user is logged in
    def require_login
      unless logged_in?
        flash[:danger] = "You need to be logged in to view that page."
        redirect_to(login_url)
      end
    end

    #Make sure that user is an admin or logged in as the account it's trying to change
    def require_same_user
      @user_id = params[:id] || params[:user_id]
      @user = User.find(@user_id)
      unless current_user?(@user) || current_user.is_admin?
        redirect_to(root_url)
      end
    end

    #Make sure logged in user is an admin
    def require_admin
      unless current_user.is_admin?
        flash[:danger] = "You are not authorized to view that page."
        redirect_to(root_url)
      end
    end
end
