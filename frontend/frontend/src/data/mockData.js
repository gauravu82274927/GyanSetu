export const student = {
    name: "Test Student",
    email: "teststudent@gyansetu.com",
    className: "CSE-A"
};

export const assignments = [
    {
        id: 1,
        title: "Java Basics",
        description: "Complete the Java basics assignment.",
        subject: "Java",
        className: "CSE-A",
        dueDate: "20 Sep 2026",
        status: "Submitted",
        marks: 7
    },
    {
        id: 2,
        title: "DBMS Assignment",
        description: "Write notes on SQL joins.",
        subject: "DBMS",
        className: "CSE-A",
        dueDate: "25 Sep 2026",
        status: "Pending",
        marks: null
    },
    {
        id: 3,
        title: "Data Structures",
        description: "Implement and explain binary search.",
        subject: "DSA",
        className: "CSE-A",
        dueDate: "28 Sep 2026",
        status: "Pending",
        marks: null
    }
];

export const submissions = [
    {
        id: 1,
        assignment: "Java Basics",
        subject: "Java",
        submittedOn: "18 Sep 2026",
        status: "Graded",
        marks: 7
    }
];

export const attendance = [
    {
        id: 1,
        date: "13 Sep 2026",
        subject: "Java",
        status: "Present"
    },
    {
        id: 2,
        date: "12 Sep 2026",
        subject: "DBMS",
        status: "Present"
    },
    {
        id: 3,
        date: "11 Sep 2026",
        subject: "DSA",
        status: "Absent"
    }
];