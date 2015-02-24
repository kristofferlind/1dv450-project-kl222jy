object @story
attributes :id, :name, :description

node(:self) {|story| api_v1_story_path(story)}

child :creator do
    attributes :id, :name, :email
    node(:self) {|creator| api_v1_creator_stories_path(creator)}
end

child :position do
    attributes :id, :longitude, :latitude
end

child :tags do
    attributes :id, :name
    node(:self) {|tag| api_v1_tag_path(tag)}
end
