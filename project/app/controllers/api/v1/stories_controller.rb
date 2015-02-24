module Api::V1
  class StoriesController < ApiController
    before_action :require_logged_in, except: :index
    before_action :require_same, only: :destroy

    def index
      if params[:creator_id]
        @stories = Creator.find(params[:creator_id]).stories.order("id DESC").page(params[:page]).per(params[:limit])
      else
        @stories = Story.all.order("id DESC").page(params[:page]).per(params[:limit])
      end
    end

    def create
      creator = current_creator
      @story = creator.stories.new(story_params)
      @story.position = Position.where(position_params).first_or_create
      unless @story.position && @story.save
        return head :bad_request
      end
    end

    def update
      @story = Story.find(params[:id])
      @story.position = Position.where(position_params).first_or_create
      unless @story.update_attributes(story_params)
        render json: {message: 'Story not found'}, status: 404
      end
    end

    def show
      @story = Story.find(params[:id])
    end

    def destroy
      story = Story.find(params[:id])
      if story && story.destroy
        render json: {message: 'Story successfully deleted'}
      else
        render json: {message: 'Story not found'}, status: 404
      end
    end

    private

      def story_params
        params.require(:story).permit(:name, :description, :position => [:longitude, :latitude])
      end

      def position_params
        params.require(:position).permit(:longitude, :latitude)
      end
  end
end
