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
    $(".downloads_url").each( function (index, value) {
      var url = getURL($(value).attr('id') + ".xlsb"); 
      $(value).attr('href', url); 
    });
    var dynamodb = new AWS.DynamoDB();
    dynamodb.putItem({Item: {email: {S: hlamatchmaker.profile.getEmail()}, name: {S: hlamatchmaker.profile.getName()}, last_login: {S: Date().toString()}},  TableName: "hla"}, function() {  });
    $('#me').attr('src', hlamatchmaker.profile.getImageUrl());
    $('#login').empty();
    $('#login').append(
        '<div style="height:36px;width:120px;" class="abcRioButton abcRioButtonLightBlue">' + 
            '<div style="margin:6px 0 0 6px;" class="abcRioButtonIcon"><img src="img/hla/g.png"></div>' + 
            '<span style="font-size:13px;line-height:34px;" class=abcRioButtonContents"><a href="https://accounts.google.com/logout">Logout</a></span>' + 
        '</div>');
  });
}

function getURL(filename){
    var s3 = new AWS.S3;
    var params = {Bucket: 'downloads.epitopes.net', Key: filename};
    return s3.getSignedUrl('getObject', params);
}
