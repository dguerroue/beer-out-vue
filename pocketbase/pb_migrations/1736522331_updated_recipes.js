/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_413001351",
    "hidden": false,
    "id": "relation2363381545",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // remove field
  collection.fields.removeById("relation2363381545")

  return app.save(collection)
})
