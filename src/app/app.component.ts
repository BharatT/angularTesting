import { Component, Inject } from '@angular/core';
import { never } from 'rxjs';
// import { User } from './User';

type Name = string;
type PapularTag = string;
type MaybePapularTag = string | null;
interface Iuser{
  name:Name,
  age:number,
  getMessage():string
}
interface AddresInterface{
  home:string,
  office:string,
}

class User{
 private fname!:String;
 private lname!:string;
  constructor(fname:string,lname:string){
    this.fname = fname;
    this.lname = lname;
  }
  getFullName(){
    return this.fname + " " + this.lname;
  }
}

class Admin extends User{}
let usertest = new User("RAm", "Bharat")
console.log("FullName > ", usertest.getFullName() )
 
 let newUser = new Admin('Ram',"Chandra");
 console.log("New Admin User ", newUser.getFullName())

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[]

})
export class AppComponent  {
  title = 'angularTesting';
  fName:string ='';
  lName:string ='';
}

let user:Iuser = {
  name:"Bharat",
  age :45,
  getMessage(){
    return "hello "+ this.name;
  }
}

console.log(user.name, "and ", user.age);
console.log("User Message", user.getMessage());

let address:AddresInterface | null = null;
console.log(address);

let papularTag:PapularTag[] = ["Ram", "Sita"];
let mybePapular : MaybePapularTag = "Parusram";
console.log(`PApular Tag ${papularTag} and MybePApular {MaybePapularTag}`);

const doSomething = ():never=>{
  throw never;
}

let vAny:any = 10;
let vUnknown:unknown = 10;

let s1:string = vAny;
let s2:string = vUnknown as string;

let pageNumber:string = "10";
let newMericPageNumber:number = (pageNumber as unknown) as number;
console.log(newMericPageNumber);

const someElement = document.querySelector(".some") as HTMLInputElement;
console.log("SomeElement :", someElement);


const otherElement = document.querySelector(".some");
otherElement?.addEventListener('blur',(event)=>{
  const target = event.target as HTMLInputElement
console.log(" Event listener ",target.value)
})

const addId= <T extends object>(obj:T)=>{
  let id = Math.random().toString(16);
  return{
    ...obj,
    id
  }
}
interface TestUserObjInterface<T>{
  name:string,
  data:T
}
let usrObj:TestUserObjInterface<{meta:string}> ={
  name:'Ram Ji',
  data:{
    meta:"foo"
  }
}
let usrObj2:TestUserObjInterface<string[]> = {
  name: "RAdhe Shyam",
  data:["RAM", "RAdhe Shayam", "Mohan"]
}

let userObjResult = addId(usrObj);
console.log("Add User", userObjResult)

function TestDatatype<T>(data:T){
return data;
}

let statusObj = {
  notStarted :0,
  inProgress :1,
  done:2
}
console.log("Status Obj : ",statusObj.inProgress);
enum StatusEnum{
  NotStarted = "notStarted",
  InProgress = "inProgress",
  Done = "done"
}
console.log("Enum Status : ",StatusEnum.InProgress);
let notStartedStatus:StatusEnum = StatusEnum.NotStarted;
notStartedStatus = StatusEnum.Done;
console.log("Updated status :", notStartedStatus)