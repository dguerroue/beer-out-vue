/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "date3096543026",
    "max": "",
    "min": "",
    "name": "date_fermentation_start",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // remove field
  collection.fields.removeById("date3096543026")

  return app.save(collection)
})
