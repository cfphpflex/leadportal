import { icd10 } from './icd10'
import * as Yup from 'yup'
import {post} from "../../provider/api";
const rq = 'Required'



export const login = [
    {
        label:'Email Address',
        name:'email',
        type:'text',
        icon:'user',
    },
    {
        label:'Password',
        name:'password',
        type:'password',
        icon:'lock',
    }
]

export const forgotPassword = [
    {
        label:'Email Address',
        name:'email',
        type:'text',
        validator: Yup.string().email('Not a valid email').required(rq),
        icon:'user',
    },
]



// do axios call
// here


// 1.  make this Axios work
async function sales_type(v){
    const salesTypeRes = await post('sales_type/query')
}


//1. a. set the data  to use //
export const organizationType = [
    {
        object: [
            {label: 'Standard', name: 'standard', id: 0},
            {label: 'Special', name: 'special', id: 1},
            {label: 'Other', name: 'other', id: 2}]
    }
]


export const organization = [
    {
        label:'LEADEXCHANGE*',
        name:'leadexchange',
        type:'leadexchange',
        validator: Yup.string().length(10)
            .required(rq)
    },
    {
        label:'sale Name*',
        name:'saleName',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'sale Type*',
        name:'organizationType',
        type:'select',
        options:[
            {label:'Standard',name:'standard', id:0},
            {label:'Special',name:'special',id:1},
            {label:'Other',name:'other',id:2}],
        validator: Yup.object().required(rq),
    },
    {
        label:'Address*',
        name:'line_1',
        type:'address',
        validator: Yup.string().required(rq),
    },
    {
        label:'City*',
        name:'city',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'State*',
        name:'state',
        type:'text',
        validator: Yup.string().length(2).required(rq),
    },
    {
        label:'Zip Code*',
        name:'zip_code',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'Office Phone*',
        name:'office_phone',
        type:'phone',
        validator: Yup.object().shape({
            '0': Yup.string().length(3).required(rq),
            '1': Yup.string().length(3).required(rq),
            '2': Yup.string().length(4).required(rq),
        }),
    },
]


export const sales = [
    {
        label:'LEADEXCHANGE*',
        name:'leadexchange',
        type:'leadexchange',
        validator: Yup.string().length(10)
            .required(rq)
    },
    {
        label:'sale Name*',
        name:'saleName',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'sale Type*',
        name:'organizationType',
        type:'select',
        options:[
            {label:'Standard',name:'standard', id:0},
            {label:'Special',name:'special',id:1},
            {label:'Other',name:'other',id:2}],
        validator: Yup.object().required(rq),
    },
    {
        label:'Address*',
        name:'line_1',
        type:'address',
        validator: Yup.string().required(rq),
    },
    {
        label:'City*',
        name:'city',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'State*',
        name:'state',
        type:'text',
        validator: Yup.string().length(2).required(rq),
    },
    {
        label:'Zip Code*',
        name:'zip_code',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'Office Phone*',
        name:'office_phone',
        type:'phone',
        validator: Yup.object().shape({
            '0': Yup.string().length(3).required(rq),
            '1': Yup.string().length(3).required(rq),
            '2': Yup.string().length(4).required(rq),
          }),
    },
]

export const leadexchange = [
    {
        label:'First Name',
        name:'firstName',
        type:'text',
    },
    {
        label:'Last Name',
        name:'lastName',
        type:'text',
    },
    {
        label:'Organization',
        name:'organization',
        type:'text',
    },
    {
        label:'LEADEXCHANGE',
        name:'leadexchange',
        type:'text',
    },   
]

export const teamMember = [
    {
        label:'LEADEXCHANGE*',
        name:'leadexchange',
        type:'leadexchange',
        hideField:['org'],
        validator: Yup.string().length(10)
            .required(rq)
    },
    {
        label:'Role*',
        name:'role',
        type:'select',
        options:[
            {label:'Doc',name:'doc',id:0},
            {label:'Director',name:'Director',id:40},
            {label:'Regional Director',name:'RegionalDirector',id:41},
            {label:'Other',name:'other',id:2}],
        validator: Yup.object().required(rq),
    },
    {
        label:'Director',
        name:'Director',
        type:'select',
        options:[
            {label:'Placeholder',name:'doc',id:0},
            {label:'Placeholder',name:'Director',id:40},
            {label:'Placeholder Therapist',name:'Regional Director',id:41},
            {label:'Placeholder',name:'other',id:2}],
    },
    {
        label:'Prefix',
        name:'prefix',
        type:'text',
    },
    {
        label:'First Name*',
        name:'first_name',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'Last Name*',
        name:'last_name',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'Email*',
        name:'email',
        type:'text',
        validator: Yup.string().email('Not a valid email').required(rq),
    },
    {
        label:'Password*',
        name:'password',
        type:'password',
        validator: Yup.string().required(rq)
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Upper, lower, number, and specials'
          )
    },
    {
        label:'Confirm password*',
        name:'confirmPassword',
        type:'password',
        validator: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required(rq),
    },
    {
        label:'Office Phone*',
        name:'office_phone',
        type:'phone',
        validator: Yup.object().shape({
            '0': Yup.string().length(3).required(rq),
            '1': Yup.string().length(3).required(rq),
            '2': Yup.string().length(4).required(rq),
          }),
    },
    {
        label:'Mobile Phone',
        name:'mobile_phone',
        type:'phone',
    },
    {
        label:'space',
        name:'space',
        type:'space',
    }
]

export const permissions = [
    {
        label:'Add SalesRep',
        name:'addSalesRep',
        type:'boolean',
    },
    {
        label:'Add Staff',
        name:'addStaff',
        type:'boolean',
    },
    {
        label:'Add Director',
        name:'addDirector',
        type:'boolean',
    },
    {
        label:'Add Recommendation Plan',
        name:'addRecommendationPlan',
        type:'boolean',
    },
    {
        label:'Edit SalesRep',
        name:'editSalesRep',
        type:'boolean',
    },
    {
        label:'Edit Staff',
        name:'editStaff',
        type:'boolean',
    },
    {
        label:'Edit Director',
        name:'editDirector',
        type:'boolean',
    },
    {
        label:'Edit Recommendation Plan',
        name:'editRecommendationPlan',
        type:'boolean',
    },
    {
        label:'View SalesRep List',
        name:'viewSalesRepList',
        type:'boolean',
    },
    {
        label:'View SalesRep Personal Data',
        name:'viewSalesRepPersonalData',
        type:'boolean',
    },
    {
        label:'View SalesRep Medical Data',
        name:'viewSalesRepMedicalData',
        type:'boolean',
    },
    {
        label:'View SalesRep Dashboard',
        name:'viewSalesRepDashboard',
        type:'boolean',
    },
    {
        label:'View Staff',
        name:'viewStaff',
        type:'boolean',
    },
    {
        label:'View Director',
        name:'viewDirector',
        type:'boolean',
    },
    {
        label:'View Recommendation Plan',
        name:'viewRecommendationPlan',
        type:'boolean',
    },
]

export const notifications = [
   
    {
        label:'Missed Session',
        name:'missedSession',
        type:'boolean',
    },
  
    {
        label:'Session Started',
        name:'sessionStarted',
        type:'boolean',
    },
]

export const SalesRep = [
    {
        label:'First Name*',
        name:'first_name',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'Last Name*',
        name:'last_name',
        type:'text',
        validator: Yup.string().required(rq),
    },
    {
        label:'Date of Birth*',
        name:'date_of_birth',
        type:'date',
        validator: Yup.object().shape({
            '0': Yup.string().length(2).required(rq),
            '1': Yup.string().length(2).required(rq),
            '2': Yup.string().length(4).required(rq),
          }),
    },
    {
        label:'Director*',
        name:'Director',
        type:'leadexchange',
        searchTarget:'Director',
        validator: Yup.string().required(rq),
        hideField:['org']
    },
    {
        label:'Regional Director',
        name:'pt',
        type:'leadexchange',
        searchTarget:'LeadExchange',
        hideField:['org']
    },
    {
        label:'DME',
        name:'dme',
        type:'leadexchange',
        searchTarget:'LeadExchange',
        hideField:['org']
    },
    {
        label:'Address',
        name:'address',
        type:'address',
        // validator: Yup.string().required(rq),
    },
    {
        label:'City',
        name:'city',
        type:'text',
        // validator: Yup.string().required(rq),
    },
    {
        label:'State',
        name:'state',
        type:'text',
        validator: Yup.string().length(2),
    },
    {
        label:'Zip Code',
        name:'zip_code',
        type:'text',
        // validator: Yup.string().required(rq),
    },
    {
        label:'Home Phone',
        name:'home_phone',
        type:'phone',
    },
    {
        label:'Mobile Phone',
        name:'mobile_phone',
        type:'phone',
    },
    {
        label:'Email',
        name:'email',
        type:'text',
        validator: Yup.string().email('Not a valid email'),
    },
    // {
    //     label:'space',
    //     name:'space',
    //     type:'space',
    // },
    // {
    //     label:'space',
    //     name:'space',
    //     type:'space',
    // }  
]

export const SalesRepSalesProcess = [
    {
    label:'SalesProcess*',
    name:'salesProcess',
    type:'text',
    validator: Yup.string().required(rq),
  },
  {
    label:'Primary SalesStep (ICD10)',
    name:'salesStep',
    type:'select',
    options:icd10,
  },
  {
    label:'SalesProcess Leg*',
    name:'salesProcessLeg',
    type:'select',
    options:[
        {label:'Left',name:'left',id:'0'},
        {label:'Right',name:'right',id:'1'}],
    validator: Yup.object().required(rq),
  },
  {
    label:'SalesProcess Date',
    name:'salesProcessdate',
    type:'date',
  },
  {
    label:'Recommendation Start Date',
    name:'recommendationStartDate',
    type:'date',
  },
  {
        label:'space',
        name:'space',
        type:'space',
    },
]

 


export const something = [{
    label:'Something',
    name:'storeName',
    type:'text',
    icon:'store',
    // validator: Yup.string().required(rq),
  },
  {
    label:'Address',
    name:'address',
    type:'address',
    icon:'location',
    // validator: Yup.object().shape({
    //     address: Yup.string().required(),
    //     point: Yup.object().required(),
    // }),
  }
]



