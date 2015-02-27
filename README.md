#Project (MapTales?)

##Getting started
* bundle install
* rake db:migrate
* rake db:seed
* set github_client_id, github_client_secret and app_secret(just some random string) in secrets.yml
* install redis (http://redis.io/download)
* redis-server
* rails s
* browse http://localhost:3000

Account information in db/seeds.rb

Set Authentication(token set in cookies when logging in) and ClientKey(api key) headers in postman environment variables

Authentication: go to http://localhost:3000/auth/github, successful login sets cookie named token, Authentication value should be "Bearer tokenvalue"
ClientKey: log into registration application to get api key