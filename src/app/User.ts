export class User{
     fname!:String;
     lname!:string;
     constructor(fname:string,lname:string){
        this.fname = fname;
        this.lname = lname;
     }
     getFullName(){
        return this.fname + " " + this.lname;
     }
}

let newUser = new User('Ram',"Chandra");
console.log("New User ", newUser.getFullName())