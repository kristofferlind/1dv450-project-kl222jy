object false

child(@tags) do
    extends "api/v1/tags/show"
end

node(:_links) do
  paginate @tags
end
