module Api::V1
  class TagsController < ApiController
    before_action :require_logged_in, except: [:index, :show]

    def index
      if (params[:story_id])
        @tags = Story.find(params[:story_id]).tags.order("id DESC").page(params[:page]).per(params[:limit])
      else
        @tags = Tag.all.order("id DESC").page(params[:page]).per(params[:limit])
      end
    end

    def create
      if (params[:story_id])
        story = Story.find(params[:story_id])
        @tag = story.tags.create(tag_params)   #new doesn't work? need the savecheck
      else
        @tag = Tag.create(tag_params)
      end
      unless @tag.valid?
        render json: {message: 'Tag already exists'}, status: 400
      end
    end

    def show
      @tag = Tag.find(params[:id])
    end

    def destroy
      tag = Tag.find(params[:id])
      if tag && tag.destroy
        render json: {message: 'Tag successfully deleted'}
      else
        render json: {message: 'Tag not found'}, status: 404
      end
    end

    private

      def tag_params
        params.require(:tag).permit(:name)
      end
  end
end
