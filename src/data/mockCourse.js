import image from "../assets/pythoncode.jpg";

const mypythonmodules = [
    {
        id: 200,
        title: "Chapter 1",
        description: "Introduction To Python",
        isComplete: false,
        videoUrl: "https://youtu.be/hEgO047GxaQ?si=M4vRoX37mHQ-IQg_"
    },
    {
        id: 201,
        title: "Chapter 2",
        description: "Python Installation",
        isComplete: false,
        videoUrl: "https://youtu.be/CScxy0294SE?si=wNoqYmNe-nkcXQEr"
    },
    {
        id: 203,
        title: "Chapter 3",
        description: "Variables In Python",
        isComplete: false,
        videoUrl: "https://youtu.be/TqPzwenhMj0?si=H35ejl32iXYs9gWl"
    },
    {
        id: 204,
        title: "Chapter 4",
        description: "List In Python",
        isComplete: false,
        videoUrl: "https://youtu.be/Eaz5e6M8tL4?si=gckTwkuaKsccgoH_"
    },
    {
        id: 205,
        title: "Chapter 5",
        description: "Tuple & Set",
        isComplete: false,
        videoUrl: "https://youtu.be/Mf7eFtbVxFM?si=gv0VIF4XW6WXTkOQ"
    },
    {
        id: 206,
        title: "Chapter 6",
        description: "Dictionary",
        isComplete: false,
        videoUrl: "https://youtu.be/2IsF7DEtVjg?si=_C5-IMXDxC7Fasc4"
    },
    {
        id: 207,
        title: "Chapter 7",
        description: "Set Path",
        isComplete: false,
        videoUrl: "https://youtu.be/4V14G5_CNGg?si=dPiUf_3uHzBjW4xa"
    },
    {
        id: 208,
        title: "Chapter 8",
        description: "Data Types",
        isComplete: false,
        videoUrl: "https://youtu.be/gCCVsvgR2KU?si=nYeQIZaZexWPsREd"
    },
    {
        id: 209,
        title: "Chapter 9",
        description: "Operators",
        isComplete: false,
        videoUrl: "https://youtu.be/v5MR5JnKcZI?si=Jwm0pRrBksWrMJgX"
    },
    {
        id: 210,
        title: "Chapter 10",
        description: "Bitwise Operators",
        isComplete: false,
        videoUrl: "https://youtu.be/PyfKCvHALj8?si=-g4l83qnse4r1wxX"
    },
]

const mycourses = [
    {
        id: 100,
        title: "Python Full Course",
        description: "Python programming tutorial for beginners",
        isEnrolled: true,
        isCompleted: false,
        imageUrl: image,
        modules: mypythonmodules
    }
]

export { mycourses }