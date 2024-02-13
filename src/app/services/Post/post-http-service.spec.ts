import { TestBed } from "@angular/core/testing"
import { PostService } from "./post.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe("Postservice (HttpClientTestingModule)",()=>{
    let postService : PostService;
    let httpTestingController:HttpTestingController;
    const POST = [
        { id: 1, title: "title 1", body: "Body 1" },
        { id: 2, title: "title 2", body: "Body 2" },
        { id: 3, title: "title 3", body: "Body 3" }
    ];
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [PostService],
            imports:[HttpClientTestingModule]
        });
        postService = TestBed.inject(PostService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    describe("getPost()",()=>{
        it("should return post when getPost() is called",(done:DoneFn)=>{
            postService.getPost().subscribe((data)=>{
                expect(data).toEqual(POST);
                done();
            });
            let request = httpTestingController.expectOne("https://jsonplaceholder.typicode.com/posts");
            request.flush(POST);
            expect(request.request.method).toBe('GET');
        });

    });

    describe("getPosts()",()=>{
        it("should return single post when getposts call with postId",(done:DoneFn)=>{
            postService.getPosts(1).subscribe((data)=>{
                expect(data).toEqual([POST[0]]);
                done();
            });
           // postService.getPosts(2).subscribe(); // if we use verify then no other testing request made 
            let request = httpTestingController.expectOne("https://jsonplaceholder.typicode.com/posts/1");
            request.flush([POST[0]]);
            expect(request.request.method).toBe('GET'); 
            httpTestingController.verify();
        })
    });

})