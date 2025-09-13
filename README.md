# WORK IN PROGRESS

# Aligner
A comprehensive task management and organization system designed to help users align their goals and track progress efficiently.

### Tech Stack
1. ASP.NET Web-Api for Backend
2. MySQL for Database
3. React for Frontend

### Prerequisites
- Latest .NET SDK
- Node.js (v18+)
- MySQL (v8.0+)

## Installation and Setup

### Setup Project

```bash
    # Clone this repository
    git clone https://github.com/prashantStha308/ncc_react.git
    
    #installs all node packages, incuding both react(frontend) and .NET(backend) packages
    npm install
```

### Update appsettings.json

``` C#
    "ConnectionStrings": {
        "DefaultConnection":"server=localhost;port=SQL_PORT(default is 3306);database=Aligner;user=DB_USER;password=PASSWORD;"
    },
```

### Migrate Database

```bash
    #Install Entity Framework globally
    dotnet tool install --global dotnet-ef

    # Generate database
    npm run migrate-add -- init

    # Update databases using ef
    npm run migrate-update
```

### Build and Start the Project

```bash
    # build both backend and frontend
    npm run build

    # Start the project
    npm start

    # Project will be available at http://localhost:4173/
```
