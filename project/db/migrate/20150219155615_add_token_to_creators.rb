class AddTokenToCreators < ActiveRecord::Migration
  def change
    add_column :creators, :token, :string
  end
end
