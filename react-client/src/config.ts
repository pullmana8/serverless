/**
 * Once the serverless backend is deployed, copy the API id here so that the
 * frontend can interact with the API Gateway backend.
 */
const apiId = '...'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

/**
 * domain is the Auth0 domain
 * clientId is the Auth0 client id
 */
export const authConfig = {
    domain: '...',
    clientId: '...',
    callbackUrl: 'http://localhost:3000/callback'
}