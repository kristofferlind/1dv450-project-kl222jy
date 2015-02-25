object @creator
attributes :id, :name, :email

node(:self) {|creator| api_v1_creator_path(creator)}

child :stories do
    attributes :id, :name, :description
    node(:self) {|story| api_v1_story_path(story)}
end
