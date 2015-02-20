class Story < ActiveRecord::Base
  belongs_to :creator
  belongs_to :position
  has_and_belongs_to_many :tags, :join_table => :stories_tags
end
