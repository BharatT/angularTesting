import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it("should display weak if passed 5",()=>{
    const pipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });
  it("should display strong if passed 15",()=>{
    const pipe = new StrengthPipe();
    expect(pipe.transform(15)).toEqual('15 (strong)');
  });
  it("should display strongest if passed 25",()=>{
    const pipe = new StrengthPipe();
    expect(pipe.transform(25)).toEqual('25 (strongest)');
  });

});
