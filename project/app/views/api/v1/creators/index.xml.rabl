object false

child(@creators) do
    extends "api/v1/creators/show.xml"
end

node(:_links) do
  paginate @creators
end
