import { first } from "rxjs";
import { PostComponent } from "./post.component"
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("Post Component",()=>{
    let component:PostComponent;
    let fixture: ComponentFixture<PostComponent>;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[PostComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
            fixture = TestBed.createComponent(PostComponent);
            component = fixture.componentInstance;
    });

    it("Should crete post Component using testBed",()=>{
        expect(component).toBeDefined();
    });

    it("should raised event when delete post is clicked",()=>{
        // let component = new PostComponent();
        let post = {id:1, title:"Title 1", body:"Body 1"};
        component.post = post;
        
        component.delete.pipe(first()).subscribe((selectedPost)=>{
            expect(selectedPost).toEqual(post);
        });
        component.onDeletePost(new MouseEvent('click'));
    });

    it("Should render post title on anchor element", ()=>{
        let post = {id:1, title:"Title 1", body:"Body 1"};
        component.post = post;
        fixture.detectChanges();
        const postElement = fixture.nativeElement;
        const a = postElement.querySelector('a');
        expect(a.textContent).toContain(post.title);
    });
    it("Should render post title on anchor element with debug element", ()=>{
        let post = {id:1, title:"Title 1", body:"Body 1"};
        component.post = post;
        fixture.detectChanges();
        const postDebugElement  = fixture.debugElement;
        const aElement: HTMLElement = postDebugElement.query(By.css('a')).nativeElement;
        expect(aElement.textContent).toContain(post.title);
    });
})