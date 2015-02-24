class Position < ActiveRecord::Base
  has_many :stories
  # geocoded_by :latitude, :longitude
  reverse_geocoded_by :latitude, :longitude
end
