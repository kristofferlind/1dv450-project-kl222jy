Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, Rails.application.secrets.github_client_id, Rails.application.secrets.github_client_secret #ENV['GITHUB_KEY'], ENV['GITHUB_SECRET']
end
