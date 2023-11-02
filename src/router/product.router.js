const router = require('express').Router();
const { faker } = require("@faker-js/faker")
const Products = require("../model/product.model");

router.get('/products', async (req, res) => {
  const products = await Products.findAll();

  res.status(200).json({
    ok: true,
    status: 200,
    body: products
  })
})

router.get('/products/:product_id', async (req, res) => {
  const id = req.params.product_id;
  const product = await Products.findOne({ //Metodo para encontrar un producto a partir del ID
    where: {
      product_id: id
    }
  });
  if (!req.product) {  //Preguntamos si el producto Existe
    res.status(400).json({
      message: "No existe el Producto"
    })
  } else {
    res.status(200).json({
      ok: true,
      status: 200,
      body: product
    })
  }

})


router.post('/products', async (req, res) => {
  const dataProducts = req.body
  await Products.sync() // SI la tabla no esta creada, la crea
  const createProduct = await Products.create({
    product_name: dataProducts.product_name,
    price: Number(dataProducts.price),
    is_stock: dataProducts.is_stock
  })
  res.status(201).json({ //Cuando esta Response se ejecuta significa que el producto fue creado
    ok: true,
    status: 201,
    message: "Created Product"
  })
})


router.put('/products/:product_id', async (req, res) => {  //Se usa Put para actualizar completamente a un elemento
  const id = req.params.product_id;
  const dataProducts = req.body;
  const updateProduct = await Products.update({

    product_name: dataProducts.product_name,
    price: dataProducts.price,
    is_stock: dataProducts.is_stock
  }, {
    where: {
      product_id: id
    }
  });
  res.status(200).json({ //Cuando esta Response se ejecuta significa que el producto fue creado
    ok: true,
    status: 200,
    body: updateProduct,
    message: "Updated Product"
  })
});

router.patch('/products/:product_name', async (req, res) => {  //Se usa Patch para actualizar No todos los atributos de un elemento 
  const name = req.params.product_name;
  const dataProducts = req.body;
  const updateProduct = await Products.update({
    price: dataProducts.price,
    is_stock: dataProducts.is_stock
  }, {
    where: {
      product_name: name
    }
  });
  res.status(200).json({ //Cuando esta Response se ejecuta significa que el producto fue creado
    ok: true,
    status: 200,
    body: updateProduct,
    message: "Updated Product"
  })
});

// router.patch() --> Se utiliza para realizar una actualizacion a un elemento en algun/os campo/s

router.delete('/products/:product_id', async (req, res) => {
  const id = req.params.product_id
  const deleteProduct = await Products.destroy({
    where: {
      product_id: id
    }
  });
  res.status(200).json({ //Cuando esta Response se ejecuta significa que el producto fue creado
    ok: true,
    status: 200,
    body: deleteProduct,
    message: "Deleted Product"
  })
})



module.exports = router