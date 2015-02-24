object false

child(@creators) do
    extends "api/v1/creators/show"
end

node(:_links) do
  paginate @creators
end
