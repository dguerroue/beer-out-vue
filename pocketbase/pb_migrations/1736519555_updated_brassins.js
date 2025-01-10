/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_842702175",
    "hidden": false,
    "id": "relation3666391351",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "recipe",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // remove field
  collection.fields.removeById("relation3666391351")

  return app.save(collection)
})
