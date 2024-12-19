const menutrans ={
title:{
    english:"MGM",
    persian:"ام جی ام",
    icon:"fa-eercast",
    href:"https://mgmlens.com"
    
},
menu:[
    {
        english: "OverView",
        persian: "OverView",
        index:0,
        icon:"fa-dashboard",
        href:"#",

        children:[
        {
            english: "Dashboard",
            persian: "داشبورد",
            index:0,
            icon:"fa-dashboard",
            href:"/dashboard",
            url:"dashboard"
        },
        {
            english: "Tasks",
            persian: "وظایف و پیگیری",
            index:1,
            icon:"fa-bar-chart",
            href:"/crm",
            url:"crm"
        },
        {
            english: "CRM-ORDERS",
            persian: "مدیریت سفارشات",
            index:1,
            icon:"fa-check",
            href:"/crm-orders",
            url:"crm-orders"
        },
        ]
    },
    {
        english: "Customers",
        persian: "مشتریان",
        index:1,
        icon:"fa-users",
        href:"#",
        children:[
            {
                english: "Customers Manager",
                persian: "مدیریت مشتریان",
                index:0,
                icon:"fa-users",
                href:"/users",
                url:"users"
            },
            {
                english: "Sale Policy",
                persian: "سیاست های فروش",
                index:0,
                icon:"fa-percent",
                href:"/policy",
                url:"policy"
            },
            ]
    },
    {
        english: "Orders",
        persian: "سفارشات",
        index:2,
        icon:"fa-tasks",
        href:"#",
        children:[
            {
                english: "Orders List",
                persian: "لیست سفارشات",
                index:0,
                icon:"fa-tasks",
                href:"/orders",
                url:"orders"
            },
            ]
    },
    {
        english: "Products",
        persian: "محصولات و خدمات",
        index:3,
        icon:"fa-bar-chart",
        href:"#",
        children:[
            {
                english: "Products List",
                persian: "لیست محصولات",
                index:0,
                icon:"fa-dropbox",
                href:"/products",
                url:"products"
            },
            {
                english: "Stock Product",
                persian: "محصولات استوک",
                index:0,
                icon:"fa-stack-exchange",
                href:"/stock",
                url:"stock"
            },
            {
                english: "Services",
                persian: "خدمات",
                index:1,
                icon:"fa-trello ",
                href:"/services",
                url:"services"
            },
            {
                english: "Brands",
                persian: "برندها",
                index:1,
                icon:"fa-font-awesome",
                href:"/brands",
                url:"brands"
            },
            {
                english: "Category",
                persian: "دسته بندی ها",
                index:1,
                icon:"fa-stack-overflow ",
                href:"/category",
                url:"category"
            },
            ]
    },
    {
        english: "Configuration",
        persian: "تنظیمات",
        index:3,
        icon:"fa-bar-cog",
        href:"#",
        children:[
            {
                english: "Find Bug",
                persian: "مغایرت ها",
                index:0,
                icon:"fa-bug",
                href:"/find-bugs",
                url:"find-bugs"
            },
        ]
    }
],
setting:[
    {
        english: "Access",
        persian: "دسترسی ها",
        index:0,
        icon:"fa-key",
        href:"/access",
        url:"access"
    },
    {
        english: "Filters",
        persian: "فیلترها",
        index:1,
        icon:"fa-key",
        href:"/filter",
        url:"filter"
    },
    {
        english: "User Management",
        persian: "مدیریت کاربران",
        index:2,
        icon:"fa-key",
        href:"/user",
        url:"user"
    }
]
}
export default menutrans