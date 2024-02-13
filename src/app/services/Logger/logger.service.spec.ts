import { TestBed } from "@angular/core/testing";
import { LoggerService } from "./logger.service"

describe("Logger Service",()=>{
    let service:LoggerService;
    
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[LoggerService]
        })
    // service = new LoggerService();
    service = TestBed.inject(LoggerService)
    });

    it("should no data in initial stage",()=>{
        // const service = new LoggerService();
        let count = service.message.length;
        expect(count).toBe(0);
    });
    it("should called log method",()=>{
        // const service = new LoggerService();
        service.log("Message");
        let count = service.message.length;

        expect(count).toBe(1);
    });

    it("should called clear method",()=>{
        // const service = new LoggerService();
        service.log("message");
        service.clear();
        let count = service.message.length;
        expect(count).toBe(0);
    })
})
