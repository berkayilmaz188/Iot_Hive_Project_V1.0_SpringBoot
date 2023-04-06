//var authClient = new OktaAuth({
//    url: 'https://dev-14647327.okta.com',
//    issuer: 'https://dev-14647327.okta.com/oauth2/default',
//    clientId: '0oa7kc29kx4Afd6Pe5d7',
//    redirectUri: 'http://45.136.4.151'
//  });

  var accessToken = authClient.tokenManager.get('accessToken')
  .then(accessToken => {
    // If access token exists, output it to the console
    if (accessToken) {
      console.log(`access_token ${accessToken.accessToken}!`);
    // If ID Token isn't found, try to parse it from the current URL
    } else if (location.hash) {
      authClient.token.parseFromUrl().then(function success(res){
        var accessToken = res[0];
        var idToken = res[1];

        authClient.tokenManager.add('accessToken', accessToken);
        authClient.tokenManager.add('idToken', idToken);

        window.location.hash='';
      });
    }
    else {
      // You're not logged in, you need a sessionToken
      authClient.token.getWithRedirect({
        responseType: ['token','id_token']
      });
    }
  });