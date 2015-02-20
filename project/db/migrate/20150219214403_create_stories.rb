class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.integer :user_id
      t.integer :position_id
      t.integer :creator_id
      t.string :name
      t.string :description
      t.timestamps null: false
    end
  end
end
