# MLD

user(
  id [INTEGER] PK,  
  firstname [VARCHAR],  
  lastname [VARCHAR],
  email [VARCHAR],  
  password [VARCHAR](32),  
  address [TEXT],
  phone [VARCHAR],
  role [VARCHAR],  
  promo [VARCHAR]  
)

order(
  id [INTEGER] PK,
  user_id [INTEGER] FK reference user.id,
  paid_at [TIMESTAMP]
)

product{
id [INTEGER] PK,
article_name [VARCHAR],
excerpt [TEXT],
price [NUMERIC],
image [TEXT],
description [TEXT],
category_id [INTEGER] FK reference category.id
}

order_line{
order_id [INTEGER] FK reference order.id,
product_id [INTEGER] FK reference product.id,
quantity [INTEGER]
}

category{
id [INTEGER] PK,
label [VARCHAR],
description [TEXT]
}
