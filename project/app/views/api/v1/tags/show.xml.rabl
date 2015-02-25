object @tag
attributes :id, :name

node(:self) {|tag| api_v1_tag_path(tag)}

child :stories do
    attributes :id, :name, :description
    node(:self) {|story| api_v1_story_path(story)}
end
