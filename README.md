#Project (MapTales?)

##Getting started
* bundle install
* rake db:migrate
* rake db:seed
* go to (https://github.com/settings/applications/new) set homepage url to "http://localhost:3000" and callback to "http://localhost:3000/auth/github/callback"
* set github_client_id, github_client_secret in project/config/secrets.yml
* install redis (http://redis.io/download)
* redis-server
* rails s

You can now find the registration application at http://localhost:3000
Account information in db/seeds.rb

###Running the client application
* install node (https://nodejs.org/download/)
* npm install
* npm install -g grunt-cli
* grunt serve

Client application should now have started and opened in a browser

###Only for testing with Postman
Set Authentication(token set in cookies when logging in) and ClientKey(api key) headers in postman environment variables

Authentication: go to http://localhost:3000/auth/github, successful login sets cookie named token, Authentication value should be "Bearer tokenvalue"
ClientKey: log into registration application to get api key