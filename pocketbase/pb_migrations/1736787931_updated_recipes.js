/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // update collection data
  unmarshal({
    "viewRule": "@request.auth.id = user.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // update collection data
  unmarshal({
    "viewRule": null
  }, collection)

  return app.save(collection)
})
