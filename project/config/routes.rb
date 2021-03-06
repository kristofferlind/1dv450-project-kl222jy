Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  #ror mvc, api key management
  root 'home#index'
  get 'login' => 'sessions#new'
  get 'register' => 'users#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  get '/auth/:provider/callback' => 'home#auth_callback'


  resources :users, only: [:new, :create, :index, :show, :destroy] do  #skipping :edit, :update
    put 'generate' => 'users#generate'
    put 'revoke' => 'users#revoke'
  end

  #api resources
  namespace :api do
    namespace :v1, defaults: {format: :json} do
      get 'creators/me' => 'creators#me'  #needs to come before resources :creators (routes are greedy)
      resources :hooks, only: :create
      resources :tags
      resources :stories do
        resources :tags
      end
      resources :creators do
        resources :stories
      end
    end
  end

end
