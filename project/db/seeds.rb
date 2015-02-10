# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(name: "Kristoffer", email: "kristoffer@krad.se", password: "Password!", password_confirmation: "Password!", is_admin: true)
User.create!(name: "test", email: "test@test.com", password: "Password!", password_confirmation: "Password!")
