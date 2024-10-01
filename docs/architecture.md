# GeoView Demo Architecture

## Overview

The GeoView Demo project is designed to showcase the capabilities of the GeoView library. 
GeoViewDemo offers users the following functionalities;
- Ability to build and test their config files via a UI.
- A place to try GeoView API functions and see the code that triggers such functions.
This document provides an overview of the architecture, including the main components and their interactions.

![image](https://github.com/user-attachments/assets/b971db56-442c-4a90-987c-3204e5eed9ef)


## The UI Structure

The UI structure consists mainly of two sections. The map and the drawers sections.
The map basically renders the generated map.
The drawer consists of different tabs - each displaying information about the map or offering a way of manipulating the map.

## Folder Structure

The GeoView Demo project follows a structured layout to maintain clarity and organization. Below is an overview of the main folders and their purposes:

```
/geoview-demo
├── /docs
├── /src
│   ├── /components
│   ├── /providers
│   ├── /routes
│   └── /pages
│   └── /constants.ts
│   └── /types.ts
```

### /docs
- **Purpose**: Contains all the documentation related to the project, including architectural overviews, API documentation, and user guides.

### /src
- **Purpose**: The main source code of the project.
- **Subfolders**:
    - **/components**: Contains React components used in the UI.
    - **/routes**: Contains routes for the application. At the moment the application has only one route (/default); but can be expanded to add more routes.
    - **/providers**: This folder containers all our providers used in the application.
    - **/routes**: Pages associated with routes.

### /public
- **Purpose**: Static files that are publicly accessible, such as HTML templates, images, and other assets.

This folder structure promotes a clean separation of concerns, making the project easier to navigate and maintain.





































