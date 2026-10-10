-- Create tasks table
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    priority TEXT NOT NULL,
    "categoryId" UUID,
    tags TEXT[] DEFAULT '{}',
    "dueDate" TEXT,
    "dueTime" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL
);

-- Create tags table
CREATE TABLE public.tags (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL
);

-- Disable Row Level Security (RLS) so anyone can read/write during development
-- In a real production app with users, we would enable this and write strict policies.
ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags DISABLE ROW LEVEL SECURITY;
