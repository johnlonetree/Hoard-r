class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :img_url
      t.string :password_digest
      t.string :email
      t.date :birthdate

      t.timestamps
    end
  end
end
