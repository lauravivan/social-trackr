# social-trackr

A place where you can search for people that you follow but don't follow you back in different social medias.

## Table of Contents
- [Objective](#objective)
- [Requirements](#requirements)
    - [Functional (rules of the game)](#functional-rules-of-the-game)
    - [Not-Functional](#not-functional)
- [UI Layer](#ui-layer)
    - [Prototype](#prototype)
    - [Technologies](#technologies)
    - [Architecture (**Monolithic)**](#architecture-monolithic)
 
## Objective

Create an easy way of searching all the profiles that a certain account follows but don't follow it back. 

## Requirements

### Functional (rules of the game)

### Not-Functional

- All the website functionalities need to be accessible by keyboard;
- The contrast in all screens needs to be valid;
- Screen reader elements validated by NVDA;

## UI Layer

### Prototype

[Prototype](https://shorturl.at/Lac4T)

### Technologies

- React.js
- TypeScript
- Vite
- React Router DOM
- React Query (TansQuery)
- ESLint + Prettier
- TailwindCSS
- Zustand

### Architecture (**Monolithic)**

For this project I chose monolithic architecture because is a small and simple project. It’s faster to develop and centralized. There’s no planning of scaling this game, it’s a team of 1 developer, and a small change is easier to track if it breaks other part of the game. There’s no worry of reusing parts of the game in other places.

- **Type-Based Structure:**

```jsx
src/
├── components/         
│   ├── common/         
│   ├── forms/          
│   └── layout/         
├── hooks/              
├── services/           # All API functions
├── stores/             # State management
├── utils/              
├── pages/              
├── types/             
└── assets/            
```

## License

[MIT]("./License")
