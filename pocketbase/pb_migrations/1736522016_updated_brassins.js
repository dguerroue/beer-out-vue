/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date3198974773",
    "max": "",
    "min": "",
    "name": "date_fermentation_end",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "date4256687262",
    "max": "",
    "min": "",
    "name": "date_carbonatation_start",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "date3232381353",
    "max": "",
    "min": "",
    "name": "date_carbonatation_end",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3178315302")

  // remove field
  collection.fields.removeById("date3198974773")

  // remove field
  collection.fields.removeById("date4256687262")

  // remove field
  collection.fields.removeById("date3232381353")

  return app.save(collection)
})
