class User < ActiveRecord::Base
  #Generate an api key on registration
  before_create :generate_api_key
  before_save { self.email = email.downcase }
  has_secure_password

  validates :name,  presence: true, length: { maximum: 100 }
  validates :email, presence: true, length: { maximum: 500 }, format: { with: /@/ }, uniqueness: { case_sensitive: false }

  #Only validate on create so that updating api_key works
  validates :password, length: {minimum: 6}, on: :create

  private

  def generate_api_key
    self.api_key = SecureRandom.hex
  end
end
