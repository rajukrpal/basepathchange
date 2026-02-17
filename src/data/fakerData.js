import { faker } from '@faker-js/faker';

// Generate Attendance Logs
export const generateAttendanceLogs = (count = 10) => {
    return Array.from({ length: count }).map((_, idx) => {
        const date = faker.date.recent({ days: 30 });
        const clockIn = new Date(date);
        clockIn.setHours(9, faker.number.int({ min: 0, max: 30 }), 0);
        
        const clockOut = new Date(date);
        clockOut.setHours(18, faker.number.int({ min: 0, max: 45 }), 0);
        
        return {
            id: faker.string.uuid(),
            date: date.toISOString().split('T')[0],
            clockIn: clockIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            clockOut: clockOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            workDuration: "08:30:00",
            breakDuration: "01:00:00",
            notes: faker.lorem.sentence()
        };
    });
};

// Generate Projects
export const generateProjects = (count = 6) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        name: faker.company.catchPhrase(),
        client: faker.company.name(),
        progress: faker.number.int({ min: 10, max: 100 }),
        status: faker.helpers.arrayElement(['In Progress', 'Completed', 'Delayed', 'On Hold']),
        members: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => 
            faker.person.firstName().substring(0, 1) + faker.person.lastName().substring(0, 1)
        )
    }));
};

// Generate Team Members
export const generateTeamMembers = (count = 8) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        department: faker.person.jobArea(),
        avatar: faker.image.avatar(),
        email: faker.internet.email()
    }));
};

// Generate Tasks
export const generateTasks = (count = 12) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        taskName: faker.hacker.phrase(),
        description: faker.lorem.paragraph(1),
        project: faker.helpers.arrayElement(['ecommerce', 'mobile_app', 'marketing', 'cloud']),
        priority: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
        status: faker.helpers.arrayElement(['Todo', 'In Progress', 'Done']),
        dueDate: faker.date.future().toISOString().split('T')[0],
        reminderTime: "09:00",
        members: Array.from({ length: 3 }).map(() => faker.helpers.arrayElement(['rahul', 'priya', 'amit', 'sneha', 'vikram', 'neha']))
    }));
};
// Generate Notifications
export const generateNotifications = (count = 10) => {
    return Array.from({ length: count }).map(() => {
        const startDate = faker.date.recent({ days: 30 });
        const endDate = faker.date.between({ from: startDate, to: faker.date.future({ years: 0.1, refDate: startDate }) });
        
        return {
            id: faker.string.uuid(),
            type: faker.helpers.arrayElement(['System', 'Project', 'Team', 'Alert']),
            message: faker.hacker.phrase() + " " + faker.lorem.sentence(5),
            time: startDate.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: faker.helpers.arrayElement(['Read', 'Unread']),
            priority: faker.helpers.arrayElement(['High', 'Medium', 'Low'])
        };
    });
};
// Generate Chat Contacts
export const generateChatContacts = (count = 10) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
        status: faker.helpers.arrayElement(['online', 'offline', 'away']),
        lastMessage: faker.hacker.phrase(),
        time: '2m ago',
        unreadCount: faker.helpers.arrayElement([0, 0, 1, 3, 0]),
        role: faker.person.jobTitle()
    }));
};

// Generate Chat Messages
export const generateMessages = (count = 20) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: faker.string.uuid(),
        text: faker.lorem.sentence(),
        sender: i % 3 === 0 ? 'me' : 'them',
        timestamp: new Date(Date.now() - (count - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
};
// Generate Inventory Items
export const generateInventory = (count = 15) => {
    return Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        sku: 'SKU-' + faker.string.alphanumeric(6).toUpperCase(),
        name: faker.commerce.productName(),
        category: faker.helpers.arrayElement(['Electronics', 'Furniture', 'Clothing', 'Office Supplies', 'Kitchenware']),
        price: faker.commerce.price({ min: 10, max: 1000, symbol: '$' }),
        stock: faker.number.int({ min: 0, max: 500 }),
        status: faker.helpers.arrayElement(['In Stock', 'Low Stock', 'Out of Stock']),
        lastUpdated: faker.date.recent({ days: 10 }).toISOString().split('T')[0]
    }));
};
