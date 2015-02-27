class ApiKeyThrottle < Rack::Throttle::Hourly
  def client_identifier(request)
    request.env['HTTP_CLIENTKEY']
  end

  def call(env)
    status, headers, body = super
    request = Rack::Request.new(env)
    headers['X-RateLimit-Limit']     = max_per_window.to_s
    headers['X-RateLimit-Remaining'] = remaining(request).to_s
    [status, headers, body]
  end

  private
    def remaining(request)
      requests = cache_get(cache_key(request)).to_i
      remaining = max_per_window - requests
      remaining = 0 if remaining.nil? || remaining < 0
      remaining
    end
end
