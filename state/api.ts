import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PagesUserlandModule } from "next/dist/server/future/route-modules/pages/module.compiled";

export interface Project {
    id: number;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

export enum Priority{
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
}

export enum Status{
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed"
}

export interface User{
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    congitoId?: string;
    teamId?: number;
}

export interface Attachment {
    id: number;
    fileUrl: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_bASE_URL}),
    reducerPath: "api",
    tagTypes: ["Projects", "Tags"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "projects",
            providesTags: ["Projects"]
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project
            }),
            invalidatesTags: ["Projects"]
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({projectId}) => `tasks?projectId=${projectId}`,
            providesTags: ["Projects"]
        }),
    }),
});

export const { useGetProjectsQuery, useCreateProjectMutation} = api;