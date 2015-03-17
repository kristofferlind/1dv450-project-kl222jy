#Project (MapTales?)

`command` <-run in terminal

##Getting started
Make sure you are in /project folder

1. `bundle install`
2. `rake db:migrate`
3. `rake db:seed`
4. go to (https://github.com/settings/applications/new) set homepage url to "http://localhost:3000" and callback to "http://localhost:3000/auth/github/callback"
5. set github_client_id, github_client_secret in project/config/secrets.yml
6. install Redis (http://redis.io/download)
7. `redis-server` you might need to add --maxheap size, which sets the amount of RAM Redis is allowed to use, for example --maxheap 2000000000 for 2gb
8. `rails s`

You can now find the registration application at http://localhost:3000  
Account information in db/seeds.rb

###Running the client application
Make sure you are in /client folder

1. install Node (https://nodejs.org/download/)
2. `npm install`
3. `npm install -g grunt-cli`
4. `grunt serve`

Client application should now have started and opened in a browser

###Only for testing with Postman
Set Authentication(token set in cookies when logging in) and ClientKey(api key) headers in postman environment variables

Authentication: go to http://localhost:3000/auth/github, successful login sets cookie named token, Authentication value should be "Bearer tokenvalue"
ClientKey: log into registration application to get api key