class Creator < ActiveRecord::Base
  has_many :stories

  def self.find_or_create_by_auth(auth)
    creator = self.where(:provider => auth["provider"], :uid => auth["uid"]).first_or_create #self.find_or_create_by_provider_and_uid(auth["provider"], auth["uid"])
    creator.name = auth["info"]["name"]
    creator.email = auth["info"]["email"]
    creator.save
    return creator
  end

  def to_json(options={})
    options[:except] ||= [:uid, :provider]
    super(options)
  end
end
