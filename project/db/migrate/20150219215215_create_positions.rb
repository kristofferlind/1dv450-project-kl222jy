class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.string :longitude
      t.string :latitude
      t.timestamps null: false
    end
  end
end
