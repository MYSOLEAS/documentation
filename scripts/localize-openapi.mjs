import fs from "node:fs";

const source = "api-reference/openapi.json";
const destination = "en/api-reference/openapi.json";
const api = JSON.parse(fs.readFileSync(source, "utf8"));

api.info.description =
  "New Mysoleas architecture: business gateway, Mysoleas Identity Cloud, and SoleasPay ecosystem.";

for (const server of api.servers ?? []) {
  if (server.description === "Gateway Mysoleas") {
    server.description = "Mysoleas gateway";
  }
  if (server.description === "Authentification Mysoleas") {
    server.description = "Mysoleas authentication";
  }
}

const translations = new Map(
  Object.entries({
    "Lire la configuration OpenID Connect": "Read the OpenID Connect configuration",
    "Retourne les endpoints OAuth, les grants supportes, les scopes et la cle JWKS.":
      "Returns OAuth endpoints, supported grants, scopes, and the JWKS key.",
    "Demarrer Se connecter avec Mysoleas": "Start Sign in with Mysoleas",
    "Redirige l'utilisateur vers Mysoleas Identity Cloud pour authentification OAuth2/OIDC avec PKCE. L'application OAuth2 doit etre creee et configuree au prealable dans le dashboard https://mysoleas.com.":
      "Redirects the user to Mysoleas Identity Cloud for OAuth2/OIDC authentication with PKCE. The OAuth2 application must be created and configured beforehand in the https://mysoleas.com dashboard.",
    "Obtenir un JWT": "Get a JWT",
    "Supporte `authorization_code`, `client_credentials` et `refresh_token`. Le JWT peut servir a ouvrir une session dans votre application, lire `userinfo` ou appeler la gateway avec `x-sp-auth-token`.":
      "Supports `authorization_code`, `client_credentials`, and `refresh_token`. The JWT can be used to open a session in your application, read `userinfo`, or call the gateway with `x-sp-auth-token`.",
    "Lire les claims utilisateur": "Read user claims",
    "Introspecter un token": "Introspect a token",
    "Revoquer un token": "Revoke a token",
    "Creer et executer une collection plugin": "Create and execute a plugin collection",
    "Verifier le statut d'une collection plugin": "Verify a plugin collection status",
    "Lister les services autorises pour le plugin": "List services authorized for the plugin",
    "Creer un lien de paiement": "Create a payment link",
    "Lister les liens de paiement du marchand": "List merchant payment links",
    "Payer un lien de paiement": "Pay a payment link",
    "Creer une souscription": "Create a subscription",
    "Lister les souscriptions marchand": "List merchant subscriptions",
    "Lire le detail d'une souscription": "Read subscription details",
    "Suspendre une souscription": "Suspend a subscription",
    "Reactiver une souscription": "Reactivate a subscription",
    "Annuler une souscription": "Cancel a subscription",
    "Lister les paiements d'une souscription": "List subscription payments",
    "Lire le detail d'un paiement de souscription": "Read subscription payment details",
    "Lister les abonnes d'un marchand": "List merchant subscribers",
    "Creer une intention de collection": "Create a collection intent",
    "Executer une collection": "Execute a collection",
    "Verifier le statut d'une collection": "Verify a collection status",
    "Creer une intention de disbursement": "Create a disbursement intent",
    "Executer un disbursement": "Execute a disbursement",
    "Verifier le statut d'un disbursement": "Verify a disbursement status",
    "Lister les services": "List services",
    "Lister les frais par pays et services": "List fees by country and service",
    "Retourne les regles de frais du pays demande uniquement si le token courant donne acces a ce pays.":
      "Returns fee rules for the requested country only if the current token grants access to that country.",
    "Lister les pays disponibles": "List available countries",
    "Lister les providers et leur statut": "List providers and their status",
    "Verifier un numero de telephone": "Verify a phone number",
    "Valide un numero mobile via la gateway publique, detecte son pays lorsque le format international le permet et retourne le wallet national attendu par les providers SoleasPay.":
      "Validates a mobile number through the public gateway, detects its country when the international format allows it, and returns the national wallet expected by SoleasPay providers.",
    "Calculer les frais de transaction": "Calculate transaction fees",
    "Retourne un devis de frais calcule cote serveur. Pour une application API directe, feeBearer provient de la configuration de l application authentifiee. Pour un plugin, feeBearer peut venir du payload ou de la query string.":
      "Returns a server-side fee quote. For a direct API application, feeBearer comes from the authenticated application configuration. For a plugin, feeBearer can come from the payload or query string.",
    "Lire le pays d exercice principal": "Read the primary operating country",
    "Retourne le TenantCountry primaire du tenant courant. Si aucun pays primaire n est configure, data vaut null et les anciens flux conservent le fallback historique.":
      "Returns the primary TenantCountry for the current tenant. If no primary country is configured, data is null and older flows keep the historical fallback.",
    "Definir le pays d exercice principal": "Set the primary operating country",
    "Definit atomiquement le TenantCountry indique comme unique pays primaire du tenant courant.":
      "Atomically sets the provided TenantCountry as the current tenant's only primary country.",
    "Page courante": "Current page",
    "Nombre d'elements par page": "Number of items per page",
    "Reference unique de transaction cote marchand": "Unique merchant-side transaction reference",
    "Reference de transaction Mysoleas": "Mysoleas transaction reference",
    "Reference de facture ou commande cote marchand": "Merchant-side invoice or order reference",
    "Pays ISO alpha-3, par exemple CMR": "ISO alpha-3 country, for example CMR",
    "Code service, par exemple mtn_cmr": "Service code, for example mtn_cmr",
    "Numero de telephone ou wallet a verifier": "Phone number or wallet to verify",
    "Numero ou wallet client a verifier.": "Customer phone number or wallet to verify.",
    "Alias de `wallet`.": "Alias of `wallet`.",
    "Pays ISO alpha-3 lorsque le numero n'a pas de prefixe international":
      "ISO alpha-3 country when the number has no international prefix",
    "Token invalide ou absent": "Token invalid or missing",
    "Requete invalide": "Invalid request",
    "Ressource introuvable": "Resource not found",
    "Acces refuse": "Access denied",
    "Operation reussie": "Operation succeeded",
    "Liste retournee avec succes": "List returned successfully",
    "Transaction soumise": "Transaction submitted",
    "Transaction introuvable": "Transaction not found",
    "Lien de paiement cree": "Payment link created",
    "Souscription creee": "Subscription created",
    "Pays principal mis a jour": "Primary country updated",
    "Numero valide": "Valid number"
    ,
    "Numero valide.": "Valid number.",
    "API key manquante ou invalide.": "Missing or invalid API key.",
    "Utilisez `code` pour le flow authorization code.":
      "Use `code` for the authorization code flow.",
    "Claims utilisateur": "User claims",
    "Utilisez `merchant` pour lire le detail cote marchand.":
      "Use `merchant` to read merchant-side details.",
    "Le token courant n'a pas acces au pays demande":
      "The current token does not have access to the requested country",
    "Pays attendu en ISO alpha-3, par exemple `CMR`. Requis pour un numero national ou un indicatif colle sans `+` ni `00`.":
      "Expected country in ISO alpha-3, for example `CMR`. Required for a national number or a calling code pasted without `+` or `00`.",
    "Numero national avec pays": "National number with country",
    "Indicatif colle avec pays": "Calling code pasted with country",
    "Numero de telephone verifie.": "Phone number verified.",
    "Numero invalide, pays manquant ou pays incoherent.":
      "Invalid number, missing country, or inconsistent country.",
    "Non authentifie": "Unauthenticated",
    "API key marchand SoleasPay. Utilisee pour les endpoints publics plugin ou verification telephone.":
      "SoleasPay merchant API key. Used for public plugin endpoints or phone verification.",
    "Cle d'idempotence optionnelle fournie par le marchand.":
      "Optional idempotency key provided by the merchant.",
    "Liste de pays": "Country list"
  })
);

function translateFallback(value) {
  return value
    .replaceAll("Liste des services", "List services")
    .replaceAll("Liste des pays", "List countries")
    .replaceAll("Liste des providers", "List providers")
    .replaceAll("Liste des frais", "List fees")
    .replaceAll("Creer", "Create")
    .replaceAll("Verifier", "Verify")
    .replaceAll("Executer", "Execute")
    .replaceAll("Annuler", "Cancel")
    .replaceAll("Reactiver", "Reactivate")
    .replaceAll("Suspendre", "Suspend")
    .replaceAll("Lister", "List")
    .replaceAll("Lire", "Read")
    .replaceAll("Definir", "Set")
    .replaceAll("souscription", "subscription")
    .replaceAll("paiement", "payment")
    .replaceAll("numero de telephone", "phone number")
    .replaceAll("frais", "fees");
}

function walk(value) {
  if (Array.isArray(value)) {
    for (const item of value) {
      walk(item);
    }
    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const key of Object.keys(value)) {
    if (typeof value[key] === "string") {
      value[key] = translations.get(value[key]) ?? translateFallback(value[key]);
      if (key === "locale" && value[key] === "fr") {
        value[key] = "en";
      }
    } else {
      walk(value[key]);
    }
  }
}

walk(api);
fs.writeFileSync(destination, `${JSON.stringify(api, null, 2)}\n`);
