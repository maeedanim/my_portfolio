// ======================================
// Pagination
// ======================================

const loadMoreButton =
    document.getElementById("loadMoreBtn");

const PROJECTS_PER_PAGE = 3;

let visibleProjects = PROJECTS_PER_PAGE;

// ======================================
// Project Data
// ======================================

const projects = [

    {
        id: 1,

        title: "Dev Community Platform",

        category: "Backend",

        image: "../assets/images/dev-community.png",

        description:
            "A scalable backend application built using NestJS, MongoDB, Redis and BullMQ.",

        technologies: [
            "NestJS",
            "MongoDB",
            "Redis",
            "BullMQ"
        ],

        github: "https://github.com/maeedanim/Dev_Community_Platform",

    },

    {
        id: 2,

        title: "Fitness Tracker",

        category: "Backend",

        image: "../assets/images/fitness-tracker.png",

        description:
            "Fitness management system with authentication, trainer dashboard and payment support.",

        technologies: [
            "ASP.NET MVC",
            "SQL Server",
            "Bootstrap"
        ],

        github: "https://github.com/maeedanim/Fitness-Tracker",

        
    },

    {
        id: 3,

        title: "Hospital Management",

        category: "Web",

        image: "../assets/images/hospital.png",

        description:
            "Hospital management system with patients, doctors, billing and appointments.",

        technologies: [
            "PHP",
            "MySQL"
        ],

        github: "https://github.com/maeedanim/Hospital-Management-System",

    },

    

    

];