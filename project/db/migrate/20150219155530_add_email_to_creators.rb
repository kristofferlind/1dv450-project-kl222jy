class AddEmailToCreators < ActiveRecord::Migration
  def change
    add_column :creators, :email, :string
  end
end
