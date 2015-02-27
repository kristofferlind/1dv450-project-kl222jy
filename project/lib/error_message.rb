class ErrorMessage
  def initialize(developerMessage, userMessage, exception = nil)
    @developerMessage = developerMessage
    @userMessage = userMessage
    if Rails.env.development? && !exception.nil?
      @exception = "#{exception.class.name}: #{exception.message}"
    end
  end
end
