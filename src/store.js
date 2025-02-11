import { configureStore, createSlice } from "@reduxjs/toolkit";


const productsSlice=createSlice({
    name:'products',
    initialState:{veg:[
                      {name:"Potato",price:100,image:"./potato.jpg"},
                      {name:"Tomoto",price:200,image: "/tomoto.jpg"},
                      {name:"Onion",price:30,image: "onion.jpg"},
                      {name:"chilli",price:350,image: "chilli.jpg"},
                      {name:"carrot",price:400,image: "carrot.jpg"},
                      {name:"Cabbage",price:50,image: "cabbage.jpg"},
                      {name:"brinjal",price:60,image: "./brinjal.jpg"},
                      {name:"bottle gourd",price:30,image: "bottle gourd.jpg"},
                      {name:"drumstricks",price:80,image: "drumstricks.jpg"},
                      {name:"radish",price:90,image: "radish.jpg"},
                      {name:"beetroot",price:30,image: "beetroot.jpg"},
                      {name:"cucumber",price:300,image: "cucumber.jpg"},
                      {name:"cauliflower",price:400,image: "cauliflower.jpg"},
                      
    ],
     nonVeg:[
            {name:"Mutton",price:100,image: "mutton.jpg"},
            {name:"Chicken",price:200,image:"chicken.jpg" },
            {name:"Fish",price:350,image: "fish.jpg"},
            {name:"Lobster",price:400,image: "lobstar.jpg"},
            {name:"Prawns",price:500,image: "prawns.jpg" },
            {name:"Crabs",price:700,image: "crabs.jpg"},
            {name:"Egg",price:200,image: "egg.jpg"},
        ],
     milk:[
        {name:"Sangam",price:100,image: "sangam.jpg"},
        {name:"Heritage",price:200,image: "haritage.jpg"},
        {name:"Jersey",price:300,image: "jersey.jpg"},
        {name:"Amul",price:100,image: "amul.jpg"},
        {name:"Krishna",price:20,image: "krishna.jpg"},
        {name:"Mother ",price:30,image: "mother.jpg"},
        {name:"Paras",price:10,image: "paras.jpg"},
        {name:"Dodla",price:70,image: "dodla.jpg"},
        {name:"Nandhini ",price:300,image: "nandhini.jpg"},
        {name:"Vijaya",price:100,image: "vijaya.jpg"},
        {name:"Verka",price:200,image: "verka.jpg"},
        {name:"Hutsan",price:30,image: "hutsan.jpg"},
        
     ]
    },
    reducers:{}
    
});
const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const item=state.find(item=>item.name===action.payload.name);
            if(item)
                {
                item.quantity+=1;
               }
            else
            {
                state.push({...action.payload,quantity:1});
            }

        },
        increment:(state,action)=>{
            const item=state.find(item=>item.name=== action.payload.name);
            if(item)
            {
                item.quantity+=1;
            }
        },
        decrement:(state,action)=>{
            const item=state.find(item=>item.name === action.payload.name);
            if(item && item.quantity>1)
            {
                item.quantity-=1;
            }
            else{
              const item=state.filter(item=>item.name!==action.payload.name);
            }
            
        },
        remove:(state,action)=>{
            return state.filter(item=>item.name!==action.payload.name);
        },
        clearCart: ()=>[]
        
    }
});
    const purchaseDetailsSlice=createSlice({
        name:"purchaseDetails",
        initialState:[],
        reducers:{
            addPurchaseDetails:(state,action)=>{
                state.push(action.payload)
            }
        }
    });

    const authSlice=createSlice({
        name:"auth",
        initialState:{
            isAuthenticated:localStorage.getItem("username")? true:false,
            user:localStorage.getItem("username")||"",      //get stored username
        },
        reducers:{
            login:(state,action)=>{
                state.isAuthenticated=true;
                state.user=action.payload;
                localStorage.setItem("username",action.payload);      //store in LocalStorage
            },
            logout:(state)=>{
                state.isAuthenticated=false;
                state.user="";
                localStorage.removeItem("username");     //clear from LocalStorage
            },
        },
    }); 
const store=configureStore({
    reducer:{products:productsSlice.reducer,
        cart:cartSlice.reducer,
        purchaseDetails:purchaseDetailsSlice.reducer,
        auth:authSlice.reducer

    }
})
export  const{addToCart,increment,decrement,remove,clearCart} = cartSlice.actions;
export const{login,logout}=authSlice.actions;
export const{addPurchaseDetails}=purchaseDetailsSlice.actions;
export default store;