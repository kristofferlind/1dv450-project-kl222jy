class Creator < ActiveRecord::Base

  def self.find_or_create_by_auth(auth)
    creator = self.where(:provider => auth["provider"], :uid => auth["uid"]).first_or_create #self.find_or_create_by_provider_and_uid(auth["provider"], auth["uid"])
    creator.name = auth["info"]["name"]
    creator.email = auth["info"]["email"]
    creator.save
    return creator
  end

  # def self.create_with_omniauth(auth)
  #   create! do |creator|
  #     creator.provider = auth["provider"]
  #     creator.uid = auth["uid"]
  #     creator.name = auth["info"]["name"]
  #   end
  # end
end
