
interface Employee{
    name:String;
    dept:string;
    position:string;
}
export class GetEmployee{
    static readonly type='[Employee] Get'
}

export class AddEmployee{
    static readonly type = '[Employee] Add';
    constructor(public payload:Employee){}
}

export class DeleteEmployee{
    static readonly type='[Employee] Delete';
    constructor(public id:String){}
}

export class UpdateEmployee{
    static readonly type="[Employee] Update";
    constructor(public payload:Employee){}
}