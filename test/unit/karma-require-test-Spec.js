define(['scripts/configs/app'], function(app){
    describe('The first karma requirejs test', function(){
        it('a is a', function(){
            expect('a').toEqual('a');
        });

        it('test app', function(){
            expect(app).toBeTruthy();
        });
    });
});