# Airtable Setup Guide for CertWorld

## Prerequisites

1. **Airtable Account**: Create a free account at [airtable.com](https://airtable.com)
2. **Personal Access Token**: You already have: `patVjyGocBuXqNs7m.bf396fee80f11b0d2d986425b567eab8175e2c242619f895bc383e82fe0c4d20`

## Step 1: Create Your Base

1. Log into your Airtable account
2. Click "Create a base" or "Add a base"
3. Choose "Start from scratch"
4. Name your base "CertWorld" or similar
5. Copy the Base ID from the URL (starts with `app...`)

## Step 2: Set Up Tables

### Certificates Table

Create a table named **"Certificates"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| title | Single line text | Required |
| description | Long text | - |
| issuer | Single line text | Required |
| dateIssued | Date | - |
| expiryDate | Date | - |
| status | Single select | Options: active, expired, pending |
| imageUrl | URL | - |
| recipientEmail | Email | Required |
| recipientName | Single line text | Required |
| completedDate | Date | - |
| category | Single line text | - |

### Courses Table

Create a table named **"Courses"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| title | Single line text | Required |
| description | Long text | - |
| instructor | Single line text | - |
| duration | Single line text | e.g., "2 hours" |
| level | Single select | Options: beginner, intermediate, advanced |
| category | Single line text | Required |
| price | Currency | - |
| isActive | Checkbox | - |
| createdAt | Date | Include time |
| lastEdited | Date | Include time |
| location | Single line text | e.g., "Texas, United States" |
| region | Single line text | - |
| country | Single line text | - |
| state | Single line text | - |
| languages | Single line text | e.g., "English / Spanish" |
| status | Single line text | e.g., "Open to All Learners" |

### UserProgress Table

Create a table named **"UserProgress"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| userId | Single line text | Required |
| courseId | Single line text | Required |
| progress | Number | 0-100 |
| lessonsCompleted | Number | - |
| totalLessons | Number | - |
| isComplete | Checkbox | - |
| startedAt | Date | Include time |
| completedAt | Date | Include time |

### Sections Table

Create a table named **"Sections"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| courseId | Single line text | Required |
| titleEn | Single line text | Required |
| titleEs | Single line text | Required |
| order | Number | Required |

### Lessons Table

Create a table named **"Lessons"** with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| courseId | Single line text | Required |
| sectionId | Single line text | Required |
| titleEn | Single line text | Required |
| titleEs | Single line text | Required |
| completed | Checkbox | - |
| type | Single select | Options: lesson, quiz |
| order | Number | Required |

## Step 3: Configure Environment

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update your `.env.local` file:
   ```env
   AIRTABLE_TOKEN=patVjyGocBuXqNs7m.bf396fee80f11b0d2d986425b567eab8175e2c242619f895bc383e82fe0c4d20
   AIRTABLE_BASE_ID=your_actual_base_id_here
   ```

3. Replace `your_actual_base_id_here` with your actual base ID from Step 1

## Step 4: Test the Connection

Run the test script to verify everything is working:

```bash
node lib/test-crud.mjs
```

## Step 5: Start the Application

```bash
npm run dev
```

Visit `http://localhost:3000/dashboard` to see your courses loaded from Airtable!

## API Endpoints

Once set up, these endpoints will be available:

### Certificates
- `GET /api/certificates` - List all certificates
- `POST /api/certificates` - Create a new certificate
- `GET /api/certificates/[id]` - Get a specific certificate
- `PATCH /api/certificates/[id]` - Update a certificate
- `DELETE /api/certificates/[id]` - Delete a certificate

### Courses
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create a new course
- `GET /api/courses/[id]` - Get a specific course
- `PATCH /api/courses/[id]` - Update a course
- `DELETE /api/courses/[id]` - Delete a course

## Example Usage

### Creating a Course via API

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Fundamentals",
    "description": "Learn React from scratch",
    "instructor": "John Doe",
    "duration": 40,
    "level": "beginner",
    "category": "Programming",
    "price": 99.99,
    "isActive": true
  }'
```

### Creating a Certificate via API

```bash
curl -X POST http://localhost:3000/api/certificates \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Fundamentals Completion",
    "description": "Certificate of completion for React Fundamentals course",
    "issuer": "CertWorld Academy",
    "recipientEmail": "student@example.com",
    "recipientName": "Jane Smith",
    "status": "active"
  }'
```

## Frontend Integration

The dashboard automatically loads data from Airtable using the custom hooks:

```typescript
// In your React components
import { useCourses, useCourseActions } from '../lib/hooks'

const { data: courses, loading, error } = useCourses()
const { create, update, remove } = useCourseActions()
```

## Troubleshooting

1. **"Base not found" error**: Check that your base ID is correct
2. **"Table not found" error**: Ensure table names are exactly "Certificates" and "Courses"
3. **Permission errors**: Verify your personal access token has the correct permissions
4. **Field type mismatches**: Double-check that field types match the setup guide

## Next Steps

1. Add more sophisticated filtering and sorting
2. Implement real-time updates with webhooks
3. Add file upload for certificate images
4. Create certificate templates
5. Add user authentication and authorization