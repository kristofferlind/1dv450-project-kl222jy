object false

child(@stories) do
    extends "api/v1/stories/show"
end

node(:_links) do
  paginate @stories
end
