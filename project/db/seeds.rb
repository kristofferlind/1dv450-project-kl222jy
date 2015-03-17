# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(name: "Kristoffer", email: "kristoffer@krad.se", password: "Password!", password_confirmation: "Password!", is_admin: true)
User.create!(name: "test", email: "test@test.com", password: "Password!", password_confirmation: "Password!")


500.times do |index|
  story = Story.new(name: Faker::Company.name, description: Faker::Hacker.say_something_smart)
  story.position = Position.where(latitude: Faker::Address.latitude, longitude: Faker::Address.longitude).first_or_create
  story.creator = Creator.create!(name: Faker::Name.name, email: Faker::Internet.safe_email)
  tags = []
  3.times do |tagIndex|
    tag = Tag.where(name: Faker::Hacker.noun).first_or_create
    tags.push(tag)
  end
  story.tags = tags
  story.save
  puts "#{index} of 500, cancel with Ctrl+C when you're happy with the amount of test data"
end
