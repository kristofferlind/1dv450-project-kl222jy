class CreateTableStoriesTags < ActiveRecord::Migration
  def change
    create_table :stories_tags do |t|
      t.integer :story_id
      t.integer :tag_id
    end
  end
end
