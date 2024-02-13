import { Post } from "src/app/models/Post"
import { PostsComponent } from "./posts.component";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostService } from "src/app/services/Post/post.service";
import { Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PostComponent } from "../post/post.component";
/* class mockPostService{
getpost(){}
deletePost(post:Post){
    return of(true);
}
} */

@Component({
    selector:"app-post",
    template: `<div> </div>`
})
class FakePostComponent{
    @Input() post!:Post;
}

describe("Post Component", () => {
    let POST: Post[] = [];
    let postService: any;
    let component: PostsComponent;
    let fixture:ComponentFixture<PostsComponent>;
    let mockPostService:any;
    beforeEach(() => {
        POST = [
            { id: 1, title: "title 1", body: "Body 1" },
            { id: 2, title: "title 2", body: "Body 2" },
            { id: 3, title: "title 3", body: "Body 3" }
        ];
        mockPostService = jasmine.createSpyObj(['getPost', 'deletePost']);

        TestBed.configureTestingModule({
            declarations:[PostsComponent,PostComponent],
            providers: [ {
                provide: PostService,
                useValue: mockPostService
                // useClass: mockPostService
            }]
        });
        // component = TestBed.inject(PostsComponent);
        fixture = TestBed.createComponent(PostsComponent);
        component = fixture.componentInstance;
        // postService = TestBed.inject(PostService);
    });

    describe("Delete",()=>{
        beforeEach(()=>{
            mockPostService.deletePost.and.returnValue(of(true));
            component.posts = POST;
        });

        it("Should delete the Selected post from Post",()=>{
            component.delete(POST[0]);
            expect(component.posts.length).toBe(2)
        });

        it("Should call post service only once",()=>{
            // mockPostService.deletePost.and.returnValue(of(true));
            // component.posts = POST;
            // spyOn(postService,'deletePost').and.returnValue(of(true)); // its will not call the actual delete post. It will pretend that it has called delete post 
            // spyOn(postService,'deletePost').and.callThrough(); //we can tell that go and execute the main delete post only
            component.delete(POST[1]);
            expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
        });

        it("Should delete the actual selected Post from post",()=>{
            // mockPostService.deletePost.and.returnValue(of(true));
            // component.posts = POST;
            component.delete(POST[1]);
            for(let post of component.posts){
                expect(post).not.toEqual(POST[1]);
            }
        });

        it("should set posts from service directly",()=>{
            mockPostService.getPost.and.returnValue(of(POST));
            fixture.detectChanges();
            expect(component.posts.length).toBe(3)
        });

        it("should create one child element for each post ",()=>{
            mockPostService.getPost.and.returnValue(of(POST));
            fixture.detectChanges();
            const debugElement = fixture.debugElement;
            const postsElement = debugElement.queryAll(By.css('.posts'));
            expect(postsElement.length).toEqual(POST.length);
        });
        it("should create one child element for each post by Directive ",()=>{
            mockPostService.getPost.and.returnValue(of(POST));
            fixture.detectChanges();
            const debugElement = fixture.debugElement;
            const postsElement = debugElement.queryAll(By.directive(PostComponent));
            expect(postsElement.length).toEqual(POST.length);
        });
        it("should create wheather exact post is sending to PostComponent ",()=>{
            mockPostService.getPost.and.returnValue(of(POST));
            fixture.detectChanges();
            const debugElement = fixture.debugElement;
            const postsComponentDEc = debugElement.queryAll(By.directive(PostComponent));
            for(let i=0; i< postsComponentDEc.length; i++){
                let postComponentInstance = postsComponentDEc[i].componentInstance as PostComponent;
                expect(postComponentInstance.post.title).toEqual(POST[i].title);
            }
        });

        it("should call delete method when post component button is clicked ",()=>{
            spyOn(component,'delete');
            mockPostService.getPost.and.returnValue(of(POST));
            fixture.detectChanges();
            const postComponentDE = fixture.debugElement.queryAll(By.directive(PostComponent));
            for(let i=0; i<postComponentDE.length; i ++){
                postComponentDE[i].query(By.css("button")).triggerEventHandler('click',{stopPropagation:()=>{}});
                expect(component.delete).toHaveBeenCalledWith(POST[i]) 
            }
            
        });
        it("should call delete method when delete event is emitted in PostComponent ",()=>{
            spyOn(component,'delete');
            mockPostService.getPost.and.returnValue(of(POST));
            fixture.detectChanges();
            let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));
            expect(postComponentDEs.length).toBe(3)
            for(let i=0; i<postComponentDEs.length; i++){
                (postComponentDEs[i].componentInstance as PostComponent).delete.emit(POST[i]);
                expect(component.delete).toHaveBeenCalledWith(POST[i]);
            }
            
        });
    })
})