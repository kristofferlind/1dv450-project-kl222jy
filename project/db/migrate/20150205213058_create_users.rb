class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.boolean :is_admin, default: false, null: false
      t.string :api_key

      t.timestamps null: false
    end
  end
end
