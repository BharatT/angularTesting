import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostDetailComponent } from "./post-detail.component";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "src/app/services/Post/post.service";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { Post } from "src/app/models/Post";
import { By } from "@angular/platform-browser";

describe("postDetailsComponent",()=>{
  let fixture:ComponentFixture<PostDetailComponent>;
  let mockPostService:jasmine.SpyObj<PostService>;
  let component:PostDetailComponent;
  beforeEach(()=>{
    let mockActivatedRoutes = {
      snapshot:{
        paramMap:{
          get:()=>{ return '3'}
        }
      }
    }
     mockPostService = jasmine.createSpyObj(['getPosts','updatePost'])
    let mockLocation = jasmine.createSpyObj(['back'])
    TestBed.configureTestingModule({
      declarations:[PostDetailComponent],
      providers:[
        {provide:ActivatedRoute, useValue:mockActivatedRoutes},
        {provide:PostService, useValue:mockPostService},
        {provide:Location, useValue:mockLocation},
      ]
    });
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  it("it should render post title in h2 template",()=>{
    mockPostService.getPosts.and.returnValue(of([{id:3, title:"title 1", body:"Body 1"} as Post]));
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('h3')).nativeElement as HTMLElement;
    expect(element.textContent).toEqual(component.post.title)
  })
})
