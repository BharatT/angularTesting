describe("First test",()=>{
    let testVariable:any;
    beforeEach(()=>{
        testVariable = {};
    });
    it(" it shoulld return true if a is true",()=>{
        //arrange
        testVariable.a = false;
        //act
        testVariable.a = true
        //assert
        expect(testVariable.a).toBe(true)
    })
})