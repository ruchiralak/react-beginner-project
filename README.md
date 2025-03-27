Bank Account Opening Form Documentation
Overview
The Bank Account Opening Form is a React-based application that allows users to apply for a bank account online. The form collects personal details, account preferences, and terms agreement. The application uses React Hook Form for state management and validation with Zod, and Material-UI (MUI) for styling and components.
Features
•	User-friendly interface with Material-UI components
•	Form validation using React Hook Form and Zod
•	Custom validation rules for fields like phone number, zip code, and initial deposit
•	Error handling for invalid inputs
•	Responsive design for various screen sizes
Installation and Setup
Prerequisites
Make sure you have the following installed:
•	Node.js (v14 or later recommended)
•	npm or yarn
•	npm install @mui/material @emotion/react @emotion/styled react-hook-form @hookform/resolvers zod
•	Project Structure
project-root/
│-- src/
│   │-- components/
│   │   │-- BankAccountForm.js  # Main form component
│   │-- App.js  # Entry point
│   │-- index.js  # React DOM render
│-- public/
•	│-- package.json
•	│-- README.md
Steps to Run the Application
1.	Clone the repository:
2.	git clone https://github.com/react-beginner-project /bank-account-form.git
3.	cd bank-account-form
4.	Install dependencies:
5.	npm install  # or yarn install
6.	Start the development server:
7.	npm start  # or yarn start
8.	Open the application in your browser:
9.	http://localhost:3000
Technologies Used
•	React.js – Frontend framework
•	React Hook Form – Form management
•	Zod – Schema-based form validation
•	Material-UI (MUI) – UI components and styling
Code Explanation
Schema Validation (Zod)
The form validation is handled using Zod, ensuring that user input meets the required criteria:
const schema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/\d{10}/, "Phone Number must be exactly 10 digits"),
  dateOfBirth: z.string().nonempty("Date of Birth is required").refine((dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, "Must be 18 years or older"),
  initialDeposit: z.preprocess((val) => Number(val), z.number().min(100, "Minimum deposit is $100")),
  zipCode: z.string().regex(/\d{5}/, "Zip Code must be exactly 5 digits"),
  terms: z.boolean().refine((value) => value === true, "You must accept the Terms & Conditions"),
});
Form Handling (React Hook Form)
We use React Hook Form to manage form state and validation. The form is controlled using useForm():
const { control, register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    accountType: "",
    currency: ""
  }
});
Form Submission
On form submission, the data is logged, and a success message is displayed:
const onSubmit = (data) => {
  console.log("Form Data:", data);
  alert("Account successfully opened!");
};
UI Components (Material-UI)
The form uses Material-UI components like TextField, Select, MenuItem, and Button for an enhanced user experience.
<TextField fullWidth label="Full Name" {...register("fullName")} error={!!errors.fullName} helperText={errors.fullName?.message} />

<FormControl fullWidth>
  <InputLabel>Account Type</InputLabel>
  <Controller name="accountType" control={control} defaultValue="" render={({ field }) => (
    <Select {...field}>
      <MenuItem value="Savings">Savings</MenuItem>
      <MenuItem value="Checking">Checking</MenuItem>
    </Select>
  )} />
</FormControl>
Error Handling
Each field has validation error messages displayed dynamically:
{errors.phoneNumber && <Typography color="error">{errors.phoneNumber.message}</Typography>}
Deployment
To deploy the application, use Vercel or Netlify:
1.	Build the project:
2.	npm run build
3.	Deploy using Vercel:
4.	npm install -g vercel
5.	vercel
Conclusion
This project demonstrates a simple yet effective bank account opening form with real-time validation and a smooth user experience. It ensures accurate data collection and provides feedback on user inputs. You can extend this by integrating it with a backend API for real-world banking applications.
Future Improvements
•	Integrate API for storing form submissions
•	Add multi-step form support
•	Enhance accessibility and mobile responsiveness

