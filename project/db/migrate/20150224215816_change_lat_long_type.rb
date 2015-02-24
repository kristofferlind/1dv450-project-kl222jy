class ChangeLatLongType < ActiveRecord::Migration
  def change
    change_column :positions, :latitude, :float
    change_column :positions, :longitude, :float
  end
end
