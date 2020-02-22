const csvFilePath='testsheet.csv';
const csv=require('csvtojson');
const Promise=require('promise');
const Shopify = require('shopify-api-node');

async function getdata() {
    csv()
    .fromFile(csvFilePath)
    .then((data)=>{
    for(i=0; i<data.length; i++){
         await createproduct(data[i])
    }
    })
}

const shopify = new Shopify({
    shopName: '<your shop domain name>',
    apiKey: '<your api key>',
    password: '<your password>',
  });

createproduct = async (data) =>{
  let productschema={
    "handle":data.Handle,
   "title": data.Title,
   "body_html": "",
   "vendor": data.Vendor,
   "product_type": data.Type,
   "tags": [
     data.Tags
   ],
   "variants": [{
       "price": data.Variant_Price1,
       "sku": data.Variant_SKU1,
       "inventory_policy" : "deny",
       "fulfillment_service" : "manual",
       "nventory_management" : "shopify",
       "option1" : data.Option1_Value1,
       "taxable" : true,
       "barcode": data.Variant_Barcode1,
       "grams": data.Variant_Grams1,
       "position": "1",
       "inventory_quantity": data.Variant_Qty1,
       "fulfillment_service" : "manual",
       "inventory_policy" : "deny",
       "requires_shipping" : true
  
   },{
     "price": data.Variant_Price2,
     "sku": data.Variant_SKU2,
     "inventory_policy" : "deny",
     "fulfillment_service" : "manual",
     "nventory_management" : "shopify",
     "option1" : data.Option2_Value2,
     "taxable" : true,
     "barcode": data.Variant_Barcode2,
     "grams": data.Variant_Grams2,
     "position": "1",
     "inventory_quantity": data.Variant_Qty2,
     "fulfillment_service" : "manual",
     "inventory_policy" : "deny",
     "requires_shipping" : true
  
  },
  
   ],
   "options":[{
       "name":data.Option1_Name,
       "position": "1",
       "values":[data.Option]
   } 
  ],
  "images":[{
      "position":"1",
      "alt":data.Image_Alt1,
      "src":data.Image_Src1
  },{
  "position":"1",
  "alt":data.Image_Alt2,
  "src":data.Image_Src2
   },{
  "position":"1",
  "alt":data.Image_Alt3,
  "src":data.Image_Src3
  },{
  "position":"1",
  "alt":data.Image_Alt4,
  "src":data.Image_Src4
  },{
  "position": "1", 
  "alt":data.Image_Alt5,
  "src":data.Image_Src5
  },{
  "position":"1",
  "alt":data.Image_Alt6,
  "src":data.Image_Src6
  }],
   "metafields": [
       {
         "key": data.Meta_key1,
         "value": data.Meta_Value1,
         "value_type": "string",
         "namespace": "Tryon"
       },
       {
           "key": data.Meta_key2,
           "value": data.Meta_Value2,
           "value_type": "string",
           "namespace": "Tryon"
         }
     ]
  }
  console.log(productschema)
    await shopify.product
     .create(productschema)
      .then(
        (product) => console.log(product),
        (err) => console.error(err)
      );
}

deleteproduct = async (productId) =>{
    await shopify.product
     .delete(productId)
      .then(
          console.log("successfully deleted")
      )
}

getdata();

shopify.product
.list()
.then((product)=>console.log(product))

