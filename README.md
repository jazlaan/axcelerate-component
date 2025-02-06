# **Axcelerate Component**

**A Searchable Contact List component featuring**:  
**- Searchable and collapsible sections**  
**- Selection highlighting**  
**- Configurable email visibility**  
**- Mobile responsive styling**  
**- Unit tests with React Testing Library**  
**- Storybook for interactive documentation**

---

## **Features**

| Feature                     | Description                                          |
| --------------------------- | ---------------------------------------------------- |
| **Live Search**             | Dynamically filters contacts as you type             |
| **Toggle Email Visibility** | Controls whether emails are shown (`showEmail` prop) |
| **Selection Highlighting**  | Clicking a contact highlights them                   |
| **Collapsible Sections**    | Expand/collapse attended and absent lists            |
| **Fully Responsive**        | Works across mobile, tablet, and desktop             |

---

## **Project Structure**

```
axcelerate-component/
│── src/
│   ├── components/
│   │   ├── ContactList.js  # Main ContactList component
│   ├── __tests__/
│   │   ├── ContactList.test.js  # Jest test file
│   ├── stories/
│   │   ├── ContactList.stories.js  # Storybook documentation
│   ├── App.js  # Example usage in the main app
│   ├── setupTests.js  # Jest setup for React Testing Library
│── package.json  # Project dependencies & scripts
```

---

## **Installation & Setup**

**1.Clone the repository:**

```sh
git clone https://github.com/jazlaan/axcelerate-component.git
cd axcelerate-component
```

**2.Install dependencies:**

```sh
npm install
```

**3.Start development server:**

```sh
npm start
```

- App runs on: `http://localhost:3000/`

---

## **Storybook Documentation**

**View the Contact List Component in an interactive UI:**

```sh
npm run storybook
```

- Opens at: `http://localhost:6006/`

---

## **Running Tests**

Run **Contact List Component**:

```sh
npm test
```

---

## **Props & Usage**

### **`ContactList` Component**

```jsx
<ContactList attended={attendedUsers} absent={absentUsers} showEmail={true} />
```

### **Props**

| Prop        | Type      | Default | Description             |
| ----------- | --------- | ------- | ----------------------- |
| `attended`  | `Array`   | `[]`    | List of attended users  |
| `absent`    | `Array`   | `[]`    | List of absent users    |
| `showEmail` | `Boolean` | `true`  | Toggle email visibility |

### **Sample Data**

```js
const attendedUsers = [
  {
    id: 1,
    name: "Dianne Russell",
    email: "dianne@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Ronald Richards",
    email: "ronald@hotmail.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const absentUsers = [
  {
    id: 3,
    name: "Jenny Wilson",
    email: "jenny@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];
```

---

## **Jest Test Coverage**

| Test Case                | Status |
| ------------------------ | ------ |
| Renders correctly        | Passed |
| Toggles email visibility | Passed |
| Handles expand/collapse  | Passed |
| Filters search correctly | Passed |
| Displays empty state     | Passed |
