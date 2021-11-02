class ReviewsController < ApplicationController

    skip_before_action :authorized

    def index
        @reviews = Review.all

        render json: @reviews, include: [:user, :video_game]
    end

    def show
        @review = Review.find(params[:id])

        render json: @review, include: [:user, :video_game]
    end

    def create
        @review = Review.create(review_params)
        
        if @review.valid?
            render json: @review
        else
            render json: { error: "failed to update "}, status: :not_acceptable
        end    

    end

    def update
        @review = Review.find(params[:id])

        if @review.update(review_params)
            render json: @review
        else
            render json: @review.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        render json: @review
    end

    private

    def review_params
        params.require(:reviews).permit(:title, :description, :stars, :video_game)
    end

end
