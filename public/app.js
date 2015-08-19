hlamatchmaker = {};

function googleSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  hlamatchmaker.profile = googleUser.getBasicProfile();
  AWS.config.region = 'us-east-1';
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:8332d562-2514-43e5-9898-ddd08d6180f7",//hlamatchmaker.poolId,
    Logins: {
      'accounts.google.com': id_token
    }
  });
  AWS.config.credentials.get(function(){
    var params = {
      Bucket: 'downloads.epitopes.net' /* required */
    };
    console.log(arguments)
    var s3 = new AWS.S3();
    s3.listObjects(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
  });
  //hlamatchmaker.showView(window.location.hash);
}

function getURL(filename){
    var s3 = new AWS.S3;
    var params = {Bucket: 'downloads.epitopes.net', Key: filename};
    return s3.getSignedUrl('getObject', params);
}
