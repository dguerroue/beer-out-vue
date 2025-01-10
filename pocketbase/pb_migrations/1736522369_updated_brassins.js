/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // remove field
  collection.fields.removeById("select2363381545")

  // add field
  collection.fields.addAt(10, new Field({
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
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 4,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "ipa",
      "pale ale",
      "red ale",
      "triple",
      "neipa"
    ]
  }))

  // remove field
  collection.fields.removeById("relation2363381545")

  return app.save(collection)
})
