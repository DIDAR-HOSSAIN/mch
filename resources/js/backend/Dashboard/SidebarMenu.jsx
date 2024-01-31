const { default: Sidebar } = require("./Sidebar");

// Example usage in another component
const menuData = [
    {
        title: "General PCR",
        icon: "",
        children: [
            {
                title: "Case Reg",
                icon: "",
                path: "/",
            },
            {
                title: "Case List",
                icon: "",
                path: "/",
            },
        ],
    },
    // Add more menu items as needed
];

// ...

<Sidebar menuData={menuData} />;
