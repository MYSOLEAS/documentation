# Mysoleas API documentation

Documentation Mintlify de la nouvelle architecture Mysoleas.

## Domaines publics

- Gateway: `https://api.mysoleas.com`
- Authentification: `https://account.mysoleas.com`

## Structure

- `api-docs/`: guides methodiques pour integrer les flux metier.
- `api-reference/`: pages de reference branchees sur `api-reference/openapi.json`.
- `docs.json`: navigation Mintlify.

## Verification rapide

```bash
jq empty docs.json
jq empty api-reference/openapi.json
```
