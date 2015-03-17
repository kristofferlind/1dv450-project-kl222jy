class Story < ActiveRecord::Base
  belongs_to :creator
  belongs_to :position
  has_and_belongs_to_many :tags, :join_table => :stories_tags
  after_create :call_save_listeners
  after_save :call_save_listeners
  # after_destroy :call_remove_listeners

  require 'uri'
  require 'net/http'

  private

    def call_save_listeners
      hooks = Hook.where(model: "story", event: "save")
      hooks.each do |hook|
        uri = URI.parse(hook.callbackUrl)
        response = Net::HTTP.post_form(uri, "data" => "test")

        # puts "test"
        # puts response

        # if response.is_a?(Net::HTTPSuccess)
        #   puts "success"
        # else
        #   puts "failed"
        # end
        return true
      end
    end
end
