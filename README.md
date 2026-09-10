# Apna Desk

A production-style customer management application built with **Next.js,
React, TypeScript, Redux Toolkit, and REST APIs**.

The application is designed around customer-centric workflows where
users can manage customer profiles, notes, dynamic forms, form
submissions, responses, and customer files from a single interface.

## Live Demo

**Vercel:**
https://apna-desk-nk5ulk1t2-bhavisha2801s-projects.vercel.app/

------------------------------------------------------------------------

## Table of Contents

-   [Project Overview](#project-overview)
-   [Key Features](#key-features)
-   [Technology Stack](#technology-stack)
-   [Application Architecture](#application-architecture)
-   [Project Structure](#project-structure)
-   [Module Architecture](#module-architecture)
-   [Data Flow](#data-flow)
-   [Getting Started](#getting-started)
-   [Environment Variables](#environment-variables)
-   [Running the Project](#running-the-project)
-   [API Architecture](#api-architecture)
-   [Redux State Management](#redux-state-management)
-   [Dynamic Forms Architecture](#dynamic-forms-architecture)
-   [Technical Decisions](#technical-decisions)
-   [Performance Considerations](#performance-considerations)
-   [Error and Loading States](#error-and-loading-states)
-   [Testing Strategy](#testing-strategy)
-   [Deployment](#deployment)
-   [Known Limitations](#known-limitations)
-   [Future Improvements](#future-improvements)

------------------------------------------------------------------------

## Project Overview

Apna Desk is a SaaS-style customer management application.

The main goal is to provide a reusable architecture for managing
customer information and customer-related data without tightly coupling
UI components to API implementation details.

A customer can have:

-   Profile information
-   Notes
-   Form submissions
-   Uploaded/customer files

The application also provides a separate **Forms Management** area where
dynamic forms can be created and managed using a schema-driven approach.

### Core workflow

``` text
Customers
   |
   +-- Customer Profile
   |
   +-- Notes
   |
   +-- Forms
   |     |
   |     +-- Fill Form
   |     +-- Form Responses
   |
   +-- Files
         |
         +-- Create
         +-- View
         +-- Edit
         +-- Delete
```

------------------------------------------------------------------------

## Key Features

### Customer Management

-   Customer listing
-   Search by name, email, or phone
-   Filter by active/inactive status
-   Pagination
-   Add customer
-   Edit customer
-   Delete customer
-   Customer detail page
-   Loading, empty, and error states
-   Delete confirmation flow

### Customer Details

Customer details are organized into tabs:

-   Profile
-   Notes
-   Forms
-   Files

The tab-based architecture allows additional modules to be added without
rewriting the customer detail page.

### Notes

-   Create note
-   Edit note
-   Delete note
-   Search notes
-   Created-by information
-   Created date

### Dynamic Forms

Forms are represented using JSON/schema data rather than hard-coded JSX.

Supported field concepts include:

-   Text
-   Email
-   Number
-   Date
-   Select
-   Textarea
-   Radio
-   Checkbox

A form schema determines:

-   Field type
-   Field label
-   Required state
-   Placeholder
-   Options
-   Field identifier

This allows new forms to be created without creating a new React
component for every form.

### Form Builder

The form builder supports the form-management workflow:

-   Create form
-   Add fields
-   Configure field labels
-   Mark fields as required
-   Configure options for selectable fields
-   Reorder/configure fields
-   Preview form
-   Save form

### Form Responses

A saved form can be submitted for a specific customer.

The response flow:

``` text
Customer
   |
   v
Customer -> Forms
   |
   v
Select Form
   |
   v
Fill Form
   |
   v
Validate
   |
   v
POST Form Response
   |
   v
Response appears in selected form's responses
```

Responses can be viewed from the customer Forms tab.

When a response is opened, the submitted values are rendered against the
original form schema.

### Files

The customer Files module supports CRUD operations:

-   Create/upload file metadata
-   List customer files
-   Edit file metadata
-   Delete file
-   File name
-   File URL
-   File type
-   File size
-   Uploaded-by information

------------------------------------------------------------------------

# Technology Stack

  Technology              Purpose
  ----------------------- -----------------------------------
  Next.js                 Application framework and routing
  React                   UI components
  TypeScript              Static typing
  Redux Toolkit           Application state management
  React Redux             Redux integration
  Tailwind CSS            Styling
  REST API                Backend communication
  MongoDB                 Persistent data storage
  Vercel                  Deployment
  Jest                    Unit testing
  React Testing Library   Component testing

------------------------------------------------------------------------

# Application Architecture

The project follows a **feature-oriented architecture**.

Instead of putting API calls, Redux logic, UI, and types into one large
folder, responsibilities are separated.

``` text
UI Components
      |
      v
Feature Thunks
      |
      v
Service / API Layer
      |
      v
REST API
      |
      v
Database
```

For example:

``` text
CustomerPage
    |
    v
fetchCustomers()
    |
    v
customerService.getCustomers()
    |
    v
GET /api/customers
    |
    v
Database
```

This separation makes the application easier to maintain and test.

------------------------------------------------------------------------

# Project Structure

The main application structure is organized approximately as follows:

``` text
src/
│
├── app/
│   ├── customers/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [customerId]/
│   │       └── page.tsx
│   │
│   ├── forms/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   ├── customers/
│   │   ├── forms/
│   │   ├── notes/
│   │   ├── files/
│   │   └── responses/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── common/
│   ├── customers/
│   ├── forms/
│   ├── ui/
│   └── ...
│
├── features/
│   ├── customers/
│   │   ├── customerSlice.ts
│   │   └── customerThunks.ts
│   │
│   ├── forms/
│   │   ├── formSlice.ts
│   │   └── formThunks.ts
│   │
│   ├── notes/
│   │   ├── noteSlice.ts
│   │   └── noteThunks.ts
│   │
│   ├── files/
│   │   ├── fileSlice.ts
│   │   └── fileThunks.ts
│   │
│   └── responses/
│       ├── responseSlice.ts
│       └── responseThunks.ts
│
├── services/
│   ├── apiClient.ts
│   ├── customerService.ts
│   ├── formService.ts
│   ├── noteService.ts
│   ├── filesService.ts
│   └── responseService.ts
│
├── store/
│   ├── store.ts
│   ├── hooks.ts
│   └── ...
│
├── types/
│   ├── customer.ts
│   ├── form.ts
│   ├── files.ts
│   └── response.ts
│
├── mocks/
│
└── utils/
```

------------------------------------------------------------------------

# Module Architecture

Each major business module follows a similar pattern.

## Customers

``` text
Customer UI
   |
   +--> customerThunks.ts
           |
           +--> customerService.ts
                    |
                    +--> API
           |
           +--> customerSlice.ts
```

## Forms

``` text
Forms UI
   |
   +--> formThunks.ts
           |
           +--> formService.ts
                    |
                    +--> API
           |
           +--> formSlice.ts
```

## Files

``` text
Files UI
   |
   +--> fileThunks.ts
           |
           +--> filesService.ts
                    |
                    +--> API
           |
           +--> fileSlice.ts
```

## Responses

``` text
Response UI
   |
   +--> responseThunks.ts
           |
           +--> responseService.ts
                    |
                    +--> API
           |
           +--> responseSlice.ts
```

This keeps business logic consistent across modules.

------------------------------------------------------------------------

# Data Flow

A typical read operation:

``` text
Page / Component
      |
      | dispatch(fetchCustomers())
      v
Redux Thunk
      |
      | customerService.getCustomers()
      v
API Client
      |
      | GET /api/customers
      v
REST API
      |
      v
Database
      |
      v
API Response
      |
      v
Thunk fulfilled
      |
      v
Redux Slice
      |
      v
Component re-renders
```

A mutation follows the same pattern:

``` text
User Action
    |
    v
Component
    |
    v
Thunk
    |
    v
Service
    |
    v
API
    |
    v
Database
    |
    v
Redux State
    |
    v
Updated UI
```

------------------------------------------------------------------------

# Getting Started

## 1. Clone the repository

Replace the repository URL with the GitHub repository URL:

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Then:

``` bash
cd apna-desk
```

## 2. Install dependencies

``` bash
npm install
```

## 3. Configure environment variables

Create:

``` text
.env.local
```

Add the required variables.

Example:

``` env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Use the exact variable names required by the current project code.

Do not commit `.env.local` or secrets to Git.

## 4. Start the development server

``` bash
npm run dev
```

Open:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

# Environment Variables

Environment variables should be used for environment-specific
configuration.

Typical configuration:

``` env
MONGODB_URI=
NEXT_PUBLIC_API_URL=
```

For production, configure these variables in the Vercel project settings
instead of committing them to the repository.

------------------------------------------------------------------------

# API Architecture

The application keeps API communication outside the UI components.

Instead of doing this:

``` tsx
const response = await fetch("/api/customers");
```

inside every component, the application uses a service layer:

``` text
Component
    |
    v
Thunk
    |
    v
Service
    |
    v
API Client
```

This prevents API implementation from being scattered throughout the UI.

## Customer API

``` text
GET    /api/customers
GET    /api/customers/:id
POST   /api/customers
PUT    /api/customers/:id
DELETE /api/customers/:id
```

## Forms API

``` text
GET    /api/forms
GET    /api/forms/:id
POST   /api/forms
PUT    /api/forms/:id
DELETE /api/forms/:id
```

## Notes API

``` text
GET    /api/notes
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id
```

## Files API

``` text
GET    /api/files/customer/:customerId
POST   /api/files
PUT    /api/files/:id
DELETE /api/files/:id
```

## Form Responses API

``` text
GET    /api/form-responses
GET    /api/form-responses/:id
POST   /api/form-responses
DELETE /api/form-responses/:id
```

> The exact API route implementation should remain the source of truth
> if endpoint names change.

------------------------------------------------------------------------

# Redux State Management

Redux Toolkit is used for application-level mutable state.

The main feature slices are:

``` text
customers
forms
notes
files
responses
```

Each feature has:

-   Slice
-   Async thunks
-   Typed state
-   Service/API integration

Example:

``` tsx
const customers = useAppSelector(
  state => state.customers.items
);

const dispatch = useAppDispatch();

dispatch(fetchCustomers());
```

## Why Redux Toolkit?

Redux Toolkit was selected because the application contains multiple
modules that need predictable shared state and asynchronous CRUD
operations.

It also provides:

-   `createSlice`
-   `createAsyncThunk`
-   Immutable state updates through Immer
-   Strong TypeScript integration
-   Redux DevTools support

For Next.js App Router applications, Redux should be used deliberately
for shared mutable state rather than treating it as a replacement for
every piece of local component state.

------------------------------------------------------------------------

# Local State vs Redux State

Not every value belongs in Redux.

### Redux

Good candidates:

-   Customer collections
-   Forms
-   Notes
-   Files
-   Form responses
-   Loading/error state related to API operations

### Local React state

Good candidates:

-   Modal open/close state
-   Input currently being edited
-   Temporary form values
-   Selected row
-   Search input
-   Current page
-   UI-only state

This keeps the global state smaller and reduces unnecessary re-renders.

------------------------------------------------------------------------

# Dynamic Forms Architecture

The form system is schema-driven.

A form is represented as data:

``` json
{
  "id": "customer-feedback",
  "name": "Customer Feedback",
  "description": "Collect customer feedback.",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Customer Name",
      "required": true
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email",
      "required": true
    },
    {
      "id": "rating",
      "type": "select",
      "label": "Rating",
      "required": true,
      "options": [
        {
          "label": "1",
          "value": "1"
        },
        {
          "label": "5",
          "value": "5"
        }
      ]
    }
  ]
}
```

The renderer reads the schema:

``` text
Form Schema
    |
    v
Dynamic Renderer
    |
    +--> text
    +--> email
    +--> number
    +--> date
    +--> select
    +--> textarea
    +--> radio
    +--> checkbox
```

This means adding another form does not require creating another
hard-coded React page.

------------------------------------------------------------------------

# Form Response Architecture

A response stores the relationship between:

``` text
Customer
    +
Form
    +
Answers
```

Example conceptual structure:

``` json
{
  "formId": "customer-feedback",
  "customerId": "c001",
  "answers": [
    {
      "fieldId": "name",
      "value": "John Doe"
    },
    {
      "fieldId": "email",
      "value": "john@example.com"
    },
    {
      "fieldId": "rating",
      "value": "5"
    }
  ]
}
```

When viewing a response, the application uses:

``` text
Original Form Schema
        +
Submitted Answers
        |
        v
Response Details
```

This is important because response rendering does not need to hard-code
every possible field.

------------------------------------------------------------------------

# Technical Decisions

## 1. Next.js App Router

Next.js provides:

-   File-based routing
-   Client/server component architecture
-   API route support
-   Production deployment through Vercel
-   Good TypeScript support

The App Router also provides a clean route structure for customer pages
and nested customer resources.

## 2. TypeScript

TypeScript is used throughout the application to reduce runtime mistakes
and make contracts between components, Redux, services, and APIs
explicit.

Examples include:

``` text
Customer
CreateCustomerInput
FormSchema
FormField
CustomerFile
FormResponse
```

## 3. Feature-based Redux architecture

Business logic is grouped by feature instead of putting all Redux code
into one large file.

For example:

``` text
features/
  customers/
  forms/
  notes/
  files/
  responses/
```

This makes it easier to scale the project as modules grow.

## 4. Service layer

API requests are separated from UI components.

Benefits:

-   Easier testing
-   Less duplication
-   Centralized API handling
-   Easier API changes
-   Cleaner React components

## 5. Schema-driven forms

Forms are stored as schemas instead of individual hard-coded components.

Benefits:

-   Reusable renderer
-   Easy form creation
-   Consistent validation
-   Easier future conditional fields
-   Easier response rendering

## 6. Reusable UI components

Common controls such as:

``` text
Button
Input
Select
Modal
LoadingState
EmptyState
ErrorState
Pagination
```

are reused across modules.

This keeps UI behavior and styling consistent.

## 7. Customer-centric navigation

Customer details are treated as the parent resource.

``` text
/customer/:id
```

then modules are displayed through tabs:

``` text
Profile
Notes
Forms
Files
```

This keeps the user workflow focused on one customer.

------------------------------------------------------------------------

# Performance Considerations

The application uses several techniques to keep larger datasets
manageable.

## Pagination

Customer records are paginated instead of rendering every customer at
once.

This reduces the number of DOM nodes rendered on each page.

## Memoization

`useMemo` is used where derived values such as filtered and paginated
customer lists are calculated.

Example:

``` tsx
const filteredCustomers = useMemo(() => {
  // filtering
}, [customers, search, status]);
```

## Component separation

Large pages are split into reusable components such as:

``` text
CustomerTable
CustomerForm
CustomerForms
CustomerFiles
ResponseDetailsModal
FileUploadModal
```

This makes rendering and maintenance more manageable.

## Search/filter separation

Search and filtering are performed before pagination:

``` text
Customers
   |
   v
Search
   |
   v
Status Filter
   |
   v
Pagination
   |
   v
Rendered Table
```

------------------------------------------------------------------------

# Error and Loading States

API-driven UI should not assume that requests always succeed.

The application handles:

### Loading

``` text
Loading customers...
Loading files...
Loading responses...
```

### Empty state

Examples:

``` text
No customers yet
No files found
No responses yet
```

### Error state

API failures are displayed with a useful message and retry action where
appropriate.

### Mutation state

Buttons provide feedback during:

``` text
Creating...
Saving...
Updating...
Deleting...
Submitting...
```

This prevents accidental duplicate actions.

------------------------------------------------------------------------

# Testing Strategy

The project is structured so that UI and business logic can be tested
independently.

Recommended meaningful tests include:

1.  Customer creation
2.  Customer deletion
3.  Customer search
4.  Customer validation
5.  Dynamic form rendering
6.  Dynamic form validation
7.  Form response submission
8.  API error handling

Example testing layers:

``` text
Component Test
      |
      v
User interaction
      |
      v
Redux / service behavior
      |
      v
Expected UI state
```

React Testing Library should focus on user-visible behavior rather than
implementation details.

------------------------------------------------------------------------

# Deployment

The application is deployed on **Vercel**.

Typical deployment workflow:

``` bash
git add .
git commit -m "Update application"
git push origin main
```

Vercel can then build and deploy the project from the connected Git
repository.

For environment-specific values:

``` text
Vercel
  -> Project Settings
  -> Environment Variables
```

Configure the same required variables used locally in `.env.local`.

------------------------------------------------------------------------

# Production Checklist

Before deploying a new version:

``` text
[ ] npm install
[ ] npm run lint
[ ] npm run build
[ ] Verify environment variables
[ ] Verify API endpoints
[ ] Verify database connection
[ ] Test customer CRUD
[ ] Test form creation
[ ] Test form submission
[ ] Test response viewing
[ ] Test file CRUD
[ ] Test loading/error states
[ ] Verify production URLs
```

------------------------------------------------------------------------

# Known Limitations

The current architecture is intentionally focused on the technical
assignment and core customer-management workflows.

Potential production enhancements include:

-   Authentication and role-based authorization
-   Real binary file storage instead of URL-based file metadata
-   Advanced server-side pagination/filtering
-   Debounced server-side search
-   Stronger schema validation with Zod
-   More comprehensive automated test coverage
-   Audit logs
-   Activity history
-   Notifications
-   File preview/download permissions
-   Advanced form conditional logic
-   Form versioning
-   Response export
-   Accessibility audit
-   Observability and structured logging

------------------------------------------------------------------------

# Future Improvements

## Authentication

Add:

``` text
Authentication
    |
    +-- Login
    +-- Session
    +-- Roles
    +-- Permissions
```

## Conditional Form Fields

The schema can be extended without rewriting the renderer.

For example:

``` json
{
  "id": "businessAccount",
  "type": "radio",
  "label": "Do you have a business account?"
}
```

A dependent field could then contain a condition:

``` json
{
  "id": "companyName",
  "type": "text",
  "label": "Company Name",
  "required": true,
  "visibleWhen": {
    "fieldId": "businessAccount",
    "equals": "yes"
  }
}
```

The renderer can evaluate the condition before displaying the field.

This allows the form system to evolve toward more advanced workflow
forms without replacing the existing architecture.

## File Storage

The current Files module can be extended to support:

-   Actual file upload
-   Object storage
-   File previews
-   MIME-type validation
-   File size validation
-   Secure download URLs

## Advanced Search

For larger datasets, search and filtering can move from client-side
filtering to server-side querying.

------------------------------------------------------------------------

# Why This Architecture?

The primary architectural goal is **separation of concerns**.

``` text
                 ┌─────────────────┐
                 │       UI        │
                 │ React Components│
                 └────────┬────────┘
                          │
                          v
                 ┌─────────────────┐
                 │     Redux       │
                 │ Slices/Thunks   │
                 └────────┬────────┘
                          │
                          v
                 ┌─────────────────┐
                 │    Services     │
                 │   API Layer     │
                 └────────┬────────┘
                          │
                          v
                 ┌─────────────────┐
                 │   REST APIs     │
                 └────────┬────────┘
                          │
                          v
                 ┌─────────────────┐
                 │    Database     │
                 └─────────────────┘
```

Each layer has a specific responsibility:

  Layer      Responsibility
  ---------- ----------------------------------
  UI         Rendering and user interaction
  Redux      Shared mutable application state
  Thunks     Async application workflows
  Services   API communication
  API        Backend/business operations
  Database   Persistent storage
  Types      Shared data contracts

This structure makes the application easier to extend, debug, test, and
maintain.

------------------------------------------------------------------------

# Assignment Alignment

The implementation is designed around the requirements of the frontend
technical assignment:

  Requirement                  Implementation
  ---------------------------- ----------------------------------
  React.js                     React + Next.js
  TypeScript                   TypeScript throughout
  Redux Toolkit                Feature slices and async thunks
  REST API                     Service/API layer
  Customer CRUD                Implemented
  Customer Details             Profile, Notes, Forms, Files
  Notes CRUD                   Implemented
  Dynamic Forms                Schema-driven rendering
  Form Builder                 Implemented
  Form Submission              Dynamic response submission
  Form Responses               Response management
  Loading/Error/Empty States   Reusable states
  Pagination                   Customer lists
  Search/Filtering             Customer/forms-related workflows
  Reusable Components          Shared UI components
  Performance                  Pagination + memoization
  Deployment                   Vercel

The original assignment explicitly emphasizes schema-driven forms, CRUD
workflows, Redux Toolkit, reusable components, API separation,
performance, and testing. fileciteturn0file1L7-L19
fileciteturn0file1L94-L124

------------------------------------------------------------------------

# Author

**Bhavisha Nayi**

Frontend Developer / Software Engineer

Built with:

-   React
-   Next.js
-   TypeScript
-   Redux Toolkit
-   REST APIs
-   MongoDB
-   Tailwind CSS
-   Vercel
