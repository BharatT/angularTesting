import { HttpClient } from "@angular/common/http"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"

let testUrl = "/data";
interface Data{
    name:string
}

describe("Http client testing Module",()=>{
    let httpClient:HttpClient;
    let httpTestingController:HttpTestingController;
    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule]
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it("should call the testUrl with get request",()=>{
        const testData:Data = {name:"Bharat Tiwari"}
        httpClient.get<Data>(testUrl).subscribe((data)=>{
            expect(data).toEqual(testData)
        });
        
        let request = httpTestingController.expectOne(testUrl);
        request.flush(testData)
        expect(request.request.method).toBe('GET');
    });

    it("should test multipal request",()=>{
        const testData:Data[] = [{name:"Bharat"}, {name:"India"}];
        httpClient.get<Data[]>(testUrl).subscribe((data)=>{
            expect(data.length).toEqual(0);
        });
        httpClient.get<Data[]>(testUrl).subscribe((data)=>{
            expect(data).toEqual([testData[0]])
        });
        httpClient.get<Data[]>(testUrl).subscribe((data)=>{
            expect(data).toEqual(testData)
        });

        let request = httpTestingController.match(testUrl);
        expect(request.length).toEqual(3);
        request[0].flush([]);
        request[1].flush([testData[0]]);
        request[2].flush(testData);
    })

})