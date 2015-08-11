describe('googleSignIn callback', function() {
  it('updates the AWS credentials', function() {
    spyOn(AWS.config, 'update');
    var profile = jasmine.createSpyObj('profile', ['getEmail']);
    var user = jasmine.createSpyObj('user', ['getAuthResponse', 'getBasicProfile']);
    user.getAuthResponse.and.returnValue({id_token: 'BEEFFACE'});
    user.getBasicProfile.and.returnValue(profile);
    googleSignIn(user);
    //expect(AWS.config.update).toHaveBeenCalledWith(fakeCreds);
  });
});
