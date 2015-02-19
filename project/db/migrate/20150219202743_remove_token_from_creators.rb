class RemoveTokenFromCreators < ActiveRecord::Migration
  def change
    remove_column :creators, :token
  end
end
