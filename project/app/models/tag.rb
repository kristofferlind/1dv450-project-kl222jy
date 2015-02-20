class Tag < ActiveRecord::Base
  has_and_belongs_to_many :stories, :join_table => :stories_tags
  validates :name, presence: true, uniqueness: true
end
