/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as FolderCreateImport } from './routes/folder.create'
import { Route as FolderIdEditImport } from './routes/folder.$id.edit'
import { Route as FolderFolderIdCardCreateImport } from './routes/folder.$folderId.card.create'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const FolderCreateRoute = FolderCreateImport.update({
  id: '/folder/create',
  path: '/folder/create',
  getParentRoute: () => rootRoute,
} as any)

const FolderIdEditRoute = FolderIdEditImport.update({
  id: '/folder/$id/edit',
  path: '/folder/$id/edit',
  getParentRoute: () => rootRoute,
} as any)

const FolderFolderIdCardCreateRoute = FolderFolderIdCardCreateImport.update({
  id: '/folder/$folderId/card/create',
  path: '/folder/$folderId/card/create',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/folder/create': {
      id: '/folder/create'
      path: '/folder/create'
      fullPath: '/folder/create'
      preLoaderRoute: typeof FolderCreateImport
      parentRoute: typeof rootRoute
    }
    '/folder/$id/edit': {
      id: '/folder/$id/edit'
      path: '/folder/$id/edit'
      fullPath: '/folder/$id/edit'
      preLoaderRoute: typeof FolderIdEditImport
      parentRoute: typeof rootRoute
    }
    '/folder/$folderId/card/create': {
      id: '/folder/$folderId/card/create'
      path: '/folder/$folderId/card/create'
      fullPath: '/folder/$folderId/card/create'
      preLoaderRoute: typeof FolderFolderIdCardCreateImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/folder/create': typeof FolderCreateRoute
  '/folder/$id/edit': typeof FolderIdEditRoute
  '/folder/$folderId/card/create': typeof FolderFolderIdCardCreateRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/folder/create': typeof FolderCreateRoute
  '/folder/$id/edit': typeof FolderIdEditRoute
  '/folder/$folderId/card/create': typeof FolderFolderIdCardCreateRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/login': typeof LoginRoute
  '/folder/create': typeof FolderCreateRoute
  '/folder/$id/edit': typeof FolderIdEditRoute
  '/folder/$folderId/card/create': typeof FolderFolderIdCardCreateRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/folder/create'
    | '/folder/$id/edit'
    | '/folder/$folderId/card/create'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/folder/create'
    | '/folder/$id/edit'
    | '/folder/$folderId/card/create'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/folder/create'
    | '/folder/$id/edit'
    | '/folder/$folderId/card/create'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  LoginRoute: typeof LoginRoute
  FolderCreateRoute: typeof FolderCreateRoute
  FolderIdEditRoute: typeof FolderIdEditRoute
  FolderFolderIdCardCreateRoute: typeof FolderFolderIdCardCreateRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  LoginRoute: LoginRoute,
  FolderCreateRoute: FolderCreateRoute,
  FolderIdEditRoute: FolderIdEditRoute,
  FolderFolderIdCardCreateRoute: FolderFolderIdCardCreateRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/folder/create",
        "/folder/$id/edit",
        "/folder/$folderId/card/create"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/folder/create": {
      "filePath": "folder.create.tsx"
    },
    "/folder/$id/edit": {
      "filePath": "folder.$id.edit.tsx"
    },
    "/folder/$folderId/card/create": {
      "filePath": "folder.$folderId.card.create.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
