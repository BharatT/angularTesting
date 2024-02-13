import { TestBed } from "@angular/core/testing";
import { LoggerService } from "../Logger/logger.service";
import { CalculatorService } from "./calculator.service"

function setUP(){
  let mockLoggerService = jasmine.createSpyObj('LoggerService',['log']);
  TestBed.configureTestingModule({
    providers:[CalculatorService, {
      provide:LoggerService,
      useValue:mockLoggerService
    }]
  })
  // calculator = new CalculatorService(mockLoggerService);
  const calculator = TestBed.inject(CalculatorService);
  const loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;

  return{calculator,loggerServiceSpy}
}

describe("Calculator Service",()=>{
  /* let mockLoggerService:LoggerService;
  let loggerServiceSpy :jasmine.SpyObj<LoggerService>;
  let calculator :CalculatorService;
beforeEach(()=>{
  console.log("Befor each calling ")
  mockLoggerService = jasmine.createSpyObj('LoggerService',['log']);
  TestBed.configureTestingModule({
    providers:[CalculatorService, {
      provide:LoggerService,
      useValue:mockLoggerService
    }]
  })
  // calculator = new CalculatorService(mockLoggerService);
  calculator = TestBed.inject(CalculatorService);
  loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;
})
 */
  it("Should add two number",()=>{
    const {calculator, loggerServiceSpy} = setUP();
  console.log("add  calling ")

    // let loggerService = new LoggerService();
    // let mockLoggerService = jasmine.createSpyObj('LoggerService',['log']);
    // spyOn(loggerService,'log').and.callThrough();
    // spyOn(loggerService,'log');
    // let calculator = new CalculatorService(mockLoggerService);
    // let calculator = new CalculatorService(loggerService);
    let result = calculator.add(2,2);
    expect(result).toBe(4)
    // expect(loggerService.log).toHaveBeenCalledTimes(1);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  })
  it("Should substract two number",()=>{
    const {calculator, loggerServiceSpy} = setUP();
  console.log("Substract calling ")

    // let mockLoggerService = jasmine.createSpyObj('LoggerService',['log']);
    // spyOn(loggerService,'log');
    // spyOn(loggerService,'log').and.callThrough();
    // let calculator = new CalculatorService(mockLoggerService);
    let result = calculator.subtract(2,2);
    expect(result).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  })
})