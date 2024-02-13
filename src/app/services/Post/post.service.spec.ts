import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";

let postService: PostService;
let httpClientSpy: jasmine.SpyObj<HttpClient>
let POST = [
    { id: 1, title: "title 1", body: "Body 1" },
    { id: 2, title: "title 2", body: "Body 2" },
    { id: 3, title: "title 3", body: "Body 3" }
];


describe("getPosts()", () => {
    beforeEach(() => {
        let httpClientSpyObj = jasmine.createSpyObj('httpClient', ['get']);
        // httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
        TestBed.configureTestingModule({
            providers:[PostService,{
                provide:HttpClient,
                useValue:httpClientSpyObj
            }]
        })
        // postService = new PostService(httpClientSpy)
        postService = TestBed.inject(PostService);
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    })
    it("should return expected post when getposts called", (done:DoneFn) => {
        httpClientSpy.get.and.returnValue(of(POST));
        postService.getPost().subscribe({
            next: (res) => {
                expect(res).toEqual(POST);
                done();
            },
            error: () => {done.fail }
        })
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    });

})