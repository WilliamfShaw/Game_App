class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :users, :scores do |t|
     
    end
  end
end
