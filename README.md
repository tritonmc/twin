# TWIN

## Deployment

- Install dependencies on `backend` and `frontend`.
- Create a copy of `backend/config.def.js` on `backend/config.js` and edit it.
- Set environtment variable `PORT` (default is 5000)
- Build frontend.
- Run migrations with Knex (`cd backend && yarn migrate`)

Run the following commands in the corresponding directories to start TWIN:

- Start the backend with `yarn dev` (or `yarn start` for production).
- Start the frontend with `yarn start` for development, or build it for production with `yarn build`.

## Config version changelog

### Version 6 (Triton v3.1.0)

Add `limit` property to payload.

```jsonc
{
  // ...
  "limit": {
    "collections": ["collection1", "collection2"],
    "languages": ["en_GB"]
  }
  // ...
}
```

### Version 5 (Triton v3.0.0)

Remove `universal` property from `metadata` and each translation.
Inverse the default value of `blacklist`.

### Version 4 (Triton v2.0.0)

Add `metadata` property to payload to reflect new collection file structure.
Add `fileName` property to translations to indicate which file (collection) they belong to.

### Version 3 (Triton v1.4.0)

Add anti-piracy values to payload (`%%__USER__%%` as `user`, `%%__RESOURCE__%%` as `resource` and `%%__NONCE__%%` as `nonce`).

### Version 2 (Triton v1.1.1)

Add `_twin` object (with `id`, `dateCreated`, `dateUpdated`, `tags`).  
Add `id` property to sign group locations.  
Add `mainLanguage` property to payload.  
Implement patching on save payload.
