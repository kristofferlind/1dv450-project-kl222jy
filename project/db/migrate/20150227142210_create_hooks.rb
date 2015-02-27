class CreateHooks < ActiveRecord::Migration
  def change
    create_table :hooks do |t|
      t.integer :user_id
      t.string :event
      t.string :model
      t.string :callbackUrl

      t.timestamps null: false
    end
  end
end
